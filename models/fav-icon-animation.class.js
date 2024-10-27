/**
 * Class representing a Favicon Animator that animates the favicon using a sequence of images.
 * Uses an array of image paths to create an animation for the browser's favicon.
 */
class FaviconAnimator {
    /**
     * Constructs a FaviconAnimator instance and initializes the animation frames and canvas.
     * @param {string[]} animationFrames - An array of image paths used for the animation frames.
     */
    constructor(animationFrames) {
        this.animationFrames = animationFrames; // Array of image paths for animation
        this.currentFrame = 0;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 32; // Set to a smaller size for favicon
        this.canvas.height = 32;
        this.faviconElement = document.getElementById('dynamic-favicon');

        // Start the animation if the favicon element exists
        if (this.faviconElement) {
            this.playAnimation();
        } else {
            console.error("Favicon element not found. Ensure it exists in the HTML with the correct ID.");
        }
    }

    /**
     * Updates the favicon to display the current frame of the animation.
     * This method clears the canvas, draws the current image, and updates the favicon's href.
     */
    updateFavicon() {
        const image = new Image();
        image.src = this.animationFrames[this.currentFrame];
        image.onload = () => {
            // Clear the canvas and draw the current frame
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);

            // Check if favicon element exists before setting the href
            if (this.faviconElement) {
                this.faviconElement.href = this.canvas.toDataURL('image/png');
            }

            // Move to the next frame
            this.currentFrame = (this.currentFrame + 1) % this.animationFrames.length;
        };
    }

    /**
     * Starts the animation loop using requestAnimationFrame.
     * Continuously updates the favicon by calling updateFavicon on each frame.
     */
    playAnimation() {
        const animate = () => {
            this.updateFavicon();
            requestAnimationFrame(animate); // Schedule the next frame
        };
        requestAnimationFrame(animate);
    }

    /**
     * Placeholder for stopping the animation. Note: requestAnimationFrame does not use intervals,
     * so stopping requires canceling the animation frame.
     */
    stopAnimation() {
        console.warn("Stopping the animation needs to be handled differently with requestAnimationFrame.");
    }
}