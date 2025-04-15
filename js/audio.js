/**
 * Background music audio element.
 * @type {HTMLAudioElement}
 */
let backgroundMusic = new Audio('audio/game.mp3');

/**
 * Audio element for the game won sound.
 * @type {HTMLAudioElement}
 */
let gameWon = new Audio('audio/game_won.mp3');

/**
 * Audio element for the game lost sound.
 * @type {HTMLAudioElement}
 */
let gameLost = new Audio('audio/game_lost.mp3');

/**
 * Indicates whether the background music is muted.
 * @type {boolean}
 */
let backgroundMusicMuted = false;

/**
 * Indicates whether the game audio is muted.
 * @type {boolean}
 */
let isGameMuted = false;

// Zustand aus localStorage laden:
isGameMuted = localStorage.getItem('isGameMuted') === 'true';
backgroundMusicMuted = localStorage.getItem('backgroundMusicMuted') === 'true';

/**
 * Plays the game won sound if the game is not muted.
 */
function gameWonSound() {
    if (!isGameMuted) {
        gameWon.play().catch((error) => {
            if (error.name === 'AbortError') {
                console.log('gameWon.play() aborted, z. B. durch schnelles Pause()');
            } else {
                console.error(error);
            }
        });
    }
}

/**
 * Plays the game lost sound if the game is not muted.
 */
function gameLostSound() {
    if (!isGameMuted) {
        gameLost.play().catch((error) => {
            if (error.name === 'AbortError') {
                console.log('gameLost.play() aborted, z. B. durch schnelles Pause()');
            } else {
                console.error(error);
            }
        });
    }
}

/**
 * Sets the volume and mute status for the background music and plays it.
 */
function playBackgroundMusic() {
    backgroundMusic.volume = 0.1;
    backgroundMusic.muted = backgroundMusicMuted;
    backgroundMusic.play().catch((error) => {
        if (error.name === 'AbortError') {
            console.log('backgroundMusic.play() aborted, z. B. durch schnelles Pause()');
        } else {
            console.error(error);
        }
    });
}

/**
 * Stops the background music and resets its playback position to the beginning.
 */
function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

/**
 * Toggles the mute status of the background music and updates the UI accordingly.
 */
function updateSoundStatus() {
    backgroundMusicMuted = !backgroundMusicMuted;
    backgroundMusic.muted = backgroundMusicMuted;

    // Zustand speichern:
    localStorage.setItem('backgroundMusicMuted', backgroundMusicMuted);

    let musicToggleButton = document.getElementById('music-toggle-button');
    let soundIcon = document.getElementById('sound-icon');
    if (backgroundMusicMuted) {
        musicToggleButton.innerText = 'Sound Off';
        soundIcon.src = './img/12_icons/SOUND_OFF_icon.png';
    } else {
        musicToggleButton.innerText = 'Sound On';
        soundIcon.src = './img/12_icons/SOUND_ON_icon.png';
    }

    if (gameActive) {
        muteSounds();
    }
}

/**
 * Toggles the mute status of the game audio and updates the UI.
 */
function toggleSoundAndImage() {
    isGameMuted = !isGameMuted;
    localStorage.setItem('isGameMuted', isGameMuted); // Zustand speichern
    updateSoundStatus();
    muteSounds();
}

/**
 * Mutes or unmutes all game audio elements based on the game mute status.
 */
function muteSounds() {
    if (backgroundMusic) {
        backgroundMusic.muted = isGameMuted;
    }
    muteChickenSounds();
    muteCharacterSounds();
    muteEndbossSounds();
}

/**
 * Mutes or unmutes chicken enemy sounds based on the game mute status.
 */
function muteChickenSounds() {
    if (world && world.level && world.level.enemies) {
        world.level.enemies.forEach((enemy) => {
            if (enemy instanceof Chicken) {
                enemy.death_sound.muted = isGameMuted;
            }
        });
    }
}

/**
 * Mutes or unmutes endboss enemy sounds based on the game mute status.
 */
function muteEndbossSounds() {
    if (world && world.level && world.level.endboss) {
        world.level.endboss.forEach((endboss) => {
            endboss.alert_sound.muted = isGameMuted;
            endboss.hurt_sound.muted = isGameMuted;
            endboss.dead_sound.muted = isGameMuted;
        });
    }
}

/**
 * Mutes or unmutes coin collect sounds based on the game mute status.
 */
function muteCoinSounds() {
    if (world && world.level && world.level.coins) {
        world.level.coins.forEach((coin) => {
            coin.collect_sound.muted = isGameMuted;
        });
    }
}

/**
 * Mutes or unmutes bottle collect sounds based on the game mute status.
 */
function muteBottleSounds() {
    if (world && world.level && world.level.bottles) {
        world.level.bottles.forEach((bottle) => {
            bottle.collect_sound.muted = isGameMuted;
        });
    }
}

/**
 * Mutes or unmutes character sounds based on the game mute status.
 */
function muteCharacterSounds() {
    if (world && world.character) {
        world.character.walking_sound.muted = isGameMuted;
        world.character.hurt_sound.muted = isGameMuted;
    }
}

/**
 * Initialisiert den Sound-Status beim Seitenladen anhand von localStorage.
 */
function initSoundStatusUI() {
    let musicToggleButton = document.getElementById('music-toggle-button');
    let soundIcon = document.getElementById('sound-icon');

    // Falls die HTML-Elemente noch nicht existieren, abbrechen
    if (!musicToggleButton || !soundIcon) return;

    if (backgroundMusicMuted || isGameMuted) {
        musicToggleButton.innerText = 'Sound Off';
        soundIcon.src = './img/12_icons/SOUND_OFF_icon.png';
    } else {
        musicToggleButton.innerText = 'Sound On';
        soundIcon.src = './img/12_icons/SOUND_ON_icon.png';
    }

    backgroundMusic.muted = backgroundMusicMuted;
    muteSounds();
}

window.addEventListener('load', () => {
    initSoundStatusUI();
});
