class Coins extends MovableObject {
    y = 320;
    height = 140;
    width = 140;

    COIN_IMAGES = ['img/8_coin/coin_1.png'];

    constructor() {
        super().loadImage(this.COIN_IMAGES[0]);
        this.loadImages(this.COIN_IMAGES);
        this.x = this.getSpawnX();
        this.y = this.calculateRandomHeight(); // Set random vertical position
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
                return Coins.lastX; // Return the last valid x-coordinate
            }
        } while (!this.isValidDistance(newX, Coins.lastX, minDistance));

        return newX;
    }

    /**
     * Determines the spawn x-coordinate for the coin.
     * @returns {number} The calculated spawn x-coordinate.
     */
    getSpawnX() {
        const minX = 800;
        const maxX = 4500;
        const minDistance = 300;

        const spawnX = this.calculateSpawnX(minX, maxX, minDistance);
        Coins.lastX = spawnX; // Update the static variable to track the last position
        return spawnX;
    }

    /**
     * Calculates a random height for the coin within a specified range.
     * @returns {number} A random y-coordinate.
     */
    calculateRandomHeight() {
        const minY = 10;
        const maxY = 20;
        return Math.random() * (maxY - minY) + minY;
    }
}