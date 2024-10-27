class SmallChickens extends MovableObject {
    y = 355;
    height = 60;
    width = 50;
    offset = {
        right: 5,
        left: 5,
        top: 0,
        bottom: 0
    }
    gameSounds = new GameSound(); // Create GameSound instance here

    ELIMINATED_CHICKEN_WIDTH = 50;
    ELIMINATED_CHICKEN_HEIGHT = 40;
    characterEnemyCollision = false;

    RUNNING_IMAGES_FOR_SMALL_CHICKEN = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    ELIMINATED_CHICKEN_IMAGES = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
            super();
            this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
            this.loadImages(this.RUNNING_IMAGES_FOR_SMALL_CHICKEN);
            this.loadImages(this.ELIMINATED_CHICKEN_IMAGES);
            this.x = this.getSpawnX();
            // Set a random speed for the SmallChickens
            this.speed = 0.15 + Math.random() * 0.25;
            // Start the animation for the SmallChickens
        }
        // Method to calculate the spawn x position with minimum distance from the last SmallChickens
    getSpawnX() {
        let minX = 800;
        let maxX = 4500;
        let minDistance = 300;
        let newX;
        do {
            newX = minX + Math.random() * (maxX - minX);
        } while (Math.abs(newX - SmallChickens.lastX) < minDistance);
        SmallChickens.lastX = newX;
        return newX;
    }

    animate() {
        setInterval(() => {
            if (!world.stopAllAnimations) {
                this.moveLeft();
                if (!world.pauseSmallChickenSound) { // Check global pause flag
                    world.gameSounds.playSmallChickenWalkSound();
                }
            }
        }, 1000 / 80);
        this.stopAnimationsForChicken();

    }
    isCharacterColliding() {
        return this.characterEnemyCollision;
    }
    stopAnimationsForChicken() {
        this.animationInterval = setInterval(() => {
            if (!world.stopAllAnimations) {
                if (this.characterEnemyCollision) {
                    this.playAnimation(this.ELIMINATED_CHICKEN_IMAGES);
                } else {
                    this.playAnimation(this.RUNNING_IMAGES_FOR_SMALL_CHICKEN);
                }
            }
        }, 1000 / 20);
    }

    clearAllIntervals() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
        }
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }
}