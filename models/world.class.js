/**
 * The main World class representing the game environment, player character, enemies, and other entities.
 */
class World {
    gameSounds = new GameSound(); // Handles all game sound effects and background music
    world2 = new World2(); // Secondary world instance for managing game logic
    bottleCount = 0; // Number of bottles collected by the character
    camera_x = 0; // Horizontal position of the camera view
    canvas; // Canvas element where the game is rendered
    character = new Character(this.gameSounds); // Main character instance with sounds
    characterIsDead = false; // True if the main character has no remaining health
    coinBar = new CoinBar(); // Status bar for collected coins
    ctx; // Rendering context for the canvas
    endBossAttacking = false; // Indicates if the end boss is attacking
    endBossGotHit = false; // Tracks if the end boss has been hit recently
    endBossIsEliminated = false; // True if the end boss is defeated
    endBossMovesLeft = false; // Indicates if the end boss is moving to the left
    endboss = new Endboss(this); // End boss character instance
    endbossHealthBar = new EndBossHealthBar(); // Health bar for the end boss
    endGameYouLoose = new endGameLooseScreenPicture(); // Display when player loses
    endGameYouWon = new endGameUserWonGameScreenPicture(); // Display when player wins
    gameOver = false; // True if the game has ended
    gameSoundActive = true; // Controls the active state of game sounds
    keyboard; // Stores the current state of keyboard inputs
    level = level1; // Current game level being played
    pauseSmallChickenSound = false; // Controls whether the small chicken sound is paused
    statusBar = new StatusBar(); // Status bar for character health or energy
    statusBarForBottle = new BottleBar(); // Status bar for bottle items
    stopAllAnimations = false; // Controls whether animations should be stopped
    throwableObjects = []; // Array of throwable objects (like bottles) currently in play

    /**
     * Initializes the World instance with specified canvas and keyboard, sets up event listeners, and starts the game loop.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
     * @param {Object} keyboard - Object representing the current state of keyboard input.
     */
    constructor(canvas, keyboard) {
        this.canvas = canvas; // Store the canvas element reference
        this.ctx = canvas.getContext('2d'); // Get 2D rendering context for the canvas
        this.keyboard = keyboard; // Store the keyboard input state
        this.throwCooldown = false; // Initialize throw cooldown to prevent rapid throwing
        const savedSoundState = localStorage.getItem('gameSoundActive');
        this.gameSoundActive = savedSoundState === null ? true : savedSoundState === 'true';
        this.gameSounds.toggleAllSounds(this.gameSoundActive); // Apply the saved sound state
        this.updateMuteIcon(); // Update the mute/unmute icon
        this.world2 = new World2(this); // Initialize World2 with a placeholder
        this.collisions = new Collisions(this, this.world2); // Properly initialize Collisions
        this.resetGameRules = new ResetGameRules(this); // Initialize ResetGameRules
        this.world2.collisions = this.collisions; // Assign collisions back to World2
        this.configureWorldForCharacter(); // Link the character to the world instance
        this.draw(); // Start the initial drawing and game loop
        this.world2.run(); // Begin game logic processes managed by World2
        const btn = document.querySelector('.full-screen-button'); // Select fullscreen button
        btn.addEventListener('click', this.toggleFullScreen.bind(this)); // Toggle fullscreen on button click
        const muteButton = document.getElementById('muteIcon'); // Select mute icon
        const unmuteButton = document.getElementById('unmuteIcon'); // Select unmute icon
        muteButton.addEventListener('click', () => this.toggle_mute_sound()); // Mute sound on click
        unmuteButton.addEventListener('click', () => this.toggle_mute_sound()); // Unmute sound on click
        window.addEventListener('orientationchange', this.checkOrientation.bind(this)); // Adjust for screen rotation
        this.checkOrientation(); // Initial orientation check to set warnings if needed
    }

    /**
     * Configures the character to have access to the world instance.
     */
    configureWorldForCharacter() {
        this.character.world = this;
    }

    /**
     * Toggles the mute state of game sounds, updates the mute icon, and saves the state to local storage.
     */
    toggle_mute_sound() {
        this.gameSoundActive = !this.gameSoundActive;
        this.gameSounds.toggleAllSounds(this.gameSoundActive);
        this.updateMuteIcon();

        // Save the current sound state to local storage
        localStorage.setItem('gameSoundActive', this.gameSoundActive);
    }

    /**
     * Updates the mute/unmute icon based on the current sound state.
     */
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

    /**
  * Plays the sound effect for the character getting hurt.
  */
    playPepeHurtSound() {
        this.gameSounds.playPepeHurtSound();
    }

    /**
     * Plays the sound effect for collecting a coin.
     */
    playCoinCollectedSound() {
        this.gameSounds.playCoinCollectedSound();
    }

    /**
     * Plays the sound effect for throwing an object.
     */
    playThrowSound() {
        this.gameSounds.playThrowSound();
    }

    /**
     * Plays the sound effect for hitting a chicken enemy.
     */
    playChickenHitSound() {
        this.gameSounds.playChickenHitSound();
    }

    /**
     * Plays the sound effect when the End Boss is approaching.
     */
    playEndBossComingSound() {
        this.gameSounds.playEndBossComingSound();
    }

    /**
     * Plays the sound effect for a bottle colliding with a chicken.
     */
    playBottleChickenCollisionSound() {
        this.gameSounds.playBottleChickenCollisionSound();
    }

    /**
     * Plays the sound effect for a bottle hitting the ground.
     */
    playBottleGroundCollisionSound() {
        this.gameSounds.playBottleGroundCollisionSound();
    }

