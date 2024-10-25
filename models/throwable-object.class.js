class ThrowableObject extends MovableObject {
    FLYING_BOTTLE_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    BOTTLE_SPLASH_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png'
    ];
    thrownBottle = false;
    bottleCanBeThrown = false;
    activateBottleSplashAnimation = false;
    accelerationX = 0;
    throwInterval = null;
    movementInterval = null;
    intervalsCleared = false; // Add a flag to ensure intervals are only cleared once

    constructor(x, y, direction = 'right') {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.FLYING_BOTTLE_IMAGES);
        this.loadImages(this.BOTTLE_SPLASH_IMAGES);

        this.x = x;
        this.y = y;
        this.height = 40;
        this.width = 30;
        this.throw(direction);
    }

    throw (direction) {
        this.thrownBottle = true;
        this.applyGravity();
        this.speedY = 8;
        this.acceleration = 0.4;

        if (this.throwInterval) {
            clearInterval(this.throwInterval);
        }

        this.throwInterval = setInterval(() => {
            this.thrownBottleAnimation(direction);
            this.bottleFlyingDirection();
        }, 1000 / 60);
    }

    thrownBottleAnimation(direction) {
        this.playAnimation(this.FLYING_BOTTLE_IMAGES);
        if (direction === 'right') {
            this.x += 10; // Increase the x-axis speed to make the bottle fly farther
        } else {
            this.x -= 10; // Same increase for the left direction
        }
    }

    bottleFlyingDirection() {
        if (this.y >= 379) {
            this.y = 380; // Ensure it doesn't go below the specified coordinate
            this.speedY = 0;

            // Ensure intervals are only cleared once
            if (!this.intervalsCleared) {
                this.clearAllBottleIntervals(); // Ensure all intervals are cleared once
                this.stopMovementX(); // Stopping the movement after the splash
                setTimeout(() => {
                    this.triggerSplash(); // Trigger splash animation
                }, 200); // Trigger the splash after a slight delay

                // Keep the splash animation visible for longer before clearing intervals
                setTimeout(() => {
                    this.clearAnimationInterval(); // Delay clearing the animation
                }, 1500); // Increase this value to keep splash on screen longer
            }
        }
    }

    triggerSplash() {
        this.playAnimation(this.BOTTLE_SPLASH_IMAGES); // Use the playAnimation method to handle splash animation
    }

    stopMovementX() {
        if (!this.intervalsCleared) {
            this.movementInterval = setInterval(() => {
                if (this.speedY < 15) {
                    this.x -= this.speedX;
                    this.speedX -= this.accelerationX;
                }
            }, 1000 / 60);

            // Clear the movement interval after 1 second, if not already cleared
            setTimeout(() => {
                this.clearAnimationInterval();
            }, 1000);
        }
    }
    stopMovementXandY() {
        // Set both the x and y velocities to 0 to stop movement completely
        this.speedX = 0;
        this.speedY = 0;
    }

    clearAllBottleIntervals() {
        if (!this.intervalsCleared) {
            this.intervalsCleared = true; // Mark intervals as cleared
            if (this.throwInterval) {
                clearInterval(this.throwInterval);
            }
            if (this.movementInterval) {
                clearInterval(this.movementInterval);
            }
        }
    }

    clearAnimationInterval() {
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
            this.movementInterval = null;
        }
    }
}