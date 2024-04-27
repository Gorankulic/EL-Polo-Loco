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
    bottleCount=0;

    throwableObjects = [];
    endBossMovesLeft = false;
    endBossAttacking = false;
    endBossGotHit = false;
    endBoss= new Endboss();
    endbossHealthBar = new EndBossHealthBar();
    pepe_hurt= new Audio('audio/pepe hurt.mp3');
    pepe_throw = new Audio('audio/throw sound.mp3');
    coin_sound= new Audio('audio/coin.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.throwCooldown = false; // Add this line
        this.pepe_hurt.pause();
        this.pepe_throw.pause();
        this.coin_sound.pause();
  

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
            this.checkThrowableObjects();
            this.checkCharacterXPosition();

        }, 1000 / 60);
    }


    checkThrowableObjects() {
        if (this.keyboard.D && this.character.bottleCount > 0) {
            if (!this.character.throwCooldown) { // Check if cooldown is not active
                this.character.throwCooldown = true; // Activate cooldown

                // Existing code for throwing bottles remains unchanged
                for (let i = 0; i < this.character.bottleCount; i++) {
                    let xOffset = this.character.lastDirection === 'right' ? 100 : 0; // Choose the right offset based on direction
                    let bottle = new ThrowableObject(this.character.x + xOffset, this.character.y + 100, this.character.lastDirection);
                    this.throwableObjects.push(bottle);
                }
this.pepe_throw.play();
                this.character.bottleCount -= 20;

                if (this.character.bottleCount < 0) {
                    this.character.bottleCount = 0;
                }
                this.statusBarForBottle.setPercentageForBottle(this.character.bottleCount);
                // Set a timeout to end the cooldown after 500 milliseconds
                setTimeout(() => {
                    this.character.throwCooldown = false; // Deactivate cooldown
                }, 500);
            }
        }
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
            //    this.pepe_hurt.play();
                setTimeout(() => {
                    if (enemy instanceof Endboss) {
                        enemy.endBossAttacking = true;
                    }
                }, 500);
               
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
                                }
                            }
                        }, 1000); // Wait for 1 second (1000 milliseconds)
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
            if (this.character.isColliding(coin) && this.character.coinCount < 100) {
                this.coin_sound.play();
                this.character.coinCount += 25;
                const coinIndex = this.level.coins.indexOf(coin);
               
                    this.level.coins.splice(coinIndex, 1);
                    this.coinBar.setPercentageForCoins(this.character.coinCount);
                
                if (this.character.coinCount == 100) {
                    this.character.coinCount = 100;
                }

            }
        });
    }
    checkBottleCollisions() {
        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.character.bottleCount < 100) {
                this.character.bottleCount += 20;
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
        this.throwableObjects.forEach((bottle, i) => {
            this.level.enemies.forEach((enemy) => {
                if (this.isCollision(bottle, enemy)) {
                    this.handleCollision(bottle, enemy);
                    bottle.triggerSplash(); // Trigger splash animation upon collision
                    this.removeThrowableObject(i);
                }
            });
            if (bottle.y >= 379) { // Check if the bottle hits the ground
                bottle.triggerSplash(); // Trigger splash animation
                this.removeThrowableObject(i);
            }
        });
    }
    
    
    isCollision(bottle, enemy) {
        const xCollision = bottle.x + bottle.width >= enemy.x && bottle.x <= enemy.x + enemy.width;
        const yCollision = bottle.y + bottle.height >= enemy.y && bottle.y <= enemy.y + enemy.height;
        return xCollision && yCollision;
    }
    
    handleCollision(bottle, enemy) {
        if (!enemy.characterEnemyCollision) {
            enemy.characterEnemyCollision = true;
            enemy.stopMovementX();
            if (enemy instanceof Endboss) {
                this.handleEndbossBottleCollision(enemy);
            } else {
                this.removeEnemy(enemy);
            }
        }
    }
    
    handleEndbossBottleCollision(endboss) {
        endboss.endBossGotHit = true;
        setTimeout(() => {
            endboss.endBossEnergy -= 25;
            this.endbossHealthBar.setPercentageForEndBoss(endboss.endBossEnergy);
            endboss.endBossGotHit = false;
            endboss.characterEnemyCollision = false;
        }, 500);
    }
    
    removeEnemy(enemy) {
        const currentIndex = this.level.enemies.indexOf(enemy);
        if (currentIndex !== -1) {
            setTimeout(() => {
                this.level.enemies.splice(currentIndex, 1);
            }, 500);
        }
    }
    
    removeThrowableObject(index) {
        setTimeout(() => {
            this.throwableObjects.splice(index, 1);
        }, 1000 / 60);
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
        // Manage the visibility of the EndBossHealthBar
        if (this.character.x > 1500) {
            this.endbossHealthBar.show();
        }

        // Draw the EndBossHealthBar if it's visible
        if (this.endbossHealthBar.visible) {
            this.endbossHealthBar.draw(this.ctx);
        }



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
    checkCharacterXPosition() {
        // Assuming Endboss is part of the enemies array
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss && this.character.x > 1500) {
                enemy.endBossMovesLeft = true;
            }
        });
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