    /**
     * Plays the sound effect for collecting a bottle.
     */
    playBottleCollectedSound() {
        this.gameSounds.playBottleCollectedSound();
    }

    /**
     * Pauses all game sounds.
     */
    pauseAllSounds() {
        this.gameSounds.pauseAllSounds();
    }

    /**
     * Plays all game sounds.
     */
    playAllSounds() {
        this.gameSounds.playAllSounds();
    }

    /**
     * Monitors device orientation and displays a warning if in portrait mode.
     */
    checkOrientation() {
        setInterval(() => {
            const warning = document.getElementById('orientationWarning');
            if (window.innerWidth < window.innerHeight) {
                warning.style.display = 'flex';
            } else {
                warning.style.display = 'none';
            }
        }, 1000 / 60);
    }

    /**
     * Triggers the splash animation for the bottle when colliding with the end boss.
     * @param {Object} bottle - The bottle object involved in the collision.
     */
    triggerEndbossSplash(bottle) {
        bottle.triggerSplash();
    }

    /**
     * Primary game rendering loop, responsible for drawing game elements and handling state transitions.
     */
    draw() {
        this.prepareCanvas();
        this.drawGameElements();
        this.world2.handleGameStateTransitions();
        this.requestNextFrame();
    }

    /**
     * Clears the canvas and translates the camera for rendering.
     */
    prepareCanvas() {
        this.clearCanvas();
        this.translateCamera();
    }

    /**
     * Draws all game elements, including background and game objects, and resets the camera position.
     */
    drawGameElements() {
        this.drawBackgroundObjects();
        this.world2.drawGameObjects();
        this.resetCamera();
    }

    /**
     * Updates the End Boss health bar visibility and state.
     */
    updateEndBossHealthBar() {
        this.handleEndBossHealthBar();
    }

    /**
     * Clears the game canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Translates the camera according to the character's position.
     */
    translateCamera() {
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Resets the camera to its original position.
     */
    resetCamera() {
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws background elements such as clouds and other scenery.
     */
    drawBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Checks if the game is currently in progress.
     * @returns {boolean} True if game is ongoing, false otherwise.
     */
    isGameInProgress() {
        return !this.endBossIsEliminated && this.character.energy > 0;
    }

    /**
     * Draws various status bars for character health, bottles, and coins.
     */
    drawStatusBars() {
        this.statusBar.draw(this.ctx);
        this.statusBarForBottle.draw(this.ctx);
        this.coinBar.draw(this.ctx);
    }

    /**
     * Displays the health bar for the end boss if it is in range.
     */
    handleEndBossHealthBar() {
        if (this.character.x > 4000) {
            this.playEndBossComingSound();
            this.endbossHealthBar.show();
        }
        if (this.endbossHealthBar.visible) {
            this.endbossHealthBar.draw(this.ctx);
        }
    }

    /**
     * Hides the end boss health bar.
     */
    hideEndBossHealthBar() {
        this.endbossHealthBar.hide();
    }

    /**
     * Checks if the character has died.
     * @returns {boolean} True if character's energy is zero, false otherwise.
     */
    isCharacterDead() {
        return this.character.energy === 0;
    }

    /**
     * Checks if the end boss has been eliminated.
     * @returns {boolean} True if end boss is eliminated, false otherwise.
     */
    isEndBossEliminated() {
        return this.endBossIsEliminated;
    }

    /**
     * Resets the game state to its initial values after the game ends.
     */
    endGameRoutine() {
        // Clear all intervals and sounds
        this.world2.clearAllIntervals();
        this.pauseAllSounds();
    }

    /**
     * Handles game over state, stopping animations and playing game over sounds.
     */
    handleGameOver() {
        this.world2.disableCharacterActions();
        this.world2.stopAllGameSounds();
        this.displayGameOverScreen();
        this.world2.stopCharacterAndEnemies();
        this.world2.resetCharacterBottleCount();
        this.scheduleEndGameRoutine();
    }

    /**
     * Displays the game over screen.
     */
    displayGameOverScreen() {
        this.endGameYouLoose.draw(this.ctx);
    }

    /**
     * Schedules the end game routine and resets game changes after a delay.
     */
    scheduleEndGameRoutine() {
        setTimeout(() => {
            this.endGameRoutine();
            this.resetGameRules.resetGameChanges();
        }, 4000); // Delay in milliseconds
    }

    /**
       * Displays the victory screen.
       */
    displayVictoryScreen() {
        this.endGameYouWon.draw(this.ctx);
    }
    /**
     * Requests the next frame to be drawn.
     */
    requestNextFrame() {
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Adds multiple objects to the map.
     * @param {Array} objects - Array of objects to be added.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single movable object to the map.
     * @param {Object} mo - The movable object to add.
     */
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

    /**
     * Flips an image horizontally.
     * @param {Object} mo - The object with an image to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x *= -1;
    }

    /**
     * Reverts the flip on an image.
     * @param {Object} mo - The object with an image to be flipped back.
     */
    flipImageBack(mo) {
        mo.x *= -1;
        this.ctx.restore();
    }

    /**
     * Toggles fullscreen mode for the game.
     */
    toggleFullScreen() {
        const gameDiv = document.querySelector('.game-div');
        if (!document.fullscreenElement) {
            this.world2.requestFullScreen(gameDiv);
        } else {
            this.world2.exitFullScreen();
        }
    }

    /**
     * Clears all intervals associated with throwable objects.
     */
    clearAllBottleObjects() {
        if (this.throwableObjects.length > 0) {
            this.throwableObjects.forEach(bottle => {
                bottle.clearAllBottleIntervals();
            });
            this.throwableObjects = [];
        }
    }


}