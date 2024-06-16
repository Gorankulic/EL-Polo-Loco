class Chicken extends MovableObject {
    y = 335;
    height = 80;
    width = 70;
    offset = {
        right: 5,
        left: 5,
        top: 0,
        bottom: 0
    }
    ELIMINATED_BROWN_CHICKEN_IMAGES_WIDTH = 50;
    ELIMINATED_BROWN_CHICKEN_IMAGES_HEIGHT = 40;
    characterEnemyCollision = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    ELIMINATED_CHICKEN_IMAGES = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'

    ];

    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.ELIMINATED_CHICKEN_IMAGES);
        this.x = 800 + Math.random() * 2200;
        this.speed = 0.15 + Math.random() * 0.25;

    }
    animate() {
        setInterval(() => {
            this.moveLeft();
            console.log(`BrownChicken at x: ${this.x}`);
        }, 1000 / 1200);

        setInterval(() => {
            // Wenn eine Kollision mit dem Charakter stattgefunden hat
            if (this.characterEnemyCollision == true) {
                // Warte 2 Sekunden, dann spiele die Eliminierungsanimation
                this.playAnimation(this.ELIMINATED_CHICKEN_IMAGES);
            } else {
                // Ansonsten spiele die Laufanimation
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 20);
    }
    isCharacterColliding() {
        return this.characterEnemyCollision;
    }
}