/**
 * The World2 class handles collision detection, throwable object management, and character position.
 * This class supplements the World class by managing specific game mechanics and interactions.
 */
class World2 {
    /**
     * Initializes the World2 class with references to the main World instance, collisions, and game sounds.
     * @param {World} world - The main World instance for accessing shared game objects and state.
     * @param {Collisions} collisions - The collisions instance for handling collision detection and responses.
     * @param {GameSound} gameSounds - The game sounds instance for managing audio effects and background music.
     */
    constructor(world, collisions, gameSounds) {
        this.world = world; // Reference to the main World instance
        this.collisions = collisions; // Collision handling instance
        this.gameSounds = gameSounds; // Game sound management instance
    }

    /**
     * Starts the game loop for checking collisions, throwable objects, and character position.
     */
    run() {
        setInterval(() => {
            this.collisions.checkCollisions();
            this.checkThrowableObjects();
            this.checkCharacterXPosition();
            this.preventBottleThrowWhenSleeping();
            this.world.toggleEndGameMenu();
        }, 1000 / 60);
    }

    /**
     * Updates the character's energy status bar.
     */
    updateCharacterStatusBar() {
        this.world.statusBar.setPercentage(this.world.character.energy);
    }

    /**
     * Increases character energy by a fixed amount, up to a maximum of 100.
     */
    increaseCharacterEnergy() {
            this.world.character.energy = Math.min(this.world.character.energy + 20, 100);
            this.world.statusBar.setPercentage(this.world.character.energy);
        }
        /**
         * Determines if there is a collision between two objects based on their coordinates.
         * @param {Object} bottle - The bottle object.
         * @param {Object} enemy - The enemy object.
         * @returns {boolean} - True if there is a collision, false otherwise.
         */
    isCollision(bottle, enemy) {
        const xCollision =
            bottle.x + bottle.width >= enemy.x + enemy.offset.left &&
            bottle.x <= enemy.x + enemy.width - enemy.offset.right;

        const yCollision =
            bottle.y + bottle.height >= enemy.y + enemy.offset.top &&
            bottle.y <= enemy.y + enemy.height - enemy.offset.bottom;

        return xCollision && yCollision;
    }

    /**
     * Marks the Endboss as hit.
     * @param {Endboss} endboss - The Endboss object.
     */
    markEndbossAsHit(endboss) {
            endboss.endBossGotHit = true;
        }
        /**
         * Marks the enemy as collided to prevent duplicate actions.
         * @param {Object} enemy - The enemy object to mark.
         */
    markEnemyAsCollided(enemy) {
        enemy.characterEnemyCollision = true;
    }

    /**
     * Removes an enemy from the level after a delay.
     * @param {Object} enemy - The enemy to remove.
     */
    removeEnemy(enemy) {
        setTimeout(() => {
            this.world.level.enemies = this.world.level.enemies.filter(e => e !== enemy);
        }, 500);
    }

    /**
     * Triggers a splash effect for the bottle if the Endboss was hit.
     * @param {Object} bottle - The bottle object.
     * @param {Endboss} endboss - The Endboss object.
     */
    triggerBottleSplashIfHit(bottle, endboss) {
            if (endboss.endBossGotHit) {
                bottle.triggerSplash();
            }
        }
        /**
         * Handles the logic for when a bottle hits an enemy.
         *
         * @param {Object} bottle - The bottle object colliding with the enemy.
         * @param {Object} enemy - The enemy object being hit.
         * @param {number} index - Index of the bottle in the throwable objects array.
         */
    handleBottleEnemyHit(bottle, enemy, index) {
        bottle.triggerSplash();
        this.collisions.handleChickenBottleCollision(bottle, enemy);
        this.world.playBottleChickenCollisionSound();
        this.collisions.scheduleBottleRemoval(index);
    }

    /**
     * Processes the effects on the Endboss after being hit by a bottle.
     * @param {Endboss} endboss - The Endboss object.
     */
    processEndbossHitEffects(endboss) {
        this.reduceEndbossEnergy(endboss);
        this.updateEndbossHealthBar(endboss);
        this.resetEndbossCollisionState(endboss);
    }

