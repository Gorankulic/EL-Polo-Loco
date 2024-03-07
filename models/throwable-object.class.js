class ThrowableObject extends MovableObject {
    FLYING_BOTTLE_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    BOTTLE_SPLASH_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    ];
    thrownBottle = false;
    activateBottleSplashAnimation = false;

    constructor(x, y, direction = 'right') {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.FLYING_BOTTLE_IMAGES);
        this.loadImages(this.BOTTLE_SPLASH_IMAGES);

        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(direction);
        this.animate();
    }

    throw (direction) {
            this.thrownBottle = true;
            this.speedY = 15;
            this.applyGravity();
            setInterval(() => {

                if (direction === 'right') {
                    this.x += 2;
                } else {
                    this.x -= 2;
                }

            }, 5);


        }
        ///////////////////////////////////////////////////////////////////////////////////////
    animate() {

        setInterval(() => {
            // Handle animation states
            if (this.thrownBottle == true) {
                this.playAnimation(this.FLYING_BOTTLE_IMAGES); /////////////
            } else if (this.this.y >= 380) {
                this.playAnimation(this.BOTTLE_SPLASH_IMAGES);
            }
        }, 50);
    }
    jump() {
        this.speedY = 16;
    }
    secondJump() {
        this.speedY = 15; // Initial jump boost

    }
    isBored() {
        const currentTime = new Date().getTime();
        return this.lastMovedTimestamp && (currentTime - this.lastMovedTimestamp) > 500;
    }
    isSleeping() {
            const currentTime = new Date().getTime();
            return this.lastMovedTimestamp && (currentTime - this.lastMovedTimestamp) > 5000;
        }
        // Inside your Character class:
    moveLeft() {
        this.x -= this.speed;
        this.lastDirection = 'left';
    }

    moveRight() {
        this.x += this.speed;
        this.lastDirection = 'right';
    }


}