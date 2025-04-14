/**
 * Represents a bottle object in the game.
 * @extends MoveableObject
 */
class Bottles extends MoveableObject {
    width = 60;
    height = 80;
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_BOTTLE[Math.round(Math.random())]);
        this.x = x + 450;
        this.y = y;
        this.offset = {
            top: 5,
            right: 5,
            bottom: 5,
            left: 5
        };
        this.collected = false; // Flasche ist noch nicht eingesammelt
    }
    
    // Überschreibe die draw()-Methode, damit eingesammelte Flaschen nicht gezeichnet werden.
    draw(ctx) {
        if (this.collected) return;
        super.draw(ctx);
    }
}
