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
    ELIMINATED_CHICKEN_WIDTH = 50;
    ELIMINATED_CHICKEN_HEIGHT = 40;
    isBeingEliminated = false; // New property indicating elimination status


    RUNNING_IMAGES_FOR_SMALL_CHICKEN = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    ELIMINATED_CHICKEN_IMAGES = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');

        this.loadImages(this.RUNNING_IMAGES_FOR_SMALL_CHICKEN);
        this.loadImages(this.ELIMINATED_CHICKEN_IMAGES);

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
        }, 100 / 60);


    }
    chickenIsEliminatedAnimation() {
        if (!this.isBeingEliminated) {
            this.isBeingEliminated = true; // Flag that elimination is in process
            this.loadImage(this.ELIMINATED_CHICKEN_IMAGES[0]); // Load the eliminated image
            setTimeout(() => {
                this.isBeingEliminated = false; // Reset flag after 1.5 seconds
                // Call a method to remove the chicken from the game, e.g., removeFromArray()
            }, 1500);
        }
    }





}