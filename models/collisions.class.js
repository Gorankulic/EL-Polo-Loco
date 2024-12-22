/**
 * Class that handles all collision detection and responses in the game.
 */
class Collisions {
    /**
     * Initializes the Collisions instance with a reference to the world object.
     * @param {World} world - The main world instance.
     * @param {World2} world2 - The seconds world instance.
     */
    constructor(world, world2) {
        this.world = world;
        this.world2 = world2;
    }
    
    /**
     * Checks all collision types in the game.
     */
    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCoinCollisions();
        this.checkBottleCollisions();
        this.checkBottleChickenCollision();
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkEnemyCollisions() {
        this.world.level.enemies.forEach(enemy => {
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
        } else if (this.shouldStompEnemy()) {
            this.handleEnemyStomp(enemy);
        } else {
            this.applyCharacterDamage();
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
     * Determines if the character should stomp the enemy.
     * @returns {boolean} - True if the character should stomp, false otherwise.
     */
    shouldStompEnemy() {
        return this.world.character.isAboveGround() && this.world.character.speedY < 0;
    }

        /**
     * Manages the scenario where the character stomps on a regular enemy.
     * @param {Object} enemy - The enemy object being stomped.
     */
        handleEnemyStomp(enemy) {
            this.world.character.secondJump();
    
            if (!this.hasCollidedWithEnemyBefore(enemy)) {
                this.world2.markEnemyAsCollided(enemy);
                this.playStompEffects(enemy);
                this.removeEnemyWithDelay(enemy, 250);
                this.restoreCharacterEnergy();
            }
        }

     /**
     * Checks if the character has already collided with this enemy.
     * @param {Object} enemy - The enemy object to check.
     * @returns {boolean} - True if the character has already collided, false otherwise.
     */
     hasCollidedWithEnemyBefore(enemy) {
        return enemy.characterEnemyCollision;
    }

       /**
     * Plays sound effects and stops the enemy's movement after being stomped.
     * @param {Object} enemy - The enemy object being stomped.
     */
       playStompEffects(enemy) {
        this.world.playChickenHitSound();
        enemy.stopMovementX();
    }

   /**
     * Removes the enemy from the game after a delay.
     * @param {Object} enemy - The enemy object to remove.
     * @param {number} delay - The delay in milliseconds before removing the enemy.
     */
   removeEnemyWithDelay(enemy, delay) {
    this.removeEnemyAfterDelay(enemy, delay);
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
            this.world2.checkAllSmallChickensEliminated();
            this.world2.checkAllBrownChickensEliminated(); 
        }
    }, delay);
}

   /**
     * Increases the character's energy if it's below the maximum value.
     */
   restoreCharacterEnergy() {
    if (this.world.character.energy < 100) {
        this.world2.increaseCharacterEnergy();
    }
}

  /**
     * Applies damage to the character and checks if the character is dead.
     */
  applyCharacterDamage() {
    this.world.character.hit();
    this.world2.updateCharacterStatusBar();

    if (this.world.character.energy <= 0) {
        this.markCharacterAsDead();
    }
}

    /**
     * Marks the character as dead.
     */
    markCharacterAsDead() {
        this.world.characterIsDead = true;
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
     * Delegates specific actions to smaller functions.
     *
     * @param {Object} bottle - The bottle object to check.
     * @param {number} index - Index of the bottle in the throwable objects array.
     * @returns {boolean} - True if the bottle collided with an enemy, false otherwise.
     */
    checkBottleEnemyCollision(bottle, index) {
        let isRemoved = false;

        this.world.level.enemies.forEach((enemy) => {
            if (this.isBottleCollidingWithEnemy(bottle, enemy)) {
                this.world2.handleBottleEnemyHit(bottle, enemy, index);
                isRemoved = true;
            }
        });

        return isRemoved;
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
                this.world2.removeEnemy(enemy);
            }
        }
    }

    /**
     * Schedules the removal of the bottle after a short delay.
     *
     * @param {number} index - Index of the bottle in the throwable objects array.
     */
    scheduleBottleRemoval(index) {
        setTimeout(() => {
            this.world2.removeThrowableObject(index);
        }, 75);
    }

        /**
     * Handles the collision effects when a throwable bottle hits the Endboss.
     * This includes triggering animations, disabling gravity for the bottle, 
     * processing the Endboss's hit effects, and removing the bottle after the animation.
     *
     * @param {ThrowableObject} bottle - The throwable bottle object that collided with the Endboss.
     * @param {Endboss} endboss - The Endboss object that was hit by the bottle.
     * @param {number} index - The index of the bottle in the array of throwable objects.
     */
        handleEndbossBottleCollision(bottle, endboss, index) {
            endboss.endBossGotHit = true; 
            bottle.triggerSplash(); 
            bottle.isGravityEnabled = false; 
            
            setTimeout(() => {
                this.processEndbossHitEffects(endboss);
            }, 1000);
            
            setTimeout(() => {
                this.world2.removeThrowableObject(index);
            }, 250); 
        }

     /**
     * Checks if a bottle is colliding with an enemy.
     *
     * @param {Object} bottle - The bottle object.
     * @param {Object} enemy - The enemy object.
     * @returns {boolean} - True if the bottle is colliding with the enemy, false otherwise.
     */
     isBottleCollidingWithEnemy(bottle, enemy) {
        return this.isCollision(bottle, enemy);
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
     * Checks if there is a collision between two objects.
     * @param {Object} obj1 - The first object.
     * @param {Object} obj2 - The second object.
     * @returns {boolean} - True if the objects collide, false otherwise.
     */
    isCollision(obj1, obj2) {
        return (
            obj1.x + obj1.width >= obj2.x + obj2.offset.left &&
            obj1.x <= obj2.x + obj2.width - obj2.offset.right &&
            obj1.y + obj1.height >= obj2.y + obj2.offset.top &&
            obj1.y <= obj2.y + obj2.height - obj2.offset.bottom
        );
    }

    /**
     * Handles the collision effects when a bottle hits the end boss.
     * @param {Object} bottle - The bottle object.
     * @param {Endboss} endboss - The end boss object.
     */
    handleEndbossBottleCollision(bottle, endboss) {
        endboss.endBossGotHit = true;
        bottle.isGravityEnabled = false;
        setTimeout(() => this.world.world2.processEndbossHitEffects(endboss), 250);
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
            this.world2.removeThrowableObject(index);
        }, 75);
    }
}
 
}
