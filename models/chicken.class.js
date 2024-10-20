class Chicken extends MovableObject {
    y = 335;
    height = 80;
    width = 70;
    offset = {
            right: 5,
            left: 5,
            top: 0,
            bottom: 0
        }
        // Width and height for the eliminated chicken images
    ELIMINATED_BROWN_CHICKEN_IMAGES_WIDTH = 50;
    ELIMINATED_BROWN_CHICKEN_IMAGES_HEIGHT = 40;
    // Flag to indicate if the chicken has collided with the character
    characterEnemyCollision = false;

    // Array of image paths for the walking animation
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    // Array of image paths for the eliminated chicken animation
    ELIMINATED_CHICKEN_IMAGES = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    // Static variable to keep track of the last chicken's position
    static lastX = 0;

    constructor() {
        // Call the constructor of the parent class MovableObject
        super();
        // Load the first image for the chicken
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        // Load all images for the walking animation
        this.loadImages(this.IMAGES_WALKING);
        // Load all images for the eliminated chicken animation
        this.loadImages(this.ELIMINATED_CHICKEN_IMAGES);
        // Set the initial x position with spacing
        this.x = this.getSpawnX();
        // Set a random speed for the chicken
        this.speed = 0.15 + Math.random() * 0.25;
        // Start the animation for the chicken

    }

    // Method to calculate the spawn x position with minimum distance from the last chicken
    getSpawnX() {
        // Minimum x value for spawning
        let minX = 800;
        // Maximum x value for spawning
        let maxX = 2500;
        // Minimum distance between chickens
        let minDistance = 100;

        let newX;
        // Generate a new x position until it meets the minimum distance requirement
        do {
            newX = minX + Math.random() * (maxX - minX);
        } while (Math.abs(newX - Chicken.lastX) < minDistance);

        // Update the last chicken's position
        Chicken.lastX = newX;
        return newX;
    }

    // Method to start the animation for the chicken
    animate() {
        setInterval(() => {
            if (!world.stopAllAnimations) {
                this.moveLeft();
            }
        }, 1000 / 60);
        this.stopAllAnimationsforChicken();

    }
    stopAllAnimationsforChicken() {
        this.animationInterval = setInterval(() => {
            if (!world.stopAllAnimations) {
                if (this.characterEnemyCollision) {
                    this.playAnimation(this.ELIMINATED_CHICKEN_IMAGES);
                } else {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 1000 / 20);
    }

    clearAllIntervals() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
        }
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }
}