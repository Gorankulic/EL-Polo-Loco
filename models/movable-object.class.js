/**
 * Class representing a movable object in the game.
 * Extends the DrawableObject class. This serves as a base class for all objects that move within the game.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    endBossEnergy = 100;
    gravityInterval = null;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Applies gravity to the object, making it fall if it's above ground or moving upwards.
     * Sets up an interval to update the object's position based on gravity.
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 120);
    }

    /**
     * Generates a random x-coordinate for spawning the object, ensuring a minimum distance from the last spawn.
     * @param {number} minX - The minimum x-coordinate for the spawn area.
     * @param {number} maxX - The maximum x-coordinate for the spawn area.
     * @param {number} [minDistance=200] - The minimum distance between the current and last spawned object.
     * @param {string} objectType - The type of the object being spawned (e.g., 'Bottles', 'Clouds').
     * @returns {number} The generated x-coordinate for the object's spawn position.
     */
    getRandomSpawnX(minX, maxX, minDistance = 200, objectType) {
        // Initialize the lastPositions storage if it doesn't exist
        if (!MovableObject.lastPositions) {
            MovableObject.lastPositions = {};
        }
        if (!MovableObject.lastPositions[objectType]) {
            MovableObject.lastPositions[objectType] = 0;
        }

        let newX;
        // Generate a new x position until it meets the minimum distance requirement
        do {
            newX = minX + Math.random() * (maxX - minX);
        } while (Math.abs(newX - MovableObject.lastPositions[objectType]) < minDistance);

        // Update the last position for this object type
        MovableObject.lastPositions[objectType] = newX;
        return newX;
    }

    /**
     * Plays the animation for the object using the provided array of images.
     * @param {string[]} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        if (!images || images.length === 0) return; // Exit if images is undefined or empty

        if (images.length === 1) {
            // If there's only one image, simply use it without needing the modulus operation
            this.img = this.imageCache[images[0]];
        } else {
            // Original logic for cycling through multiple images
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    /**
     * Checks if the object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object to check collision against.
     * @returns {boolean} True if a collision is detected, otherwise false.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Checks if the object is above the ground.
     * For ThrowableObject instances, it always returns true.
     * @returns {boolean} True if the object is above ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 75;
        }
    }

    /**
     * Reduces the object's energy when it is hit. Updates the last hit timestamp.
     */
    hit() {
        this.energy -= 2; // Deduct a small amount of energy on each hit
        if (this.energy <= 0) {
            this.energy = 0; // Ensure energy doesn't go negative
        }
        this.lastHit = new Date().getTime(); // Update the time of the last hit
    }

    /**
     * Checks if the object is dead (i.e., its energy is zero).
     * @returns {boolean} True if the object is dead, otherwise false.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Checks if the end boss is dead (i.e., its energy is zero).
     * @returns {boolean} True if the end boss is dead, otherwise false.
     */
    endBossIsDead() {
        return this.endBossEnergy === 0;
    }

    /**
     * Checks if the object is hurt based on the time since the last hit.
     * @returns {boolean} True if the object is still hurt, otherwise false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 500;
        return timePassed < 1;
    }

    /**
     * Moves the object to the right by increasing its x-coordinate based on its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by decreasing its x-coordinate based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting a vertical speed.
     */
    jump() {
        this.speedY = 12;
    }

    /**
     * Stops the object's movement on the x-axis by setting its speed to zero.
     */
    stopMovementX() {
        this.speed = 0;
    }

    /**
     * Clears all intervals related to this object's gravity, stopping its movement.
     */
    clearAllIntervals() {
        if (this.gravityInterval) {
            clearInterval(this.gravityInterval); // Clear the gravity interval
        }
    }
}