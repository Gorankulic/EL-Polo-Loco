class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarForBottle = new BottleBar();
    coinBar = new CoinBar();
    throwableObjects = [];
    characterEnemyCollision = false; //this is the boolean that if is true trigger death chicken animation, now is false

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

        // Bind fullscreen toggle to button click
        const btn = document.querySelector('.full-screen-button');
        btn.addEventListener('click', this.toggleFullScreen.bind(this));

    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            // Additional logic to handle throwable objects, etc.
            this.checkThrowableObjects();

            // Check character's position and trigger Endboss movement
            if (this.character.x > 1500) {
                this.level.endBoss.endBossMovesLeft = true; // Assuming endBoss is accessible via this.level
            }

        }, 1000 / 60);
    }


    checkThrowableObjects() {
            if (this.keyboard.D && this.character.bottleCount > 0) {
                for (let i = 0; i < this.character.bottleCount; i++) {
                    let xOffset = this.character.lastDirection === 'right' ? 100 : 0; // Choose the right offset based on direction
                    let bottle = new ThrowableObject(this.character.x + xOffset, this.character.y + 100, this.character.lastDirection);
                    this.throwableObjects.push(bottle);
                }

                this.character.bottleCount -= 25;

                if (this.character.bottleCount < 0) {
                    this.character.bottleCount = 0;
                }

                this.statusBarForBottle.setPercentageForBottle(this.character.bottleCount);
            }
        }
        // Innerhalb der World-Klasse
        // First, mark chickens for removal without immediately removing them.
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround()) {
                    this.character.secondJump();
                    if (!enemy.characterEnemyCollision) {
                        enemy.characterEnemyCollision = true; // Trigger death animation
                        enemy.stopMovementX();
                        // Schedule the removal of the enemy after the animation
                        setTimeout(() => {
                            // Ensure the enemy wasn't already removed
                            if (this.level.enemies.includes(enemy)) {
                                // Find current index of the enemy to remove
                                const currentIndex = this.level.enemies.indexOf(enemy);
                                if (currentIndex !== -1) {
                                    this.level.enemies.splice(currentIndex, 1);
                                    console.log('splice');
                                }
                            }
                        }, 500); // Wait for 1 second (500 milliseconds)
                    }
                    if (this.character.energy < 100) {
                        this.character.energy += 10;
                        this.statusBar.setPercentage(this.character.energy);
                    }
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }




    checkCoinCollisions() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.coinCount += 25;
                const coinIndex = this.level.coins.indexOf(coin);
                this.level.coins.splice(coinIndex, 1);
                this.coinBar.setPercentageForCoins(this.character.coinCount);
            }
        });
    }
    checkBottleCollisions() {
        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.character.bottleCount < 100) {
                this.character.bottleCount += 25;
                if (this.character.bottleCount > 100) {
                    this.character.bottleCount = 100;
                }
                const bottleIndex = this.level.bottle.indexOf(bottle);
                if (bottleIndex !== -1) {
                    this.level.bottle.splice(bottleIndex, 1);
                }
                this.statusBarForBottle.setPercentageForBottle(this.character.bottleCount);
            }
        });
    }
    checkBottleChickenCollision() {
        for (let i = 0; i < this.throwableObjects.length; i++) {
            const bottle = this.throwableObjects[i];
            for (let j = 0; j < this.level.enemies.length; j++) {
                const chicken = this.level.enemies[j];
                // Calculate if there's a collision based on the positions and sizes of the bottle and chicken
                const xCollision = bottle.x + bottle.width >= chicken.x && bottle.x <= chicken.x + chicken.width;
                const yCollision = bottle.y + bottle.height >= chicken.y && bottle.y <= chicken.y + chicken.height;
                if (xCollision && yCollision) {
                    setTimeout(() => {
                        this.throwableObjects.splice(i, 1);

                        i--;
                    }, 1000 / 60);
                    if (!chicken.characterEnemyCollision) {
                        chicken.characterEnemyCollision = true;
                        chicken.stopMovementX();
                        setTimeout(() => {
                            const currentChickenIndex = this.level.enemies.indexOf(chicken);
                            if (currentChickenIndex !== -1) {
                                this.level.enemies.splice(currentChickenIndex, 1);
                            }
                            chicken.characterEnemyCollision = false;
                        }, 1000 / 60);
                    }
                }
            }
        }
    }

    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCoinCollisions();
        this.checkBottleCollisions();
        this.checkBottleChickenCollision();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Translate once for drawing objects relative to the camera
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);

        // Translate back to original position
        this.ctx.translate(-this.camera_x, 0);

        // Drawing the bars after all other objects to ensure they appear in front
        this.statusBar.draw(this.ctx);
        this.statusBarForBottle.draw(this.ctx);
        this.coinBar.draw(this.ctx);

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


    toggleFullScreen() {
        let gameDiv = document.querySelector('.game-div'); // Changed from getElementById to querySelector

        if (!document.fullscreenElement) {
            // Enter fullscreen
            if (gameDiv.requestFullscreen) {
                gameDiv.requestFullscreen();
            } else if (gameDiv.mozRequestFullScreen) { /* Firefox */
                gameDiv.mozRequestFullScreen();
            } else if (gameDiv.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                gameDiv.webkitRequestFullscreen();
            } else if (gameDiv.msRequestFullscreen) { /* IE/Edge */
                gameDiv.msRequestFullscreen();
            }
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        }
    }

}