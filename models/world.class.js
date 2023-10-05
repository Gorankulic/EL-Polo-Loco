class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarForBottle = new StatusBar();
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

    // Function to check collisions with enemies and update character's energy
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    // Function to check collisions with coins and update character's energy
    checkCoinCollisions() {
            this.level.coins.forEach((coin) => {
                if (this.character.isColliding(coin) && this.character.energy < 100) {
                    this.character.energy += 10;
                    if (this.character.energy > 100) {
                        this.character.energy = 100;
                    }
                    this.statusBar.setPercentage(this.character.energy);
                    const coinIndex = this.level.coins.indexOf(coin);
                    if (coinIndex !== -1) {
                        this.level.coins.splice(coinIndex, 1);
                    }
                }
            });
        }
        // Function to check collisions with bottles and update character's energy and bottle count
    checkBottleCollisions() {
        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.character.energy < 100) {
                this.character.energy += 25; // Increase energy by 25 for bottles
                if (this.character.energy > 100) {
                    this.character.energy = 100;
                }
                this.statusBar.setPercentage(this.character.energy);
                const bottleIndex = this.level.bottle.indexOf(bottle);
                if (bottleIndex !== -1) {
                    this.level.bottle.splice(bottleIndex, 1);
                    this.character.collectBottle(); // Call collectBottle to increment bottle count
                }
            }
        });
    }

    // Function to perform collision checks
    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCoinCollisions();
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
        this.addObjectsToMap(this.level.bottle);
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