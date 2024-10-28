/**
 * The World2 class handles collision detection, throwable object management, and character position.
 * This class supplements the World class by managing specific game mechanics and interactions.
 */
class World2 {
    /**
     * Initializes the World2 class with a reference to the main World instance.
     * @param {World} world - The main World instance for accessing shared game objects.
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Starts the game loop for checking collisions, throwable objects, and character position.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
            this.checkCharacterXPosition();
        }, 1000 / 60);
    }

    /**
     * Manages various types of collisions within the game world.
     */
    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCoinCollisions();
        this.checkBottleCollisions();
        this.checkBottleChickenCollision();
    }

    /**
     * Detects and handles collisions between the character and enemies.
     */
    checkEnemyCollisions() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy)) {
                this.handleEnemyCollision(enemy);
            }
        });
    }

    /**
     * Manages collisions between the character and an enemy, including end boss interactions.
     * @param {Object} enemy - The enemy object colliding with the character.
     */
    handleEnemyCollision(enemy) {
        this.world.playPepeHurtSound();
        if (enemy instanceof Endboss) {
            this.handleEndbossCollision(enemy);
        } else if (this.world.character.isAboveGround()) {
            this.handleEnemyStomp(enemy);
        } else {
            this.world.character.hit();
            this.world.statusBar.setPercentage(this.world.character.energy);
            if (this.world.character.energy <= 0) {
                this.world.characterIsDead = true;
            }
        }
    }

    /**
     * Handles collision with the end boss by triggering an attack and updating character energy.
     * @param {Endboss} endboss - The end boss object.
     */
    handleEndbossCollision(endboss) {
        setTimeout(() => {
            endboss.endBossAttacking = true;
        }, 500);
        this.world.character.hit();
        this.world.statusBar.setPercentage(this.world.character.energy);
    }

    /**
     * Manages the scenario where the character stomps on a regular enemy.
     * @param {Object} enemy - The enemy object being stomped.
     */
    handleEnemyStomp(enemy) {
        this.world.character.secondJump();
        if (!enemy.characterEnemyCollision) {
            enemy.characterEnemyCollision = true;
            this.world.playChickenHitSound();
            enemy.stopMovementX();
            this.removeEnemyAfterDelay(enemy, 250);
            if (this.world.character.energy < 100) {
                this.increaseCharacterEnergy();
            }
        }
    }

    /**
     * Removes an enemy from the game after a specified delay.
     * @param {Object} enemy - The enemy object to remove.
     * @param {number} delay - Delay in milliseconds before removing the enemy.
     */
    removeEnemyAfterDelay(enemy, delay) {
        setTimeout(() => {
            const currentIndex = this.world.level.enemies.indexOf(enemy);
            if (currentIndex !== -1) {
                this.world.level.enemies.splice(currentIndex, 1);
            }
        }, delay);
    }

    /**
     * Increases character energy by a fixed amount, up to a maximum of 100.
     */
    increaseCharacterEnergy() {
        this.world.character.energy = Math.min(this.world.character.energy + 20, 100);
        this.world.statusBar.setPercentage(this.world.character.energy);
    }

    /**
     * Detects and handles collisions between the character and coins.
     */
    checkCoinCollisions() {
        this.world.level.coins.forEach((coin) => {
            if (this.shouldCollectCoin(coin)) {
                this.collectCoin(coin);
            }
        });
    }

    /**
     * Determines if a coin should be collected by the character.
     * @param {Object} coin - The coin object to check.
     * @returns {boolean} - True if the coin should be collected, false otherwise.
     */
    shouldCollectCoin(coin) {
        return this.world.character.isColliding(coin) && this.world.character.coinCount < 100;
    }

    /**
     * Handles the collection of a coin, updating character coin count and status bar.
     * @param {Object} coin - The coin object being collected.
     */
    collectCoin(coin) {
        this.world.playCoinCollectedSound();
        this.incrementCoinCount();
        this.removeCoinFromLevel(coin);
        this.updateCoinStatusBar();
    }

    /**
     * Increments the character's coin count, up to a maximum of 100.
     */
    incrementCoinCount() {
        this.world.character.coinCount = Math.min(this.world.character.coinCount + 25, 100);
    }

    /**
     * Removes a collected coin from the game level.
     * @param {Object} coin - The coin object to remove.
     */
    removeCoinFromLevel(coin) {
        const coinIndex = this.world.level.coins.indexOf(coin);
        if (coinIndex !== -1) {
            this.world.level.coins.splice(coinIndex, 1);
        }
    }

    /**
     * Updates the coin status bar based on the character's current coin count.
     */
    updateCoinStatusBar() {
        this.world.coinBar.setPercentageForCoins(this.world.character.coinCount);
    }

    /**
     * Detects and handles collisions between the character and bottles.
     */
    checkBottleCollisions() {
        this.world.level.bottle.forEach((bottle) => {
            if (this.shouldCollectBottle(bottle)) {
                this.collectBottle(bottle);
            }
        });
    }

    /**
     * Determines if a bottle should be collected by the character.
     * @param {Object} bottle - The bottle object to check.
     * @returns {boolean} - True if the bottle should be collected, false otherwise.
     */
    shouldCollectBottle(bottle) {
        return this.world.character.isColliding(bottle) && this.world.character.bottleCount < 5;
    }

    /**
     * Handles the collection of a bottle, updating character bottle count and status bar.
     * @param {Object} bottle - The bottle object being collected.
     */
    collectBottle(bottle) {
        this.world.playBottleCollectedSound();
        this.incrementBottleCount();
        this.removeBottleFromLevel(bottle);
        this.updateBottleStatusBar();
    }

    /**
     * Increments the character's bottle count, up to a maximum of 5.
     */
    incrementBottleCount() {
        this.world.character.bottleCount = Math.min(this.world.character.bottleCount + 1, 5);
    }

    /**
     * Removes a collected bottle from the game level.
     * @param {Object} bottle - The bottle object to remove.
     */
    removeBottleFromLevel(bottle) {
        const bottleIndex = this.world.level.bottle.indexOf(bottle);
        if (bottleIndex !== -1) {
            this.world.level.bottle.splice(bottleIndex, 1);
        }
    }

    /**
     * Updates the bottle status bar based on the character's current bottle count.
     */
    updateBottleStatusBar() {
        let percentage = (this.world.character.bottleCount / 5) * 100;
        this.world.statusBarForBottle.setPercentageForBottle(percentage);
    }

    /**
     * Checks for collisions between throwable bottles and enemies or the ground.
     */
    checkBottleChickenCollision() {
        this.world.throwableObjects.forEach((bottle, i) => {
            let isRemoved = this.checkBottleEnemyCollision(bottle, i);
            if (!isRemoved) {
                this.checkBottleGroundCollision(bottle, i);
            }
        });
    }

    /**
     * Checks for a collision between a bottle and an enemy.
     * @param {Object} bottle - The bottle object to check.
     * @param {number} index - Index of the bottle in the throwable objects array.
     * @returns {boolean} - True if the bottle collided with an enemy, false otherwise.
     */
    checkBottleEnemyCollision(bottle, index) {
        let isRemoved = false;
        this.world.level.enemies.forEach((enemy) => {
            if (this.isCollision(bottle, enemy)) {
                bottle.triggerSplash();
                this.handleChickenBottleCollision(bottle, enemy);
                this.world.playBottleChickenCollisionSound();
                setTimeout(() => {
                    this.removeThrowableObject(index);
                    isRemoved = true;
                }, 75);
            }
        });
        return isRemoved;
    }

    /**
     * Handles collision between a bottle and the ground.
     * @param {Object} bottle - The bottle object to check.
     * @param {number} index - Index of the bottle in the throwable objects array.
     */
    checkBottleGroundCollision(bottle, index) {
        if (bottle.y >= 379) {
            this.world.playBottleGroundCollisionSound();
            bottle.triggerSplash();
            bottle.stopMovementXandY();
            setTimeout(() => {
                this.removeThrowableObject(index);
            }, 75);
        }
    }

    /**
     * Determines if there is a collision between two objects based on their coordinates.
     * @param {Object} bottle - The bottle object.
     * @param {Object} enemy - The enemy object.
     * @returns {boolean} - True if there is a collision, false otherwise.
     */
    isCollision(bottle, enemy) {
        const xCollision = bottle.x + bottle.width >= enemy.x && bottle.x <= enemy.x + enemy.width;
        const yCollision = bottle.y + bottle.height >= enemy.y && bottle.y <= enemy.y + enemy.height;
        return xCollision && yCollision;
    }

    /**
     * Handles the collision between a thrown bottle and an enemy.
     * If the enemy is an Endboss, specific actions are taken.
     * @param {Object} bottle - The bottle object colliding with the enemy.
     * @param {Object} enemy - The enemy object.
     */
    handleChickenBottleCollision(bottle, enemy) {
        if (!enemy.characterEnemyCollision) {
            enemy.characterEnemyCollision = true;
            enemy.stopMovementX();
            if (enemy instanceof Endboss) {
                this.handleEndbossBottleCollision(bottle, enemy);
            } else {
                this.removeEnemy(enemy);
            }
        }
    }

    /**
     * Handles collision effects when a bottle hits the Endboss.
     * @param {Object} bottle - The bottle colliding with the Endboss.
     * @param {Endboss} endboss - The Endboss object.
     */
    handleEndbossBottleCollision(bottle, endboss) {
        this.markEndbossAsHit(endboss);
        this.triggerBottleSplashIfHit(bottle, endboss);
        setTimeout(() => {
            this.processEndbossHitEffects(endboss);
        }, 500);
        this.resetEndbossHitStateAfterDelay(endboss, 750);
    }

    /**
     * Marks the Endboss as hit.
     * @param {Endboss} endboss - The Endboss object.
     */
    markEndbossAsHit(endboss) {
        endboss.endBossGotHit = true;
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
        endboss.endBossEnergy -= 25;
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
     * Removes an enemy from the level after a delay.
     * @param {Object} enemy - The enemy to remove.
     */
    removeEnemy(enemy) {
        setTimeout(() => {
            this.world.level.enemies = this.world.level.enemies.filter(e => e !== enemy);
        }, 500);
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
        if (this.world.keyboard.D && this.world.character.bottleCount > 0 && !this.world.character.throwCooldown) {
            this.activateThrowCooldown();
            this.throwBottles();
            this.updateBottleCount();
            this.world.playThrowSound();
            this.updateBottleStatusBar();
            this.resetThrowCooldownAfterDelay();
        }
    }

    /**
     * Activates a cooldown to prevent rapid bottle throwing.
     */
    activateThrowCooldown() {
        this.world.character.throwCooldown = true;
    }

    /**
     * Throws a bottle based on the character's current direction and position.
     */
    throwBottles() {
        let xOffset = this.world.character.lastDirection === 'right' ? 100 : 0;
        let bottle = new ThrowableObject(this.world.character.x + xOffset, this.world.character.y + 100, this.world.character.lastDirection);
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
     * Resets the throw cooldown after a delay.
     */
    resetThrowCooldownAfterDelay() {
        setTimeout(() => {
            this.world.character.throwCooldown = false;
        }, 1000);
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
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari & Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
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
        } else if (element.mozRequestFullScreen) { // Firefox
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Chrome, Safari & Opera
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE/Edge
            element.msRequestFullscreen();
        }
    }
}