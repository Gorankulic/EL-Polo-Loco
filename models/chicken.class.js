/**
 * Class representing a Chicken enemy in the game.
 * Extends the MovableObject class.
 */
class Chicken extends MovableObject {
    y = 335;
    height = 80;
    width = 70;
    offset = {
        right: 5,
        left: 5,
        top: 0,
        bottom: 0
    };

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

    /**
     * Constructs a new Chicken instance and initializes its properties.
     */
    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.ELIMINATED_CHICKEN_IMAGES);
        this.x = this.getSpawnX();
        this.speed = 0.15 + Math.random() * 0.25;
    }

    /**
     * Calculates the spawn x position ensuring a minimum distance between chickens.
     * @returns {number} The calculated x position for the chicken.
     */
    getSpawnX() {
        let minX = 800;
        let maxX = 4500;
        let minDistance = 300;

        let newX;
        do {
            newX = minX + Math.random() * (maxX - minX);
        } while (Math.abs(newX - Chicken.lastX) < minDistance);

        Chicken.lastX = newX;
        return newX;
    }

    /**
     * Starts the movement and animation for the chicken.
     */
    animate() {
        setInterval(() => {
            if (!world.stopAllAnimations) {
                this.moveLeft();
            }
        }, 1000 / 60);
        this.stopAllAnimationsforChicken();
    }

    /**
     * Manages the animation for the chicken, switching between walking and eliminated states.
     */
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

    /**
     * Clears all intervals related to the chicken's movement and animation.
     */
    clearAllIntervals() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
        }
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }
}