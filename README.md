# EL-Polo-Loco

     <div class="top-button-bar ">
                <div class="mute-icon-div">
                    <img src="img/icons/mute.ico" class="mute-button button-universal" alt="mute-button">
                </div>
                <div class="full-screen-div">
                    <img src="img/icons/fullscreen.ico" onclick="toggleFullScreen()" class="full-screen-button button-universal" alt="full-screen">
                </div>


            </div>
//////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

 toggleFullScreen() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            // Enter fullscreen mode
            if (this.canvas.requestFullscreen) {
                this.canvas.requestFullscreen();
            } else if (this.canvas.msRequestFullscreen) {
                this.canvas.msRequestFullscreen();
            } else if (this.canvas.mozRequestFullScreen) {
                this.canvas.mozRequestFullScreen();
            } else if (this.canvas.webkitRequestFullscreen) {
                this.canvas.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            // Exit fullscreen mode
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }


//////////////////////////////////////////////////////

       // Bind fullscreen toggle to button click
        const btn = document.querySelector('.full-screen-button');
        btn.addEventListener('click', this.toggleFullScreen.bind(this));

//////////////////////////////////////////////////////////////

# EL-Polo-Loco

     <div class="top-button-bar ">
                <div class="mute-icon-div">
                    <img src="img/icons/mute.ico" class="mute-button button-universal" alt="mute-button">
                </div>
                <div class="full-screen-div">
                    <img src="img/icons/fullscreen.ico" onclick="toggleFullScreen()" class="full-screen-button button-universal" alt="full-screen">
                </div>


            </div>




            ///////////////////////////////////////////////////////////////////

 toggleFullScreen() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            // Enter fullscreen mode
            if (this.canvas.requestFullscreen) {
                this.canvas.requestFullscreen();
            } else if (this.canvas.msRequestFullscreen) {
                this.canvas.msRequestFullscreen();
            } else if (this.canvas.mozRequestFullScreen) {
                this.canvas.mozRequestFullScreen();
            } else if (this.canvas.webkitRequestFullscreen) {
                this.canvas.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            // Exit fullscreen mode
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }


//////////////////////////////////////////////////////

       // Bind fullscreen toggle to button click
        const btn = document.querySelector('.full-screen-button');
        btn.addEventListener('click', this.toggleFullScreen.bind(this));

//////////////////////////////////////////////////////////////



class Chicken extends MovableObject {
    y = 370;
    height = 50;
    width = 40;
    offset = {
        right: 5,
        left: 5,
        top: 0,
        bottom: 0
    }
    isAlive = true;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_CHICKEN_HIT = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'

    ];

    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGES_CHICKEN_HIT);
        this.x = 300 + Math.random() * 2200;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }
    animate() {
        setInterval(() => {
            if (this.isAlive) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isAlive) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100 / 60);
    }

    dieChickenAnimation() {
        this.isAlive = false;
        this.speed = 0; // Stop the chicken from moving
        this.img = this.imageCache[this.IMAGES_CHICKEN_HIT[0]]; // Directly set the image to the dead chicken
    }

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
original function 6.3.2024
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        chicken dead animation
        bottle throw animation, bottle splash animation
        endboss chicken animation when is coming, when is hurt and when is dead
        sound for coins, bottle, bottle throw, bottle broken, small chicken hit with bottle sound, 
        big boss sound, big boss hit and big boss dead sound, 
        pepe hurt sound, pepe jump sound
        background sound, turn off background sound
        game over screen, game start screen ,controls map during the game
        short story


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

        chicken dead animation
        bottle throw animation, bottle splash animation
        endboss chicken animation when is coming, when is hurt and when is dead
        sound for coins, bottle, bottle throw, bottle broken, small chicken hit with bottle sound, 
        big boss sound, big boss hit and big boss dead sound, 
        pepe hurt sound, pepe jump sound
        background sound, turn off background sound
        game over screen, game start screen ,controls map during the game
        short story