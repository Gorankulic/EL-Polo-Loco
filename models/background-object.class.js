/**
 * Class representing a background object in the game.
 * Extends the MovableObject class and is used for background elements in the game environment.
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Constructs a BackgroundObject instance and sets its image and position.
     * @param {string} imagePath - The path to the image for the background object.
     * @param {number} x - The x-coordinate position where the background object is placed.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}