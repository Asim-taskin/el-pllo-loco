let requestAnimationFrameId = 0;

/**
 * Represents the game world where characters and objects interact.
 * @class
 */
class World {
    character = new Character();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossHealthbar = new EndbossHealthbar();
    statusBar = new Statusbar();
    throwableObjects = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    collectedCoins = 0;
    DKeyPressed = false;
    showEndbossHealthbar = false;
    gameOver = false;
    canThrowBottle = true;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        console.log('Character in constructor:', this.character);

        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkThrowObjects();
            this.checkCollisions();
            this.checkBottleHitEndbossCollisions();
        }, 10);
    }

    checkCollisions() {
        this.checkCollisionsWithEnemies();
        this.checkCollisionWithEndboss();
    }

    checkCollisionsWithEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.energy > 0) {
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    this.handleCollisionAboveGround(enemy);
                } else if (this.character.energy > 0) {
                    this.handleCollision();
                }
            }
        });
        this.checkBottleEnemyCollisions();
    }

    checkBottleEnemyCollisions() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (!bottle.hasCollided && enemy.energy > 0 && enemy.isColliding(bottle)) {
                    this.handleBottleEnemyCollision(bottle, bottleIndex, enemy);
                }
            });
        });
    }

    handleBottleEnemyCollision(bottle, bottleIndex, enemy) {
        bottle.hasCollided = true;
        enemy.energy--;
        this.playEnemyDeathAnimation(enemy);
        this.playBottleShatterSound();
        bottle.animateBottleSplash();
        this.removeBottleAndEnemyAfterCollision(bottleIndex, enemy);
    }

    playEnemyDeathAnimation(enemy) {
        if (enemy.energy === 0) {
            enemy.playDeathAnimation();
        }
    }

    removeBottleAndEnemyAfterCollision(bottleIndex, enemy) {
        if (enemy.energy === 0) {
            setTimeout(() => {
                this.removeEnemyFromLevel(enemy);
            }, 500);
        }
        setTimeout(() => {
            this.removeBottleAfterCollision(bottleIndex);
        }, 1000);
    }

    checkCollisionWithEndboss() {
        if (this.level.endboss && this.level.endboss.length > 0) {
            this.level.endboss.forEach(boss => {
                if (this.character.isColliding(boss)) {
                    this.handleCollision();
                }
            });
        }
    }

    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinBar.setCollectedCoins(this.coinBar.collectedCoins + 1);
                if (!isGameMuted) {
                    this.playGameSound('audio/coin.mp3', 0.1);
                }
                coin.stopAnimation();
            }
        });
    }

    availableBottles = 0; // neue Zählung für Flaschen zum Werfen


    /**
     * ✅ Updated: precise bounding box collision
     */
    checkBottleCollisions() {
        for (let i = this.level.bottles.length - 1; i >= 0; i--) {
            let bottle = this.level.bottles[i];
            if (this.isCharacterNearBottle(bottle)) {
                this.level.bottles.splice(i, 1);
                this.availableBottles++; // 💥 unbegrenzt erhöhen
    
                // Die Anzeige zeigt nur bis 10
                let visibleBottles = Math.min(this.availableBottles, this.bottleBar.MAX_BOTTLES);
                this.bottleBar.setCollectedBottles(visibleBottles);
    
                if (!isGameMuted) {
                    this.playGameSound('audio/bottle_collect.mp3', 1);
                }
            }
        }
    }
    
    
    
    
    


/**
 * ✅ Präziserer bounding box check für bottle collection mit Puffer
 */
