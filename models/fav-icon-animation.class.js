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
        this.animationFrames = animationFrames;
        this.currentFrame = 0;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 32;
        this.canvas.height = 32;
        this.faviconElement = document.getElementById('dynamic-favicon');

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
        const image = this.createImage();
        image.onload = () => {
            this.drawImageOnCanvas(image);
            this.updateFaviconHref();
            this.updateAnimationFrame();
        };
    }

    /**
     * Creates a new Image object for the current animation frame.
     * @returns {HTMLImageElement} The Image object for the current frame.
     */
    createImage() {
        const image = new Image();
        image.src = this.animationFrames[this.currentFrame];
        return image;
    }

    /**
     * Draws the given image onto the canvas.
     * @param {HTMLImageElement} image - The image to draw on the canvas.
     */
    drawImageOnCanvas(image) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Updates the href attribute of the favicon element to the canvas data URL.
     */
    updateFaviconHref() {
        if (this.faviconElement) {
            this.faviconElement.href = this.canvas.toDataURL('image/png');
        }
    }

    /**
     * Updates the current frame index to the next frame in the animation sequence.
     */
    updateAnimationFrame() {
        this.currentFrame = (this.currentFrame + 1) % this.animationFrames.length;
    }

    /**
     * Starts the animation loop using requestAnimationFrame.
     * Continuously updates the favicon by calling updateFavicon on each frame.
     */
    playAnimation() {
        const animate = () => {
            this.updateFavicon();
            requestAnimationFrame(animate);
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