// Define a class named DrawableObject.
class DrawableObject {
    // Declare instance variables for the class.
    img; // Stores the main image for the object.
    imageCache = {}; // Caches additional images if needed.
    currentImage = 0; // Tracks the current image (if using multiple images for animation).
    x = 120; // X-coordinate of the object.
    y = 280; // Y-coordinate of the object.
    height = 150; // Height of the object.
    width = 100; // Width of the object.

    // Method to load a single image for the object.
    loadImage(path) {
        // Create a new Image object and set its source to the provided path.
        this.img = new Image();
        this.img.src = path;
    }

    // Method to draw the object on the canvas using its current image.
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // Method to draw a frame (a blue rectangle) around the object for debugging purposes.
    drawFrame(ctx) {
        // Check if the object is an instance of the Character or Chicken class (for debugging).
        if (this instanceof Character || this instanceof Chicken) {
            // Begin drawing a path (rectangle) around the object.
            ctx.beginPath();
            ctx.lineWidth = '5'; // Set the line width for the rectangle.
            ctx.strokeStyle = 'blue'; // Set the stroke color to blue.
            ctx.rect(this.x, this.y, this.width, this.height); // Define the rectangle's dimensions.
            ctx.stroke(); // Draw the rectangle.
        }
    }

    // Method to load multiple images into the imageCache for animations.
    loadImages(arr) {
        arr.forEach((path) => {
            // Create a new Image object for each path in the provided array.
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)'; // Apply a horizontal flip to the image (not typical).
            this.imageCache[path] = img; // Store the image in the cache using its path as the key.
        });
    }
}