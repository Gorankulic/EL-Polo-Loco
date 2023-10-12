class SmallChickens extends MovableObject {
    y = 370;
    height = 50;
    width = 40;
    offset = {
        right: 5,
        left: 5,
        top: 0,
        bottom: 0
    }

    RUNNING_IMAGES_FOR_SMALL_CHICKEN = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');

        this.loadImages(this.RUNNING_IMAGES_FOR_SMALL_CHICKEN);
        this.x = 300 + Math.random() * 2200;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.RUNNING_IMAGES_FOR_SMALL_CHICKEN);
        }, 100);
    }
}