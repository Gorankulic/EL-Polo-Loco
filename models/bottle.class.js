/**
 * Class representing a bottle object in the game.
 * Extends the MovableObject class.
 */
class Bottle extends MovableObject {
    y = 365;
    height = 50;
    width = 40;

    BOTTLE_IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    static previousBottlePositions = [];

    /**
     * Constructs a new Bottle instance and initializes its properties.
     * Randomly selects an image for the bottle and sets its spawn position.
     */
    constructor() {
        super();
        const randomIndex = Math.floor(Math.random() * this.BOTTLE_IMAGES.length);
        const randomImage = this.BOTTLE_IMAGES[randomIndex];

        this.loadImage(randomImage);
        this.x = this.getSpawnX();
        Bottle.previousBottlePositions.push(this.x);
    }

    /**
     * Generates a random x-coordinate within the specified range.
     * @param {number} minX - Minimum x-coordinate for the range.
     * @param {number} maxX - Maximum x-coordinate for the range.
     * @returns {number} A random x-coordinate.
     */
    generateRandomX(minX, maxX) {
        return minX + Math.random() * (maxX - minX);
    }

    /**
     * Checks if the distance between the new and last x-coordinate is valid.
     * @param {number} newX - The new x-coordinate.
     * @param {number} lastX - The last x-coordinate.
     * @param {number} minDistance - Minimum distance between coordinates.
     * @returns {boolean} True if the distance is valid, false otherwise.
     */
    isValidDistance(newX, lastX, minDistance) {
        return Math.abs(newX - lastX) >= minDistance;
    }

    /**
     * Attempts to calculate a valid x-coordinate within a given number of retries.
     * @param {number} minX - Minimum x-coordinate for the range.
     * @param {number} maxX - Maximum x-coordinate for the range.
     * @param {number} minDistance - Minimum distance between coordinates.
     * @param {number} maxRetries - Maximum number of retries.
     * @returns {number} A valid x-coordinate or the last valid x-coordinate.
     */
    calculateSpawnX(minX, maxX, minDistance, maxRetries = 100) {
        let newX;
        let retries = 0;

        do {
            newX = this.generateRandomX(minX, maxX);
            retries++;
            if (retries > maxRetries) {
                return Bottle.previousBottlePositions.at(-1) || minX;
            }
        } while (!this.isValidDistance(newX, Bottle.previousBottlePositions.at(-1) || minX, minDistance));

        return newX;
    }

    /**
     * Determines the spawn x-coordinate for the bottle.
     * @returns {number} The calculated spawn x-coordinate.
     */
    getSpawnX() {
        const minX = 800;
        const maxX = 4500;
        const minDistance = 300;

        const spawnX = this.calculateSpawnX(minX, maxX, minDistance);
        return spawnX;
    }
}