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
        // Minimum x value for spawning
        let minX = 800;
        // Maximum x value for spawning
        let maxX = 2500;
        // Minimum distance between chickens
        let minDistance = 100;

        let newX;
        // Generate a new x position until it meets the minimum distance requirement
        do {
            newX = minX + Math.random() * (maxX - minX);
        } while (Math.abs(newX - SmallChickens.lastX) < minDistance);

        // Update the last SmallChickens's position
        SmallChickens.lastX = newX;
        return newX;
    }

    animate() {
        setInterval(() => {
            if (!world.stopAllAnimations) {
                this.moveLeft();
            }
        }, 1000 / 60);
        this.stopAnimationsForChicken();

    }
    isCharacterColliding() {
        return this.characterEnemyCollision;
    }
    stopAnimationsForChicken() {
        setInterval(() => {
            if (!world.stopAllAnimations) {
                // Wenn eine Kollision mit dem Charakter stattgefunden hat
                if (this.characterEnemyCollision == true) {
                    // Warte 2 Sekunden, dann spiele die Eliminierungsanimation
                    this.playAnimation(this.ELIMINATED_CHICKEN_IMAGES);
                } else {
                    // Ansonsten spiele die Laufanimation
                    this.playAnimation(this.RUNNING_IMAGES_FOR_SMALL_CHICKEN);
                }
            }
        }, 1000 / 20);
    }
}