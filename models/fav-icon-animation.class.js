class FaviconAnimator {
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

    playAnimation() {
        const animate = () => {
            this.updateFavicon();
            requestAnimationFrame(animate); // Schedule the next frame
        };
        requestAnimationFrame(animate);
    }

    stopAnimation() {
        // No need for clearInterval with requestAnimationFrame
        console.warn("Stopping the animation needs to be handled differently with requestAnimationFrame.");
    }
}