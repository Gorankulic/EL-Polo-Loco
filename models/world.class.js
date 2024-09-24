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
    endGameYouLoose = new endGameLooseScreenPicture();
    endGameYouWon = new endGameUserWonGameScreenPicture();
    bottleCount = 0;


    throwableObjects = [];
    endBossMovesLeft = false;
    endBossAttacking = false;
    endBossGotHit = false;
    gameSoundActive = true;
    endBoss = new Endboss();
    endbossHealthBar = new EndBossHealthBar();
    pepe_hurt = new Audio('audio/pepe hurt.mp3');
    pepe_throw = new Audio('audio/throw sound.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    bottle_collected_sound = new Audio('audio/coin.mp3');
    bottle_splash_sound = new Audio('audio/broken bottle.mp3');
    chicken_hit_sound = new Audio('audio/chicken hit sound.mp3');
    chicken_eliminated_from_player = new Audio('audio/chicken eliminated from player.mp3');
    endboss_hit_sound = new Audio('audio/enboss got hit.mp3');
    small_chickens_move_sound = new Audio('audio/small chickens moving sound.mp3');
    endbboss_coming_sound = new Audio('audio/endboss coming sound.mp3');
    desert_ambient_sound = new Audio('audio/desert ambient sound.mp3');
    background_game_music = new Audio('audio/game music.mp3');
    gameOver = false; // Set gameOver to false
    endBossIsEliminated = false;
    stopAllAnimations = false;





    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.configureWorldForCharacter();
        this.run();
        this.throwCooldown = false; // Add this line
        //  this.small_chickens_move_sound.play();
        this.pepe_hurt.pause();
        this.pepe_throw.pause();
        this.coin_sound.pause();
        this.bottle_collected_sound.pause();
        this.bottle_splash_sound.pause();
        this.chicken_hit_sound.pause();
        this.chicken_eliminated_from_player.pause();
        this.endbboss_coming_sound.pause();
        this.desert_ambient_sound.play();
        this.background_game_music.play();





        // Bind fullscreen toggle to button click
        const btn = document.querySelector('.full-screen-button');
        btn.addEventListener('click', this.toggleFullScreen.bind(this));

        const muteButton = document.getElementById('muteIcon');
        const unmuteButton = document.getElementById('unmuteIcon');

        muteButton.addEventListener('click', () => this.toggle_mute_sound());
        unmuteButton.addEventListener('click', () => this.toggle_mute_sound());


        // Add event listener for orientation change
        window.addEventListener('orientationchange', this.checkOrientation.bind(this));
        // Initial check
        this.checkOrientation();

    }

    configureWorldForCharacter() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
            this.checkCharacterXPosition();

        }, 1000 / 60);
    }
    toggle_mute_sound() {
        this.gameSoundActive = !this.gameSoundActive;

        if (this.gameSoundActive) {
            this.playAllSounds();
        } else {
            this.pauseAllSounds();
        }

        this.updateMuteIcon();
    }

    updateMuteIcon() {
        const muteIcon = document.getElementById('muteIcon');
        const unmuteIcon = document.getElementById('unmuteIcon');

        if (this.gameSoundActive) {
            muteIcon.style.display = 'none';
            unmuteIcon.style.display = 'block';
        } else {
            muteIcon.style.display = 'block';
            unmuteIcon.style.display = 'none';
        }
    }

    playAllSounds() {
        // List all sounds that should play when sounds are active
        //    this.pepe_hurt.play();
        //   this.pepe_throw.play();
        //   this.coin_sound.play();
        //  this.bottle_collected_sound.play();
        //  this.bottle_splash_sound.play();
        //  this.chicken_hit_sound.play();
        //  this.chicken_eliminated_from_player.play();
        //  this.endboss_hit_sound.play();
        //  this.small_chickens_move_sound.play();
        //  this.endbboss_coming_sound.play();
        // Uncomment below lines if background sounds are to be played continuously
        this.desert_ambient_sound.play();
        this.background_game_music.play();
    }

    pauseAllSounds() {
        // List all sounds that should pause when sounds are inactive


        this.coin_sound.pause();
        this.bottle_collected_sound.pause();
        this.bottle_splash_sound.pause();
        this.chicken_hit_sound.pause();
        this.chicken_eliminated_from_player.pause();
        this.endboss_hit_sound.pause();
        this.small_chickens_move_sound.pause();
        this.endbboss_coming_sound.pause();

        this.desert_ambient_sound.pause();
        this.background_game_music.pause();
    }

    checkOrientation() {
        setInterval(() => {
            const warning = document.getElementById('orientationWarning');
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            if (isMobile && window.innerWidth < window.innerHeight) {
                warning.style.display = 'flex';
            } else {
                warning.style.display = 'none';
            }
        }, 1000 / 60);

    }




    checkThrowableObjects() {
        if (this.keyboard.D && this.character.bottleCount > 0) {
            if (!this.character.throwCooldown) {
                this.activateThrowCooldown();
                this.throwBottles();
                this.updateBottleCount();
                this.playThrowSound();
                this.updateBottleStatusBar();
                this.resetThrowCooldownAfterDelay();
            }
        }
    }

    activateThrowCooldown() {
        this.character.throwCooldown = true; // Activate cooldown
    }

    throwBottles() {
        for (let i = 0; i < this.character.bottleCount; i++) {
            let xOffset = this.character.lastDirection === 'right' ? 100 : 0; // Choose the right offset based on direction
            let bottle = new ThrowableObject(this.character.x + xOffset, this.character.y + 100, this.character.lastDirection);
            this.throwableObjects.push(bottle);
        }
    }

    updateBottleCount() {
        this.character.bottleCount -= 20;
        if (this.character.bottleCount < 0) {
            this.character.bottleCount = 0;
        }
        if (this.character.bottleCount > 100) {
            this.character.bottleCount = 100;
        }
    }

    playThrowSound() {
        if (!this.gameSoundActive) {
            this.pepe_throw.pause();
        } else {
            this.pepe_throw.play();
        }
    }

    updateBottleStatusBar() {
        this.statusBarForBottle.setPercentageForBottle(this.character.bottleCount);
    }

    resetThrowCooldownAfterDelay() {
        setTimeout(() => {
            this.character.throwCooldown = false; // Deactivate cooldown
        }, 500);
    }


    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (!this.gameSoundActive) {
                    this.pepe_hurt.pause();
                }
                if (this.gameSoundActive) {
                    this.pepe_hurt.play();
                }

                if (enemy instanceof Endboss) {
                    // Handle Endboss collision differently
                    setTimeout(() => {
                        enemy.endBossAttacking = true;
                    }, 500);
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    return; // Exit early since Endboss collision is handled separately
                }

                if (this.character.isAboveGround()) {
                    this.character.secondJump();
                    if (!enemy.characterEnemyCollision) {
                        enemy.characterEnemyCollision = true; // Trigger death animation
                        if (!this.gameSoundActive) {
                            this.chicken_hit_sound.pause();
                            this.chicken_eliminated_from_player.pause();
                        }
                        if (this.gameSoundActive) {
                            this.chicken_hit_sound.play();
                            this.chicken_eliminated_from_player.play();
                        }

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
                        }, 250); // Wait for 1 second (1000 milliseconds)
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
                if (!this.gameSoundActive) {
                    this.coin_sound.pause();
                }
                if (this.gameSoundActive) {
                    this.coin_sound.play();
                }
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
                if (!this.gameSoundActive) {
                    this.bottle_collected_sound.pause();
                }
                if (this.gameSoundActive) {
                    this.bottle_collected_sound.play();
                }

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
            let isRemoved = false;

            this.level.enemies.forEach((enemy) => {
                if (this.isCollision(bottle, enemy)) {
                    this.handleCollision(bottle, enemy);
                    if (!this.gameSoundActive) {
                        this.chicken_hit_sound.pause();
                        this.bottle_splash_sound.pause();
                    } else {
                        this.chicken_hit_sound.play();
                        this.bottle_splash_sound.play();
                    }
                    bottle.triggerSplash(); // Trigger splash animation upon collision
                    this.removeThrowableObject(i);
                    isRemoved = true; // Mark bottle as removed
                }
            });

            // If the bottle was not removed due to collision, check if it hits the ground
            if (!isRemoved && bottle.y >= 379) {
                if (!this.gameSoundActive) {
                    this.bottle_splash_sound.pause();
                } else {
                    this.bottle_splash_sound.play();
                }
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
            if (endboss.endBossEnergy == 0) {
                this.endBossIsEliminated = true;
            }
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
        const bottle = this.throwableObjects[index];
        if (bottle) {
            bottle.clearAllBottleIntervals(); // Clear all intervals for the specific bottle
            this.throwableObjects.splice(index, 1); // Remove bottle from array
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
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);


        this.addObjectsToMap(this.throwableObjects);

        this.addToMap(this.character);
        // Translate back to original position
        this.ctx.translate(-this.camera_x, 0);

        if (!this.endBossIsEliminated && this.character.energy > 0) {
            this.statusBar.draw(this.ctx); // Health bar is drawn
            this.statusBarForBottle.draw(this.ctx); // Bottle bar is drawn
            this.coinBar.draw(this.ctx); // Coin bar is drawn

            // Manage the visibility of the EndBossHealthBar
            if (this.character.x > 1500) {
                if (!this.gameSoundActive) {
                    this.endbboss_coming_sound.pause();
                }
                if (this.gameSoundActive) {
                    this.endbboss_coming_sound.play();
                }
                this.endbossHealthBar.show();
            }
        } else {
            this.endbossHealthBar.hide(); // End boss health bar is hidden
        }

        // Draw the EndBossHealthBar if it's visible
        if (this.endbossHealthBar.visible) {
            this.endbossHealthBar.draw(this.ctx);
        }

        if (this.character.energy == 0) {
            this.character.characterCanJump = false;
            this.stopAllAnimations = true;
            this.endGameYouLoose.draw(this.ctx);
            this.character.speed = 0; // Stop character movement
            this.level.enemies.forEach(enemy => enemy.speed = 0); // Stop enemies' movement

            this.character.bottleCount = 0;


            setTimeout(() => {
                this.gameOver = true;
                this.gameSoundActive = false;
                this.pauseAllSounds();
                this.clearAllBottleObjects(); // Clear all thrown bottles
                this.clearAllChickenIntervals();
                this.clearCharacterIntervals(); // Clear character intervals
                this.clearAllCloudIntervals(); // Clear all cloud intervals
                this.clearEndBossIntervals(); // Clear end boss intervals
                this.clearAllMovableObjectIntervals(); // Clear movable object intervals




                this.clearAllIntervals();
                reloadPage();

            }, 4000);
        }


        if (this.endBossIsEliminated == true) { // Check the actual endBoss's energy
            this.stopAllAnimations = true;
            this.endGameYouWon.draw(this.ctx);
            this.character.speed = 0; // Stop character movement
            this.level.enemies.forEach(enemy => enemy.speed = 0); // Stop enemies' movement

            this.character.bottleCount = 0;


            setTimeout(() => {
                this.gameOver = true;
                this.gameSoundActive = false;
                this.pauseAllSounds();
                this.clearAllBottleObjects(); // Clear all thrown bottles
                this.clearAllChickenIntervals();
                this.clearCharacterIntervals(); // Clear character intervals
                this.clearAllCloudIntervals(); // Clear all cloud intervals
                this.clearEndBossIntervals(); // Clear end boss intervals
                this.clearAllMovableObjectIntervals(); // Clear movable object intervals




                this.clearAllIntervals();
                reloadPage();
            }, 4000);
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


            //   setTimeout(() => {
            //     this.small_chickens_move_sound.play();
            // }, 30000); remove 
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

    clearAllIntervals() {
        const highestIntervalId = setInterval(() => {}, 0); // Get the highest interval ID
        for (let i = 0; i <= highestIntervalId; i++) {
            clearInterval(i); // Clear all intervals from 0 to the highest
        }
    }

    clearAllBottleObjects() {
        // Iterate through all thrown bottles and clear their intervals
        this.throwableObjects.forEach((bottle) => {
            bottle.clearAllBottleIntervals();
        });
        this.throwableObjects = []; // Clear the array after clearing intervals
    }

    clearAllChickenIntervals() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof SmallChickens || enemy instanceof Chicken) {
                enemy.clearAllIntervals(); // Clear all intervals for each type of chicken
            }
        });
    }
    clearCharacterIntervals() {
        this.character.clearAllIntervals(); // Clear intervals for the character

    }
    clearAllCloudIntervals() {
        this.level.clouds.forEach(cloud => {
            cloud.clearAllIntervals(); // Clear intervals for each cloud
        });
    }
    clearEndBossIntervals() {
        this.endBoss.clearAllIntervals(); // Clear intervals for the end boss
    }
    clearAllMovableObjectIntervals() {
        if (this.level && this.level.movableObjects && this.level.movableObjects.length > 0) {
            const movableObject = this.level.movableObjects[0]; // Access the first movable object
            if (movableObject.clearAllIntervals) {
                movableObject.clearAllIntervals(); // Clear intervals for the first movable object
            }
        }
    }



}