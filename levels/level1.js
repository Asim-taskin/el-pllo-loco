/**
 * Initialize the game level with specified entities and objects.
 */
function initLevel() {
    /**
     * The game level, containing chickens, clouds, background objects, coins, bottles, and an endboss.
     * @type {Level}
     */
    level1 = new Level(
        // Chickens array
        [
            new Chicken(1000, 275),
            new Chicken(1250, 275),
            new Chicken(1450, 275),
            new Chicken(1700, 275),
            new Chicken(2050, 275),
            new Chicken(2400, 275),
            new Chicken(2700, 275),
            new Chicken(2900, 275),
            new Chicken(3100, 275),
            new Chicken(3400, 275),
            new Chicken(3900, 275),
            new Chicken(4100, 275),
        ],
        // Clouds array
        [
            new Cloud(200),
            new Cloud(800),
            new Cloud(1400),
            new Cloud(2000)
        ],
        // Background objects array
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 7),
        ],
        // Coins array
        [
            new Coin(200, 150),
            new Coin(250, 100),
            new Coin(300, 150),
            new Coin(1000, 100),
            new Coin(1050, 150),
            new Coin(1050, 50),
            new Coin(1100, 100),
            new Coin(1450, 200),
            new Coin(1800, 150),
            new Coin(1800, 75),
            new Coin(2400, 150),
            new Coin(2450, 100),
            new Coin(2500, 150),
            new Coin(2750, 50),
            new Coin(3100, 150),
            new Coin(3150, 75),
            new Coin(3450, 150),
            new Coin(3550, 100),
            new Coin(3600, 150),
            new Coin(4000, 50),
        ],
        // Bottles array
        [
            new Bottles(0, 375),
            new Bottles(100, 375),
            new Bottles(650, 375),
            new Bottles(950, 375),
            new Bottles(1200, 375),
            new Bottles(1300, 375),
            new Bottles(1450, 375),
            new Bottles(1650, 375),
            new Bottles(1750, 375),
            new Bottles(2050, 375),
            new Bottles(2350, 375),
            new Bottles(2550, 375),
            new Bottles(2950, 375),
            new Bottles(3250, 375),
            new Bottles(3550, 375),
            new Bottles(3700, 375),
            new Bottles(3950, 375),
        ],
        // Endboss
        [new Endboss()]
    );
}