isCharacterNearBottle(bottle) {
    const buffer = 30; // je größer der Wert, desto näher muss man sein

    const char = this.character;
    const charLeft = char.x + char.offset.left + buffer;
    const charRight = char.x + char.width - char.offset.right - buffer;
    const charTop = char.y + char.offset.top + buffer;
    const charBottom = char.y + char.height - char.offset.bottom - buffer;

    const bottleLeft = bottle.x;
    const bottleRight = bottle.x + (bottle.width || 40);
    const bottleTop = bottle.y;
    const bottleBottom = bottle.y + (bottle.height || 40);

    const horizontallyOverlapping = charRight > bottleLeft && charLeft < bottleRight;
    const verticallyOverlapping = charBottom > bottleTop && charTop < bottleBottom;

    return horizontallyOverlapping && verticallyOverlapping;
}

    

    
    

    checkThrowObjects() {
        if (this.keyboard.D && this.canThrowBottle && this.availableBottles > 0 && !this.character.otherDirection) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        
            this.availableBottles--; // tatsächliche Anzahl verringern
            if (this.bottleBar.collectedBottles > 0) {
                this.bottleBar.setCollectedBottles(this.bottleBar.collectedBottles - 1);
            }
        
            this.canThrowBottle = false;
            setTimeout(() => {
                this.canThrowBottle = true;
            }, 650);
        }
        
    }

    checkBottleHitEndbossCollisions() {
        this.throwableObjects.forEach((bottle, index) => {
            if (this.isBottleCollidingWithEndboss(bottle)) {
                this.handleBottleEndbossCollision(bottle, index);
            }
        });
    }

    isBottleCollidingWithEndboss(bottle) {
        return !bottle.hasCollided && this.level.endboss[0].isColliding(bottle);
    }

    handleBottleEndbossCollision(bottle, index) {
        bottle.hasCollided = true;
        this.level.endboss[0].bossIsHit();
        this.playBottleShatterSound();
        bottle.animateBottleSplash();
        setTimeout(() => {
            this.removeBottleAfterCollision(index);
        }, 1000);
    }

    removeBottleAfterCollision(index) {
        this.throwableObjects.splice(index, 1);
    }

    handleCollision() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    handleCollisionAboveGround(enemy) {
        enemy.energy--;
        this.character.jump();
        if (enemy.energy === 0) {
            enemy.playDeathAnimation();
            setTimeout(() => {
                this.removeEnemyFromLevel(enemy);
            }, 500);
        }
    }

    removeEnemyFromLevel(enemy) {
        const index = this.level.enemies.indexOf(enemy);
        if (index > -1) {
            this.level.enemies.splice(index, 1);
        }
    }

    isEndbossDefeated() {
        return this.level.endboss[0] && this.level.endboss[0].isDead;
    }

    isCharacterDead() {
        return this.character && this.character.energy <= 0;
    }

    endGame() {
        if (!this.gameOver) {
            this.gameOver = true;
            this.bottleBar.setCollectedBottles(0);
            this.throwableObjects = [];
            showEndScreen();
        }
    }

    draw() {
        if (!gameActive) return;
        this.clearCanvas();
        
        // Hintergrund + Wolken
        this.drawBackground(); // Hintergrundobjekte (z. B. Berge, Wiese)
        this.drawClouds();     // ☁️ Wolken direkt nach dem Hintergrund
    
        this.drawMainCharacter(); // Charakter
        this.drawUI();            // ✅ Statusbars immer im Vordergrund
        this.drawGameObjects();   // Gegner, Coins etc.
    
        requestAnimationFrameId = requestAnimationFrame(() => this.draw());
    }
    
    drawClouds() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
    }
    

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBackground() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
    }
    drawMainCharacter() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
    
        // 👁 Debug: Hitbox anzeigen
        const o = this.character.offset;
        // this.ctx.strokeStyle = 'red';
        // this.ctx.strokeRect(
        //     this.character.x + o.left,
        //     this.character.y + o.top,
        //     this.character.width - o.left - o.right,
        //     this.character.height - o.top - o.bottom
        // );
    
        this.ctx.translate(-this.camera_x, 0);
    }
    
    

    drawUI() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.updateEndbossHealthbarVisibility();
    
        if (this.showEndbossHealthbar) {
            this.addToMap(this.endbossHealthbar);
        }
    
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = 'white';

    }
    
    

    updateEndbossHealthbarVisibility() {
        if (this.character.x > 4500) {
            this.showEndbossHealthbar = true;
        }
    }

    drawGameObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.bottles);
        // this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    playGameSound(soundFilePath, volume = 0.2) {
        let gameSound = new Audio(soundFilePath);
        gameSound.volume = volume;
        gameSound.play();
    }

    playBottleShatterSound() {
        if (!isGameMuted) {
            this.playGameSound('audio/bottle_shatter.mp3');
        }
    }
}
