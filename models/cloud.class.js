class Cloud extends MovableObject {
    y = 10;
    height = 250;
    width = 450;
    moveInterval = null; // Track the interval for cloud movement

    constructor() {
        super();
        this.loadImage(
            'img/5_background/layers/4_clouds/1.png',
            'img/5_background/layers/4_clouds/2.png'
        );
        this.x = Math.random() * 3000;
        this.y = Math.random() * 30;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }

    moveLeft() {
        this.moveInterval = setInterval(() => {
            this.x -= 0.055;
        }, 1000 / 60);
    }

    clearAllIntervals() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval); // Clear the cloud's movement interval
        }
    }
}