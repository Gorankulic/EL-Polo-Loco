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
    activateBottleSplashAnimation = false;
    accelerationX = 0;
    throwInterval = null;

    constructor(x, y, direction = 'right') {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.FLYING_BOTTLE_IMAGES);
        this.loadImages(this.BOTTLE_SPLASH_IMAGES);

        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(direction);
    }

    throw (direction) {
        this.thrownBottle = true;
        this.applyGravity();
        this.speedY = 15;
    
        this.throwInterval = setInterval(() => {
            this.playAnimation(this.FLYING_BOTTLE_IMAGES);
            if (direction === 'right') {
                this.x += 2;
            } else {
                this.x -= 2;
            }
            if (this.y >= 379) {
                this.y = 380; // Ensure it doesn't go below the specified coordinate
                this.speedY = 0;
                this.stopMovementX();
                this.triggerSplash(); // Trigger splash animation
                clearInterval(this.throwInterval);
            }
        }, 1000 / 60);
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
        }, 1000 / 120);

        setTimeout(() => {
            clearInterval(this.movementInterval);
        }, 500);
    }
}