    /**
     * Resets the Endboss hit state after a delay.
     * @param {Endboss} endboss - The Endboss object.
     * @param {number} delay - Delay in milliseconds before resetting.
     */
    resetEndbossHitStateAfterDelay(endboss, delay) {
        setTimeout(() => {
            endboss.endBossGotHit = false;
        }, delay);
    }

    /**
     * Reduces the Endboss's energy by a fixed amount. If energy is 0 or below, marks Endboss as eliminated.
     * @param {Endboss} endboss - The Endboss object.
     */
    reduceEndbossEnergy(endboss) {
        endboss.endBossEnergy -= 15;
        if (endboss.endBossEnergy <= 0) {
            this.world.endBossIsEliminated = true;
            endboss.endBossEnergy = 0;
        }
    }

    /**
     * Updates the health bar of the Endboss based on its current energy.
     * @param {Endboss} endboss - The Endboss object.
     */
    updateEndbossHealthBar(endboss) {
        this.world.endbossHealthBar.setPercentageForEndBoss(endboss.endBossEnergy);
    }

    /**
     * Resets the Endboss collision state after handling collision effects.
     * @param {Endboss} endboss - The Endboss object.
     */
    resetEndbossCollisionState(endboss) {
        endboss.endBossGotHit = false;
        endboss.characterEnemyCollision = false;
    }


    /**
     * Removes a throwable object from the game by its index.
     * @param {number} index - The index of the throwable object.
     */
    removeThrowableObject(index) {
        const bottle = this.world.throwableObjects[index];
        if (bottle) {
            this.world.throwableObjects.splice(index, 1);
        }
    }

    /**
     * Checks if the character can throw a bottle and manages the throw action.
     */
    checkThrowableObjects() {
        if (this.canThrowBottle()) {
            this.handleBottleThrow();
        }
    }

    /**
     * Determines if the character can throw a bottle.
     * @returns {boolean} True if the character can throw a bottle, otherwise false.
     */
    canThrowBottle() {
        const character = this.world.character;

        return (
            this.world.keyboard.D && // Check if the "D" key is pressed
            character.playerCanThrowBottle && // Ensure the character is allowed to throw
            character.bottleCount > 0 && // Ensure the character has bottles available
            !character.throwCooldown // Ensure the throw cooldown is not active
        );
    }

    /**
     * Handles the bottle throw action and updates the game state.
     */
    handleBottleThrow() {
        this.throwBottles(); // Handle the bottle throw
        this.updateBottleCount(); // Decrease the bottle count
        this.world.playThrowSound(); // Play the throw sound
        this.collisions.updateBottleStatusBar(); // Update the bottle status bar
        this.activateThrowCooldown(); // Activate a cooldown to prevent rapid throws
    }

    /**
     * Activates a cooldown to prevent rapid bottle throwing.
     */
    activateThrowCooldown() {
        const character = this.world.character;
        character.throwCooldown = true;

        setTimeout(() => {
            character.throwCooldown = false;
        }, 1000);
    }

    /**
     * Throws a bottle based on the character's current direction and position.
     */
    throwBottles() {
        const character = this.world.character;
        const xOffset = character.lastDirection === 'right' ? 100 : -50;
        const bottle = new ThrowableObject(
            character.x + xOffset,
            character.y + 100,
            character.lastDirection,
            this.world
        );
        this.world.throwableObjects.push(bottle);
    }

    /**
     * Decrements the character's bottle count after throwing and keeps it within valid bounds.
     */
    updateBottleCount() {
        if (this.world.character.bottleCount > 0) {
            this.world.character.bottleCount -= 1;
        }
        this.world.character.bottleCount = Math.min(Math.max(this.world.character.bottleCount, 0), 5);
    }

    /**
     * Prevents bottle throwing when the character is sleeping.
     */
    preventBottleThrowWhenSleeping() {
        const character = this.world.character;

        if (character.isSleeping()) {
            character.playerCanThrowBottle = false;
        } else {
            character.playerCanThrowBottle = true;
        }
    }

