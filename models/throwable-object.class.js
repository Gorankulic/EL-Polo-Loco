/**
 * Class representing a throwable object, such as a Tobasco sauce bottle, in the game.
 * Extends the MovableObject class and handles the mechanics for throwing and animating the bottle.
 */
class ThrowableObject extends MovableObject {
    // Image paths for flying and splashing animations
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
    intervalsCleared = false;

    /**
     * Constructs a ThrowableObject instance, initializes its position, dimensions, and starts the throw animation.
     * @param {number} x - The initial x-coordinate of the bottle.
     * @param {number} y - The initial y-coordinate of the bottle.
     * @param {string} [direction='right'] - The direction of the throw ('right' or 'left').
     */
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

    /**
     * Initiates the throw animation and physics for the bottle.
     * @param {string} direction - The direction ('right' or 'left') in which the bottle is thrown.
     */
    throw (direction) {
        this.thrownBottle = true;
        this.applyGravity();
        this.speedY = 8;
        this.acceleration = 0.7;

        if (this.throwInterval) {
            clearInterval(this.throwInterval);
        }

        this.throwInterval = setInterval(() => {
            this.thrownBottleAnimation(direction);
            this.bottleFlyingDirection();
        }, 1000 / 60);
    }

    /**
     * Animates the flying bottle based on its direction and updates its x-coordinate.
     * @param {string} direction - The direction ('right' or 'left') in which the bottle is flying.
     */
    thrownBottleAnimation(direction) {
        this.playAnimation(this.FLYING_BOTTLE_IMAGES);
        if (direction === 'right') {
            this.x += 10; // Move the bottle to the right
        } else {
            this.x -= 10; // Move the bottle to the left
        }
    }

    /**
     * Manages the bottle's behavior when it reaches the ground and triggers the splash animation.
     */
    bottleFlyingDirection() {
        if (this.y >= 379) {
            this.y = 380; // Ensure the bottle stays at ground level
            this.speedY = 0;

            if (!this.intervalsCleared) {
                this.clearAllBottleIntervals();
                this.stopMovementX();
                setTimeout(() => {
                    this.triggerSplash();
                }, 200); // Delay to trigger splash animation

                setTimeout(() => {
                    this.clearAnimationInterval();
                }, 1500); // Keep the splash animation visible for 1.5 seconds
            }
        }
    }

    /**
     * Triggers the splash animation when the bottle hits the ground.
     */
    triggerSplash() {
        this.playAnimation(this.BOTTLE_SPLASH_IMAGES);
        this.isGravityEnabled = false;
        this.clearGravity();
        this.stopMovementXandY();
    
        // Remove bottle after splash animation duration
        setTimeout(() => {
            this.markForRemoval(); // Custom logic to remove the bottle
        }, 250); // Assuming the splash lasts 250ms
    }
    markForRemoval() {
        if (this.world) {
            const index = this.world.throwableObjects.indexOf(this);
            if (index !== -1) {
                this.world.throwableObjects.splice(index, 1);
            }
        }
    }
        
    /**
     * Stops the horizontal movement of the bottle.
     */
    stopMovementX() {
        if (!this.intervalsCleared) {
            this.movementInterval = setInterval(() => {
                if (this.speedY < 15) {
                    this.x -= this.speedX;
                    this.speedX -= this.accelerationX;
                }
            }, 1000 / 60);

            setTimeout(() => {
                this.clearAnimationInterval();
            }, 1000);
        }
    }

    /**
     * Stops both horizontal and vertical movement.
     */
    stopMovementXandY() {
        this.clearAllBottleIntervals(); // Stop all intervals
        this.speedX = 0; 
        this.speedY = 0; 
    }
    

    /**
     * Clears all intervals related to the bottle's movement and animations.
     */
    clearAllBottleIntervals() {
        if (!this.intervalsCleared) {
            this.intervalsCleared = true;
            if (this.throwInterval) {
                clearInterval(this.throwInterval);
            }
            if (this.movementInterval) {
                clearInterval(this.movementInterval);
            }
        }
    }

    /**
     * Clears the animation interval to stop the bottle's movement.
     */
    clearAnimationInterval() {
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
            this.movementInterval = null;
        }
    }
}