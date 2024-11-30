/**
 * Class representing a cloud object that moves within the game environment.
 * Extends the MovableObject class.
 */
class Cloud extends MovableObject {
    y = 10;
    height = 250;
    width = 450;
    moveInterval = null;
    static clouds = [];

    /**
     * Creates a new Cloud instance, sets its position, and starts its animation.
     */
    constructor() {
        super();
        this.loadImage(
            'img/5_background/layers/4_clouds/1.png',
            'img/5_background/layers/4_clouds/2.png'
        );
        this.setPosition();
        this.animate();
        Cloud.clouds.push(this); // Add the new cloud to the static array
    }

    /**
     * Sets the position of the cloud ensuring a minimum distance between clouds
     * using the getRandomSpawnX method from the MovableObject class.
     */
    setPosition() {
        const minX = 0;
        const maxX = 5000;
        const minDistance = 500;
        this.x = this.getRandomSpawnX(minX, maxX, minDistance, 'Cloud');
        this.y = Math.random() * 30;
    }

    /**
     * Initiates the animation of the cloud by calling the moveLeft method.
     */
    animate() {
        this.moveLeft();
    }

    /**
     * Moves the cloud left at a constant speed using a setInterval function.
     * The cloud's x-coordinate is decreased continuously.
     */
    moveLeft() {
        this.moveInterval = setInterval(() => {
            this.x -= 0.055;
        }, 1000 / 60);
    }

    /**
     * Clears all intervals related to the cloud's movement.
     * Stops the movement of the cloud when called.
     */
    clearAllIntervals() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval); // Clear the cloud's movement interval
        }
    }
    reset() {
        this.clearAllIntervals(); // Stop current animations
        this.setPosition(); // Reset position
        this.animate(); // Restart movement
    }


}