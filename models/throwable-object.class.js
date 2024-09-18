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
        this.speedY = 10;
        this.acceleration = 0.5;

        this.throwInterval = setInterval(() => {
            this.thrownBottleAnimation(direction);
            this.bottleFlyingDirection();
        }, 1000 / 120); // Throw animation interval


    }

    thrownBottleAnimation(direction) {
        this.playAnimation(this.FLYING_BOTTLE_IMAGES);
        if (direction === 'right') {
            this.x += 2;
        } else {
            this.x -= 2;
        }
    }
    bottleFlyingDirection() {
        if (this.y >= 379) {
            this.y = 380; // Ensure it doesn't go below the specified coordinate
            this.speedY = 0;

            this.triggerSplash(); // Trigger splash animation
            this.stopMovementX();


        }
    }
    triggerSplash() {
        this.playAnimation(this.BOTTLE_SPLASH_IMAGES);
    }
    stopMovementX() {
        this.movementInterval = setInterval(() => {
            if (this.speedY < 15) {
                this.x -= this.speedX;
                this.speedX -= this.accelerationX;
            }
        }, 1000 / 60);
        setTimeout(() => {
            this.clearAnimationInterval();
        }, 3000);
    }
    clearAllBottleIntervals() {
        if (this.throwInterval) {
            clearInterval(this.throwInterval);
        }
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
        }
    }


    clearAnimationInterval() {
        // Clear the movement interval
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
        }
    }
}