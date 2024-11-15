/**
 * Class representing a drawable object in the game.
 * Responsible for loading and drawing images.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    /**
     * Loads an image and sets it as the object's current image.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object's image on the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas context where the image will be drawn.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws the frame (bounding box) of the object for debugging purposes.
     * Only draws frames for Character, Chicken, and SmallChickens objects.
     * @param {CanvasRenderingContext2D} ctx - The canvas context where the frame will be drawn.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChickens) {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
        }
    }

    /**
     * Loads multiple images and stores them in the image cache.
     * @param {string[]} arr - An array of image paths to be loaded.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)'; // Flips the image horizontally
            this.imageCache[path] = img;
        });
    }
}