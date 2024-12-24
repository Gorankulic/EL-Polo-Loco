/**
 * Represents a small chicken enemy in the game.
 * Extends the `MovableObject` class.
 */
class SmallChickens extends MovableObject {
    y = 355; // Vertical position of the small chicken
    height = 60; // Height of the small chicken
    width = 50; // Width of the small chicken
    offset = {
        right: 5,
        left: 5,
        top: 0,
        bottom: 0
    }; // Collision box offsets for the small chicken

    gameSounds = new GameSound(); // Instance of game sounds for the small chicken

    ELIMINATED_CHICKEN_WIDTH = 50; // Width of the eliminated chicken
    ELIMINATED_CHICKEN_HEIGHT = 40; // Height of the eliminated chicken
    characterEnemyCollision = false; // Tracks if the character is colliding with the chicken

    RUNNING_IMAGES_FOR_SMALL_CHICKEN = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]; // Images for the running animation of the small chicken

    ELIMINATED_CHICKEN_IMAGES = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]; // Images for the eliminated animation of the small chicken

    /**
     * Initializes a new instance of the `SmallChickens` class.
     */
    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.RUNNING_IMAGES_FOR_SMALL_CHICKEN);
        this.loadImages(this.ELIMINATED_CHICKEN_IMAGES);
        this.x = this.getSpawnX();
        this.speed = 0.15; // Movement speed of the small chicken
    }

    /**
     * Generates a random x-coordinate for spawning the small chicken,
     * ensuring a minimum distance from the last spawn position.
     * @returns {number} The x-coordinate for the spawn position.
     */
    getSpawnX() {
        let minX = 800;
        let maxX = 4500;
        let minDistance = 300;
        let newX;
        do {
            newX = minX + Math.random() * (maxX - minX);
        } while (Math.abs(newX - SmallChickens.lastX) < minDistance);
        SmallChickens.lastX = newX;
        return newX;
    }

    /**
     * Animates the movement of the small chicken.
     * Handles leftward movement and walking sound playback.
     */
    animate() {
        this.moveInterval = setInterval(() => {
            if (!world.stopAllAnimations) {
                this.moveLeft();
                if (!world.pauseSmallChickenSound) {
                    world.gameSounds.playSmallChickenWalkSound();
                }
            }
        }, 1000 / 80);
        this.stopAnimationsForChicken();
    }

    /**
     * Checks if the character is colliding with the small chicken.
     * @returns {boolean} True if the character is colliding, otherwise false.
     */
    isCharacterColliding() {
        return this.characterEnemyCollision;
    }

    /**
     * Handles animation transitions for the small chicken based on its state.
     */
    stopAnimationsForChicken() {
        this.animationInterval = setInterval(() => {
            if (!world.stopAllAnimations) {
                if (this.characterEnemyCollision) {
                    this.playAnimation(this.ELIMINATED_CHICKEN_IMAGES);
                } else {
                    this.playAnimation(this.RUNNING_IMAGES_FOR_SMALL_CHICKEN);
                }
            }
        }, 500 / 5);
    }

    /**
     * Clears all intervals associated with the small chicken.
     */
    clearAllIntervals() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
        }
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }

    /**
     * Resets the small chicken to its initial state,
     * clearing all intervals and restarting animations.
     */
    reset() {
        this.characterEnemyCollision = false;
        this.x = this.getSpawnX();
        this.speed = 0.15;
        this.clearAllIntervals();
        this.animate();
    }
}
