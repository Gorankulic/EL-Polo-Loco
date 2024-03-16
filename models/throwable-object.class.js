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

        setInterval(() => {
            this.playAnimation(this.FLYING_BOTTLE_IMAGES);
            if (direction === 'right') {
                this.x += 2;
            } else {
                this.x -= 2;
            }
            if (this.y > 379) {
                this.y = 380;
                this.stopMovementX();
                this.playAnimation(this.BOTTLE_SPLASH_IMAGES);
                this.speedY = 0;
            }
        }, 1000 / 60);

    }

    stopMovementX() {
        // Assign the interval ID to a property for later reference
        this.movementInterval = setInterval(() => {
            if (this.speedY == 0) {
                this.x -= this.speedX;
                this.speedX -= this.accelerationX;
            }
        }, 1000 / 60);

        // Use setTimeout to clear the interval after a delay
        setTimeout(() => {
            clearInterval(this.movementInterval);
        }, 250);
    }




}