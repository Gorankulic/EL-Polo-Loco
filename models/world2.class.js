/**
 * The World2 class handles collision detection, throwable object management, and character position.
 * This class supplements the World class by managing specific game mechanics and interactions.
 */
class World2 {
    /**
     * Initializes the World2 class with a reference to the main World instance.
     * @param {World} world - The main World instance for accessing shared game objects.
     */

    constructor(world, collisions) {
        this.world = world;
        this.collisions = collisions;
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
     * Checks if the player can throw a bottle and manages the throw action.
     */
    checkThrowableObjects() {
        const character = this.world.character;

        if (
            this.world.keyboard.D &&
            character.playerCanThrowBottle &&
            character.bottleCount > 0 &&
            !character.throwCooldown
        ) {
            this.throwBottles();
            this.updateBottleCount();
            this.world.playThrowSound();
            this.collisions.updateBottleStatusBar();
            this.activateThrowCooldown();
        }
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
            if (enemy instanceof Endboss && this.world.character.x > 4000) {
                enemy.endBossMovesLeft = true;
            }
        });
    }

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
}