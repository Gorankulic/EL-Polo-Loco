class World {
    gameSounds = new GameSound(); // Create GameSound instance here
    character = new Character(this.gameSounds); // Pass gameSounds to Character
    world2 = new World2();
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
        this.world2 = new World2(this); // Pass the current world instance
        this.draw();
        this.configureWorldForCharacter();
        this.world2.run(); // Call run from World2 instance
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

    // Trigger the splash animation for the bottle
    triggerEndbossSplash(bottle) {
        bottle.triggerSplash();
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

    toggleFullScreen() {
        const gameDiv = document.querySelector('.game-div'); // Select the game container

        if (!document.fullscreenElement) {
            this.world2.requestFullScreen(gameDiv);
        } else {
            this.world2.exitFullScreen();
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