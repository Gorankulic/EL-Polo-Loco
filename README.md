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



        chicken dead animation done////////////
        bottle throw animation, bottle splash animation done//////////////
        endboss chicken animation when is coming, when is hurt and when is dead done /////////////////////

        sound for coins, bottle, bottle throw, bottle broken, small chicken hit with bottle sound, ///////////////
        big boss sound,/////////////////////////////////
         big boss hit //////////////////////////
        pepe hurt sound, pepe jump sound/////////
          background sound, ///////////////
          turn off background sound///
       and big boss dead sound, //
      
        game over screen, ////
        kada je igrica u mobilnoj verziji kada udem u full screen kontrolne tipe se izgube //////
        
        
        game start screen //////////////
        controls map during the game ////////
        short story 
        when game is muted pepe sleeping sound is playing//////////
        game is slowing down when i jump over few chickens and when i toss few tobasco bottles, browser issues, ////

        when 2 chickens get hit at the same time, one is eliminated and another is showing splash animation, how can i set it up so no matter how much of then are hit at the same time they are removed  fixed chickens are now far away from each other '/////////////
dead chicken animation y axis is too high/////////////////////
character after jump eliminating chickens goes too low on y axis//////////////////////
character can jump on endboss and eliminate it///////////////////////////
Die Seite funktioniert auf Desktop Geräten und in der mobilen Ansicht nur im Querformat, ansonsten gibt es im Hochformat eine Anzeige, dass man das Gerät nur im Querformat nutzen kann, z.B. Turn your Device to play./////////////
Die Mobile-Touch-Button sind erst sichtbar, wenn man auf Tablet / Handy Größe ist.////////////////
hit on endboss is too high above his head//////
coins distance too small//////////
Kein Scrollbalken bei kleineren Auflösungen//////////
Geschrieben in camelCase (Richtig: shoppingCart, falsch; Shopping_Cart) für Dateinamen, Variablen und Funktionen
Der erste Buchstabe von Funktionen / Variablen ist klein geschrieben//////////////////////
Die Schriftart ist angepasst//////////////////
bottles are deleted too quick///
Durch Anklicken des Links werde ich zu einer Seite weitergeleitet, die alle notwendigen Informationen über den Anbieter und rechtliche Hinweise enthält.
Durch Anklicken des Links werde ich zu einer Seite weitergeleitet, die detaillierte Informationen darüber enthält, wie meine Daten gesammelt, verwendet und geschützt werden.
////////////////////////////////////////////////////////
brown and yellow chickens are removed, two yellow too
button should be hidden when user is in vertical mode
splash animation too quick  mora se rijesiti booleanau treba da se stavi settimeout da duze traje



