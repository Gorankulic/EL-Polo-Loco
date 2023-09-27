class Cloud extends MovableObject {
    y = 50;
    height = 250;
    width = 500;

    constructor() {

        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();

    }
    moveLeft() {
        setInterval(() => {
            this.x -= 0.055;
        }, 100 / 60);
    }
}