    /**
     * Checks the character's X position and triggers enemy movement if character is near Endboss.
     */
    checkCharacterXPosition() {
            this.world.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss) {
                    if (this.world.character.x > 4000) {
                        enemy.endBossMovesLeft = true;
                    }
                }
            });
        }
        ////////////////////baustela nakon pobjede i nakon sto pobacam sve flase napolje, i izgubim od endbosa i onda idem na menu i na play, pojavi mi se endgame menu


    /**
     * Exits full-screen mode for the game.
     */
    exitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    /**
     * Requests full-screen mode for the specified HTML element.
     * @param {HTMLElement} element - The HTML element to display in full-screen.
     */
    requestFullScreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    /**
     * Checks if all small chickens have been eliminated, and pauses sounds accordingly.
     */
    checkAllSmallChickensEliminated() {
            const remainingSmallChickens = this.world.level.enemies.filter(enemy => enemy instanceof SmallChickens);
            if (remainingSmallChickens.length === 0) {
                this.world.pauseSmallChickenSound = true;
                this.world.gameSounds.pauseSmallChickensMovingSound();
            }
        }
        /**
         * Checks if all brown chickens have been eliminated, and pauses their sounds accordingly.
         */
    checkAllBrownChickensEliminated() {
        const remainingBrownChickens = this.world.level.enemies.filter(enemy => enemy instanceof Chicken);
        if (remainingBrownChickens.length === 0) {
            this.world.pauseBrownChickenSound = true;
            this.world.gameSounds.normal_chicken_walking_sound.pause();
        }
    }

    /**
     * Handles all sound-related logic for the victory condition.
     */
    handleVictorySounds() {
            this.world.gameSounds.walking_sound.pause();
            this.world.stopAllAnimations = true;

            if (this.world.gameSoundActive) {
                this.world.gameSounds.game_won_sound.play();
                this.world.gameSounds.desert_ambient_sound.pause();
                this.world.gameSounds.background_game_music.pause();
                this.world.gameSounds.small_chickens_move_sound.pause();
            }
        }
        /**
         * Resets the character's bottle count to zero.
         */
    resetCharacterBottleCount() {
        this.world.character.bottleCount = 0;
    }

    /**
     * Schedules the routine to end the game and reset game changes after a delay.
     */
    scheduleVictoryRoutine() {
        setTimeout(() => {
            this.world.endGameRoutine();
            this.world.resetGameRules.resetGameChanges();
        }, 4000); // Delay in milliseconds
    }

    /**
     * Stops all character and enemy movement.
     */
    stopCharacterAndEnemies() {
        this.world.character.speed = 0;
        this.world.level.enemies.forEach(enemy => enemy.speed = 0);
    }

    /**
     * Disables character actions like jumping after the game ends.
     */
    disableCharacterActions() {
        this.world.character.characterCanJump = false;
        this.world.stopAllAnimations = true;
    }

    /**
     * Handles game state transitions like drawing status bars or handling victory/game over conditions.
     */
    handleGameStateTransitions() {
            if (this.world.isGameInProgress()) {
                this.world.drawStatusBars();
                this.world.updateEndBossHealthBar();
            } else {
                this.world.hideEndBossHealthBar();
            }
            if (this.world.isCharacterDead()) {
                this.world.handleGameOver();
            } else if (this.world.isEndBossEliminated()) {
                this.handleVictory();
            }
        }
        /**
         * Handles victory conditions, stopping animations and playing victory sounds.
         */
    handleVictory() {
        this.world.showEndGameScreen = true; // Show the menu
        this.disableCharacterActions();
        this.world.displayVictoryScreen();
        this.stopCharacterAndEnemies();
        this.resetCharacterBottleCount();
        this.handleVictorySounds();
        this.world.gameSoundActive = false;

    }

    /**
     * Stops all game sounds to signify the end of the game.
     */
    stopAllGameSounds() {
            this.world.gameSounds.desert_ambient_sound.pause();
            this.world.gameSounds.background_game_music.pause();
            this.world.gameSounds.small_chickens_move_sound.pause();
            this.world.gameSounds.walking_sound.pause();
            this.world.gameSounds.character_eliminated_sound.pause();
        }
        /**
         * Draws game elements like characters, coins, enemies, and throwable objects.
         */
    drawGameObjects() {
        this.world.addObjectsToMap(this.world.level.bottle);
        this.world.addObjectsToMap(this.world.level.coins);
        this.world.addObjectsToMap(this.world.level.enemies);
        this.world.addObjectsToMap(this.world.throwableObjects);
        this.world.addToMap(this.world.character);
    }
}