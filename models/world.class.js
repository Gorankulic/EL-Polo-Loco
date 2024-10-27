class World {
    gameSounds = new GameSound(); // Create GameSound instance here
    character = new Character(this.gameSounds); // Pass gameSounds to Character
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
    endboss = new Endboss(this);
    endbossHealthBar = new EndBossHealthBar();
    gameOver = false; // Set gameOver to false
    endBossIsEliminated = false;
    stopAllAnimations = false;
    pauseSmallChickenSound = false;
    characterIsDead = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.configureWorldForCharacter();
        this.run();
        this.throwCooldown = false; // Add this line
        this.gameSounds.playAmbientSounds();

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
        this.gameSounds.toggleAllSounds(this.gameSoundActive);
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
    playPepeHurtSound() {
        this.gameSounds.playPepeHurtSound();
    }
    playCoinCollectedSound() {
        this.gameSounds.playCoinCollectedSound();
    }

    playThrowSound() {
        this.gameSounds.playThrowSound();
    }

    playChickenHitSound() {
        this.gameSounds.playChickenHitSound();
    }

    playEndBossComingSound() {
        this.gameSounds.playEndBossComingSound();
    }

    playBottleChickenCollisionSound() {
        this.gameSounds.playBottleChickenCollisionSound();
    }

    playBottleGroundCollisionSound() {
        this.gameSounds.playBottleGroundCollisionSound();
    }
    playBottleCollectedSound() {
        this.gameSounds.playBottleCollectedSound();
    }
    handleVictory() {
        this.stopAllAnimations = true;
        this.endGameYouWon.draw(this.ctx);
        this.stopCharacterAndEnemies();
        this.resetCharacterBottleCount();
        this.gameSounds.playVictorySound();
        this.gameSounds.pauseAmbientSounds();

        setTimeout(() => {
            this.endGameRoutine();
            reloadPage();
        }, 4000);
    }

    pauseAllSounds() {
        this.gameSounds.pauseAllSounds();
    }

    playAllSounds() {
        this.gameSounds.playAllSounds();
    }


    checkOrientation() {
        setInterval(() => {
            const warning = document.getElementById('orientationWarning');

            // Check if the window is in portrait mode
            if (window.innerWidth < window.innerHeight) {
                warning.style.display = 'flex'; // Show warning if in portrait mode
            } else {
                warning.style.display = 'none'; // Hide warning if in landscape mode
            }
        }, 1000 / 60);
    }

    checkThrowableObjects() {
        if (this.keyboard.D && this.character.bottleCount > 0 && !this.character.throwCooldown) {
            this.activateThrowCooldown();
            this.throwBottles();
            this.updateBottleCount();
            this.playThrowSound();
            this.updateBottleStatusBar();
            this.resetThrowCooldownAfterDelay();
        }

    }

    activateThrowCooldown() {
        this.character.throwCooldown = true; // Activate cooldown
    }

    throwBottles() {
        let xOffset = this.character.lastDirection === 'right' ? 100 : 0;
        let bottle = new ThrowableObject(this.character.x + xOffset, this.character.y + 100, this.character.lastDirection);
        this.throwableObjects.push(bottle);
    }


    updateBottleCount() {
        if (this.character.bottleCount > 0) {
            this.character.bottleCount -= 1;
        }
        this.character.bottleCount = Math.min(Math.max(this.character.bottleCount, 0), 5);
    }



    updateBottleStatusBar() {
        let percentage = (this.character.bottleCount / 5) * 100; // Convert bottle count to percentage
        this.statusBarForBottle.setPercentageForBottle(percentage); // Pass the percentage to the BottleBar
    }



    resetThrowCooldownAfterDelay() {
        setTimeout(() => {
            this.character.throwCooldown = false; // Deactivate cooldown
        }, 1000);
    }


    checkEnemyCollisions() {
        this.checkAllSmallChickensEliminated();
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.handleEnemyCollision(enemy);
            }
        });
    }

    handleEnemyCollision(enemy) {
        this.playPepeHurtSound();
        if (enemy instanceof Endboss) {
            this.handleEndbossCollision(enemy);
        } else if (this.character.isAboveGround()) {
            this.handleEnemyStomp(enemy);
        } else {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
            if (this.character.energy <= 0) {
                this.characterIsDead = true;
            }
        }
    }



    handleEndbossCollision(endboss) {
        setTimeout(() => {
            endboss.endBossAttacking = true;
        }, 500);
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    handleEnemyStomp(enemy) {
        this.character.secondJump();

        if (!enemy.characterEnemyCollision) {
            enemy.characterEnemyCollision = true;
            this.playChickenHitSound();
            enemy.stopMovementX();
            this.removeEnemyAfterDelay(enemy, 250);
            if (this.character.energy < 100) {
                this.increaseCharacterEnergy();
            }
            if (this.character.energy == 0) {
                characterIsDead = true;
            }

        }
    }

    removeEnemyAfterDelay(enemy, delay) {
        setTimeout(() => {
            if (this.level.enemies.includes(enemy)) {
                const currentIndex = this.level.enemies.indexOf(enemy);
                if (currentIndex !== -1) {
                    this.level.enemies.splice(currentIndex, 1);
                }
            }
        }, delay);
    }

    increaseCharacterEnergy() {
        this.character.energy = Math.min(this.character.energy + 20, 100); // Ensure energy doesn't exceed 100
        this.statusBar.setPercentage(this.character.energy); // Update the status bar
    }



    checkCoinCollisions() {
        this.level.coins.forEach((coin) => {
            if (this.shouldCollectCoin(coin)) {
                this.collectCoin(coin);
            }
        });
    }

    shouldCollectCoin(coin) {
        return this.character.isColliding(coin) && this.character.coinCount < 100;
    }

    collectCoin(coin) {
        this.playCoinCollectedSound();
        this.incrementCoinCount();
        this.removeCoinFromLevel(coin);
        this.updateCoinStatusBar();
    }



    incrementCoinCount() {
        this.character.coinCount = Math.min(this.character.coinCount + 25, 100);
    }

    removeCoinFromLevel(coin) {
        const coinIndex = this.level.coins.indexOf(coin);
        if (coinIndex !== -1) {
            this.level.coins.splice(coinIndex, 1);
        }
    }

    updateCoinStatusBar() {
        this.coinBar.setPercentageForCoins(this.character.coinCount);
    }

    checkBottleCollisions() {
        this.level.bottle.forEach((bottle) => {
            if (this.shouldCollectBottle(bottle)) {
                this.collectBottle(bottle);
            }
        });
    }

    shouldCollectBottle(bottle) {
        return this.character.isColliding(bottle) && this.character.bottleCount < 5;
    }

    collectBottle(bottle) {
        this.playBottleCollectedSound();
        this.incrementBottleCount(); // Increase the count first
        this.removeBottleFromLevel(bottle);
        this.updateBottleStatusBar(); // Then update the status bar
    }




    incrementBottleCount() {
        this.character.bottleCount = Math.min(this.character.bottleCount + 1, 5);
    }

    removeBottleFromLevel(bottle) {
        const bottleIndex = this.level.bottle.indexOf(bottle);
        if (bottleIndex !== -1) {
            this.level.bottle.splice(bottleIndex, 1);
        }
    }
    updateBottleStatusBar() {
        let percentage = (this.character.bottleCount / 5) * 100; // Convert bottle count to percentage
        this.statusBarForBottle.setPercentageForBottle(percentage); // Update the bottle bar with the percentage
    }


    checkBottleChickenCollision() {
        this.throwableObjects.forEach((bottle, i) => {
            let isRemoved = this.checkBottleEnemyCollision(bottle, i);

            if (!isRemoved) {
                this.checkBottleGroundCollision(bottle, i);
            }
        });
    }

    checkBottleEnemyCollision(bottle, index) {
        let isRemoved = false;

        this.level.enemies.forEach((enemy) => {
            if (this.isCollision(bottle, enemy)) {
                bottle.triggerSplash(); // Trigger splash animation upon collision   
                this.handleChickenBottleCollision(bottle, enemy);
                this.playBottleChickenCollisionSound();

                setTimeout(() => {
                    this.removeThrowableObject(index);
                    isRemoved = true;
                }, 75);
            }
        });

        return isRemoved;
    }

    checkBottleGroundCollision(bottle, index) {
        if (bottle.y >= 379) {
            this.playBottleGroundCollisionSound();
            bottle.triggerSplash(); // Trigger splash animation
            bottle.stopMovementXandY(); // Stops moving the bottle splash animation on both x and y axes

            // Delay the removal to allow the splash animation to play
            setTimeout(() => {
                this.removeThrowableObject(index);
            }, 75); // 2 seconds to allow splash animation to finish
        }
    }

    isCollision(bottle, enemy) {
        const xCollision = bottle.x + bottle.width >= enemy.x && bottle.x <= enemy.x + enemy.width;
        const yCollision = bottle.y + bottle.height >= enemy.y && bottle.y <= enemy.y + enemy.height;
        return xCollision && yCollision;
    }

    handleChickenBottleCollision(bottle, enemy) {
        if (!enemy.characterEnemyCollision) {
            enemy.characterEnemyCollision = true;
            enemy.stopMovementX();
            if (enemy instanceof Endboss) {
                bottle.triggerSplash(); // Trigger splash animation upon collision   

                this.handleEndbossBottleCollision(bottle, enemy); // Pass bottle to the function
            } else {
                this.removeEnemy(enemy);
            }
        }
    }


    handleEndbossBottleCollision(bottle, endboss) {
        this.markEndbossAsHit(endboss);
        this.triggerBottleSplashIfHit(bottle, endboss);

        setTimeout(() => {
            this.processEndbossHitEffects(endboss);
        }, 500);

        this.resetEndbossHitStateAfterDelay(endboss, 750);
    }

    markEndbossAsHit(endboss) {
        endboss.endBossGotHit = true;
    }

    triggerBottleSplashIfHit(bottle, endboss) {
        if (endboss.endBossGotHit) {
            bottle.triggerSplash();
        }
    }

    processEndbossHitEffects(endboss) {
        this.reduceEndbossEnergy(endboss);
        this.updateEndbossHealthBar(endboss);
        this.resetEndbossCollisionState(endboss);
    }

    resetEndbossHitStateAfterDelay(endboss, delay) {
        setTimeout(() => {
            endboss.endBossGotHit = false;
        }, delay);
    }



    // Trigger the splash animation for the bottle
    triggerEndbossSplash(bottle) {
        bottle.triggerSplash();
    }

    // Reduce the endboss's energy when hit
    reduceEndbossEnergy(endboss) {
        endboss.endBossEnergy -= 25;

        // If the endboss's energy is below zero, mark him as eliminated
        if (endboss.endBossEnergy <= 0) {
            this.endBossIsEliminated = true;
            endboss.endBossEnergy = 0; // Prevent negative health
        }
    }

    // Update the endboss's health bar after the hit
    updateEndbossHealthBar(endboss) {
        this.endbossHealthBar.setPercentageForEndBoss(endboss.endBossEnergy);
    }

    // Reset the endboss's collision state after processing the hit
    resetEndbossCollisionState(endboss) {
        endboss.endBossGotHit = false;
        endboss.characterEnemyCollision = false;
    }




    removeEnemy(enemy) {
        setTimeout(() => {
            this.level.enemies = this.level.enemies.filter(e => e !== enemy); // Remove the specific enemy
        }, 500);
    }


    removeThrowableObject(index) {
        const bottle = this.throwableObjects[index];
        if (bottle) {
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
        this.clearCanvas();
        this.translateCamera();
        this.drawBackgroundObjects();
        this.drawGameObjects();
        this.resetCamera();
        if (this.isGameInProgress()) {
            this.drawStatusBars();
            this.handleEndBossHealthBar();
        } else {
            this.hideEndBossHealthBar();
        }
        if (this.isCharacterDead()) {
            this.handleGameOver();
        } else if (this.isEndBossEliminated()) {
            this.handleVictory();
        }
        this.requestNextFrame();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    translateCamera() {
        this.ctx.translate(this.camera_x, 0);
    }

    resetCamera() {
        this.ctx.translate(-this.camera_x, 0);
    }

    drawBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    drawGameObjects() {
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
    }

    isGameInProgress() {
        return !this.endBossIsEliminated && this.character.energy > 0;
    }

    drawStatusBars() {
        this.statusBar.draw(this.ctx); // Character energy
        this.statusBarForBottle.draw(this.ctx); // Bottle status
        this.coinBar.draw(this.ctx); // Coin status

    }


    handleEndBossHealthBar() {
        if (this.character.x > 4000) {
            this.playEndBossComingSound();
            this.endbossHealthBar.show();
        }
        if (this.endbossHealthBar.visible) {
            this.endbossHealthBar.draw(this.ctx);
        }
    }

    hideEndBossHealthBar() {
        this.endbossHealthBar.hide();
    }

    isCharacterDead() {
        return this.character.energy == 0;
    }

    handleGameOver() {
        this.character.characterCanJump = false;
        this.stopAllAnimations = true;
        this.endGameYouLoose.draw(this.ctx);
        this.stopCharacterAndEnemies();
        this.resetCharacterBottleCount();
        this.gameSounds.walking_sound.pause();

        setTimeout(() => {
            this.endGameRoutine();
            reloadPage();
        }, 4000);
    }

    isEndBossEliminated() {
        return this.endBossIsEliminated === true;

    }

    handleVictory() {
        this.stopAllAnimations = true;
        this.endGameYouWon.draw(this.ctx);
        this.stopCharacterAndEnemies();
        this.resetCharacterBottleCount();
        this.gameSounds.walking_sound.pause();

        this.stopAllAnimations = true;
        if (this.gameSoundActive) {
            this.gameSounds.game_won_sound.play();
        }

        setTimeout(() => {
            this.endGameRoutine();
            reloadPage();
        }, 4000);
    }

    stopCharacterAndEnemies() {
        this.character.speed = 0; // Stop character movement
        this.level.enemies.forEach(enemy => enemy.speed = 0); // Stop enemies' movement
    }

    resetCharacterBottleCount() {
        this.character.bottleCount = 0;
    }

    endGameRoutine() {
        this.gameOver = true;
        this.gameSoundActive = false;
        this.pauseAllSounds();
        this.clearAllBottleObjects(); // Clear all thrown bottles
        this.clearAllChickenIntervals(); // Clear chicken intervals
        this.clearCharacterIntervals(); // Clear character intervals
        this.clearAllCloudIntervals(); // Clear cloud intervals
        this.clearEndBossIntervals(); // Clear end boss intervals
        this.clearAllMovableObjectIntervals(); // Clear movable object intervals
        this.clearAllIntervals(); // Clear all global intervals
        this.characterIsDead = false;
    }

    requestNextFrame() {
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
            if (enemy instanceof Endboss && this.character.x > 4000) {
                enemy.endBossMovesLeft = true;
            }
        });
    }

    toggleFullScreen() {
        const gameDiv = document.querySelector('.game-div'); // Select the game container

        if (!document.fullscreenElement) {
            this.requestFullScreen(gameDiv);
        } else {
            this.exitFullScreen();
        }
    }

    requestFullScreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { // Firefox
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Chrome, Safari & Opera
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE/Edge
            element.msRequestFullscreen();
        }
    }

    exitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari & Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }


    clearAllIntervals() {
        const highestIntervalId = setInterval(() => {}, 0); // Get the highest interval ID
        for (let i = 0; i <= highestIntervalId; i++) {
            clearInterval(i); // Clear all intervals from 0 to the highest
        }
    }

    clearAllBottleObjects() {
        if (this.throwableObjects.length > 0) {
            // Iterate through all thrown bottles and clear their intervals
            this.throwableObjects.forEach((bottle) => {
                bottle.clearAllBottleIntervals(); // Clear each bottle's intervals
            });
            this.throwableObjects = []; // Clear the array after clearing intervals
        }
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
        this.endboss.clearAllIntervals();

    }
    clearAllMovableObjectIntervals() {
        if (this.level && this.level.movableObjects && this.level.movableObjects.length > 0) {
            const movableObject = this.level.movableObjects[0]; // Access the first movable object
            if (movableObject.clearAllIntervals) {
                movableObject.clearAllIntervals(); // Clear intervals for the first movable object
            }
        }
    }
    checkAllSmallChickensEliminated() {
        const remainingSmallChickens = this.level.enemies.filter(enemy => enemy instanceof SmallChickens);

        if (remainingSmallChickens.length === 0) {
            this.pauseSmallChickenSound = true; // Set global pause flag
            this.gameSounds.pauseSmallChickensMovingSound(); // Call pause method
        }
    }

}