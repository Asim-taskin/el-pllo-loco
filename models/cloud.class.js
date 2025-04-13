/**
* Represents a cloud object that moves across the screen.
* Extends the MoveableObject class.
*/
class Cloud extends MoveableObject {
    y = 25;
    width = 400;
    height = 250;

    constructor(x = 0) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.x + this.width < 0) {
                this.x = window.innerWidth + 1000 + Math.random() * 1000; // zufällig aber weiter entfernt
            }
        }, 1000 / 60);
    }
}
