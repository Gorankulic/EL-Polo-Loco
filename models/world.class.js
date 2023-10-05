class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];




    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

    }
    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
        }, 200);
    }
    checkThrowableObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        // Loop through all the enemies in the level
        this.level.enemies.forEach((enemy) => {
            // Check if the character is colliding with an enemy
            if (this.character.isColliding(enemy)) {
                // If a collision with an enemy occurs, the character gets hit
                this.character.hit();
                // Update the status bar to reflect the character's energy after being hit
                this.statusBar.setPercentage(this.character.energy);
            } else {
                // If the character is not colliding with an enemy, check for collisions with coins
                this.level.coins.forEach((coin) => {
                    // Check if the character is colliding with a coin and their energy is less than 100
                    if (this.character.isColliding(coin) && this.character.energy < 100) {
                        // Increase the character's energy by 10
                        this.character.energy += 10;
                        // Ensure the character's energy doesn't exceed 100
                        if (this.character.energy > 100) {
                            this.character.energy = 100;
                        }
                        // Update the status bar to reflect the character's new energy
                        this.statusBar.setPercentage(this.character.energy);
                        // Remove the collided coin from the level's coins array
                        const coinIndex = this.level.coins.indexOf(coin);
                        if (coinIndex !== -1) {
                            this.level.coins.splice(coinIndex, 1);
                        }
                    }
                });
            }
        });
    }



    draw() { //this function draws elements from the game
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0); //status bar rolls back, space for fixed objects
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0); //status bar rolls forward
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;

        requestAnimationFrame(function() {
            self.draw();
        });

    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}