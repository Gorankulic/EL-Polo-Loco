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

    ELIMINATED_BROWN_CHICKEN_IMAGES_WIDTH = 50;
    ELIMINATED_BROWN_CHICKEN_IMAGES_HEIGHT = 40;

    characterEnemyCollision = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    ELIMINATED_CHICKEN_IMAGES = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

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
        this.speed = 0.25;
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
        this.moveInterval = setInterval(() => {
            if (!world.stopAllAnimations) {
                this.moveLeft();
            }
        }, 500 / 40);
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
        }, 500 / 5);
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

    reset() {
        this.clearAllIntervals();
        this.characterEnemyCollision = false;
        this.x = this.getSpawnX();
        this.speed = 0.25;
        this.animate();
    }


}