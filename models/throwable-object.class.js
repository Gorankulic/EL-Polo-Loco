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

                if (direction === 'right') {
                    this.x += 2;
                    this.playAnimation(this.FLYING_BOTTLE_IMAGES);
                } else {
                    this.x -= 2;
                    this.playAnimation(this.FLYING_BOTTLE_IMAGES);
                }
                if (this.y > 379) {
                    this.y = 380;
                    this.stopMovementX();
                    this.playAnimation(this.BOTTLE_SPLASH_IMAGES);
                    this.speedY = 0;
                }


            }, 1000 / 60);



        }
        ///////////////////////////////////////////////////////////////////////////////////////

    stopMovementX() {
        setInterval(() => {
            if (this.speedY == 0) {
                this.x -= this.speedX;
                this.speedX -= this.accelerationX;
            }
        }, 1000 / 60);

    }



}