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

        // Load saved sound state or default to true
        const savedSoundState = localStorage.getItem('gameSoundActive');
        this.gameSoundActive = savedSoundState === null ? true : savedSoundState === 'true';

        this.gameSounds.toggleAllSounds(this.gameSoundActive); // Apply the saved sound state
        this.updateMuteIcon(); // Update the mute/unmute icon

        this.world2 = new World2(this); // Instantiate World2 and pass the current world instance
        this.configureWorldForCharacter(); // Link the character to the world instance
        this.draw(); // Start the initial drawing and game loop
        this.world2.run(); // Begin game logic processes managed by World2

        // Bind fullscreen toggle to button click
        const btn = document.querySelector('.full-screen-button'); // Select fullscreen button
        btn.addEventListener('click', this.toggleFullScreen.bind(this)); // Toggle fullscreen on button click

        // Select mute/unmute buttons and bind sound toggle event
        const muteButton = document.getElementById('muteIcon'); // Select mute icon
        const unmuteButton = document.getElementById('unmuteIcon'); // Select unmute icon
        muteButton.addEventListener('click', () => this.toggle_mute_sound()); // Mute sound on click
        unmuteButton.addEventListener('click', () => this.toggle_mute_sound()); // Unmute sound on click

        // Add event listener for orientation change and initial check
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

    // Sound-playing methods for various game events

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
        this.handleGameStateTransitions();
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
        this.drawGameObjects();
        this.resetCamera();
    }

    /**
     * Handles game state transitions like drawing status bars or handling victory/game over conditions.
     */
    handleGameStateTransitions() {
        if (this.isGameInProgress()) {
            this.drawStatusBars();
            this.updateEndBossHealthBar();
        } else {
            this.hideEndBossHealthBar();
        }

        if (this.isCharacterDead()) {
            this.handleGameOver();
        } else if (this.isEndBossEliminated()) {
            this.handleVictory();
        }
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
     * Draws game elements like characters, coins, enemies, and throwable objects.
     */
    drawGameObjects() {
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
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
        this.clearAllIntervals();
        this.pauseAllSounds();
    }

    /**
     * Handles game over state, stopping animations and playing game over sounds.
     */
    handleGameOver() {
        this.disableCharacterActions();
        this.stopAllGameSounds();
        this.displayGameOverScreen();
        this.stopCharacterAndEnemies();
        this.resetCharacterBottleCount();

        this.scheduleEndGameRoutine();
    }

    /**
     * Disables character actions like jumping after the game ends.
     */
    disableCharacterActions() {
        this.character.characterCanJump = false;
        this.stopAllAnimations = true;
    }

    /**
     * Stops all game sounds to signify the end of the game.
     */
    stopAllGameSounds() {
        this.gameSounds.desert_ambient_sound.pause();
        this.gameSounds.background_game_music.pause();
        this.gameSounds.small_chickens_move_sound.pause();
        this.gameSounds.walking_sound.pause();
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
            this.resetGameChanges();
        }, 4000); // Delay in milliseconds
    }

    /**
     * Handles victory conditions, stopping animations and playing victory sounds.
     */
    handleVictory() {
        this.disableCharacterActions();
        this.displayVictoryScreen();
        this.stopCharacterAndEnemies();
        this.resetCharacterBottleCount();
        this.handleVictorySounds();
        this.scheduleVictoryRoutine();
    }

    /**
     * Disables character actions like jumping after achieving victory.
     */
    disableCharacterActions() {
        this.character.characterCanJump = false;
        this.stopAllAnimations = true;
    }

    /**
     * Displays the victory screen.
     */
    displayVictoryScreen() {
        this.endGameYouWon.draw(this.ctx);
    }

    /**
     * Handles all sound-related logic for the victory condition.
     */
    handleVictorySounds() {
        this.gameSounds.walking_sound.pause();
        this.stopAllAnimations = true;

        if (this.gameSoundActive) {
            this.gameSounds.game_won_sound.play();
            this.gameSounds.desert_ambient_sound.pause();
            this.gameSounds.background_game_music.pause();
            this.gameSounds.small_chickens_move_sound.pause();
        }
    }

    /**
     * Schedules the routine to end the game and reset game changes after a delay.
     */
    scheduleVictoryRoutine() {
        setTimeout(() => {
            this.endGameRoutine();
            this.resetGameChanges();
        }, 4000); // Delay in milliseconds
    }
    


    /**
     * Resets the game state to its initial values.
     */
    resetGameChanges() {
        this.resetGlobalFlags();
        this.resetCharacter();
        this.resetGameEntities();
        this.resetStatusBars();
        this.resetBackgroundObjects();
        this.resetCameraPosition();
        this.resetGameSounds();
        this.restartGameLoops();
    }

    /**
     * Resets global game state flags to their default values.
     */
    resetGlobalFlags() {
        this.gameOver = false;
        this.characterIsDead = false;
        this.endBossAttacking = false;
        this.endBossGotHit = false;
        this.endBossIsEliminated = false;
        this.endBossMovesLeft = false;
        this.stopAllAnimations = false;
        this.pauseSmallChickenSound = false;
    }

    /**
     * Resets the character's state and intervals.
     */
    resetCharacter() {
        this.character.clearAllIntervals();
        this.character.reset();
    }

    /**
     * Resets game entities like bottles, coins, enemies, and clouds.
     */
    resetGameEntities() {
        this.resetCollectibleItems();
        this.resetEndBoss();
        this.resetEnemies();
        this.resetClouds();
        this.clearThrowableObjects();
    }

    /**
     * Resets collectible items like bottles and coins.
     */
    resetCollectibleItems() {
        this.resetBottles();
        this.resetCoins();
    }

    /**
     * Resets the End Boss and its health bar.
     */
    resetEndBoss() {
        this.endboss.reset();
        this.endbossHealthBar.setPercentageForEndBoss(100);
    }

    /**
     * Recreates and resets all enemies.
     */
    resetEnemies() {
        this.level.enemies = [
            ...createInstances(Chicken, 5),
            ...createInstances(SmallChickens, 10),
            new Endboss(this)
        ];

        this.level.enemies.forEach(enemy => {
            enemy.clearAllIntervals();
            enemy.reset();
        });
    }

    /**
     * Resets all clouds to their default state.
     */
    resetClouds() {
        this.level.clouds.forEach(cloud => {
            cloud.clearAllIntervals();
            cloud.reset();
        });
    }

    /**
     * Clears all throwable objects from the game.
     */
    clearThrowableObjects() {
        this.clearAllBottleObjects();
    }

    /**
     * Resets all status bars to their default values.
     */
    resetStatusBars() {
        this.statusBar.setPercentage(100);
        this.statusBarForBottle.setPercentageForBottle(0);
        this.coinBar.setPercentageForCoins(0);
    }

    /**
     * Resets the background objects in the level.
     */
    resetBackgroundObjects() {
        const imageWidth = 719;
        const repetitions = Math.ceil(this.level.level_end_x / imageWidth) + 1;
        this.level.backgroundObjects = createBackgroundObjects(imageWidth, repetitions);
    }

    /**
     * Resets the camera position to the starting point.
     */
    resetCameraPosition() {
        this.camera_x = 0;
    }

    /**
     * Resets and restarts game sounds if enabled.
     */
    resetGameSounds() {
        if (this.gameSoundActive) {
            this.gameSounds.desert_ambient_sound.currentTime = 0;
            this.gameSounds.background_game_music.currentTime = 0;
            this.gameSounds.playAmbientSounds();
        }
    }

    /**
     * Restarts the game loops for collision, logic, and rendering.
     */
    restartGameLoops() {
        this.world2.run();
        this.draw();
    }

    resetBottles() {
        // Clear existing bottles

        this.level.bottle = []; // Clear the bottle array

        // Recreate bottles
        this.level.bottle = createInstances(Bottle, 10); // Replace 10 with the number of bottles you want
    }
    resetCoins() {
        this.level.coins = []; // Clear existing coins
        this.level.coins.push(new Coins(), new Coins(), new Coins(), new Coins());
    }

    /**
     * Stops all character and enemy movement.
     */
    stopCharacterAndEnemies() {
        this.character.speed = 0;
        this.level.enemies.forEach(enemy => enemy.speed = 0);
    }

    /**
     * Resets the character's bottle count to zero.
     */
    resetCharacterBottleCount() {
        this.character.bottleCount = 0;
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
     * Clears all running intervals to reset the game.
     */
    clearAllIntervals() {
        const highestIntervalId = setInterval(() => {}, 0);
        for (let i = 0; i <= highestIntervalId; i++) {
            clearInterval(i);
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

    /**
     * Clears intervals associated with all chicken enemies.
     */
    clearAllChickenIntervals() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof SmallChickens || enemy instanceof Chicken) {
                enemy.clearAllIntervals();
            }
        });
    }

    /**
     * Clears all intervals associated with the main character.
     */
    clearCharacterIntervals() {
        this.character.clearAllIntervals();
    }

    /**
     * Clears all intervals associated with cloud objects.
     */
    clearAllCloudIntervals() {
        this.level.clouds.forEach(cloud => {
            cloud.clearAllIntervals();
        });
    }

    /**
     * Clears all intervals associated with the end boss.
     */
    clearEndBossIntervals() {
        this.endboss.clearAllIntervals();
    }

    /**
     * Clears all intervals for movable objects in the level.
     */
    clearAllMovableObjectIntervals() {
        if (this.level && this.level.movableObjects && this.level.movableObjects.length > 0) {
            const movableObject = this.level.movableObjects[0];
            if (movableObject.clearAllIntervals) {
                movableObject.clearAllIntervals();
            }
        }
    }

    /**
     * Checks if all small chickens have been eliminated, and pauses sounds accordingly.
     */
    checkAllSmallChickensEliminated() {
            const remainingSmallChickens = this.level.enemies.filter(enemy => enemy instanceof SmallChickens);
            if (remainingSmallChickens.length === 0) {
                this.pauseSmallChickenSound = true;
                this.gameSounds.pauseSmallChickensMovingSound();
            }
        }
        /**
         * Checks if all brown chickens have been eliminated, and pauses their sounds accordingly.
         */
    checkAllBrownChickensEliminated() {
        const remainingBrownChickens = this.level.enemies.filter(enemy => enemy instanceof Chicken);
        if (remainingBrownChickens.length === 0) {
            this.pauseBrownChickenSound = true;
            this.gameSounds.normal_chicken_walking_sound.pause();
        }
    }

}