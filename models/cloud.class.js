class Cloud extends MovableObject {
    y = 10;
    height = 250;
    width = 450;

    constructor() {

        super().loadImage('img/5_background/layers/4_clouds/1.png', 'img/5_background/layers/4_clouds/2.png', );



        this.x = Math.random() * 3000;
        this.y = Math.random() * 30;
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