class World2 {
    constructor(world) {
        this.world = world;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
            this.checkCharacterXPosition();
        }, 1000 / 60);
    }

    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCoinCollisions();
        this.checkBottleCollisions();
        this.checkBottleChickenCollision();
    }

    checkEnemyCollisions() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy)) {
                this.handleEnemyCollision(enemy);
            }
        });
    }

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

    handleEndbossCollision(endboss) {
        setTimeout(() => {
            endboss.endBossAttacking = true;
        }, 500);
        this.world.character.hit();
        this.world.statusBar.setPercentage(this.world.character.energy);
    }

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

    removeEnemyAfterDelay(enemy, delay) {
        setTimeout(() => {
            if (this.world.level.enemies.includes(enemy)) {
                const currentIndex = this.world.level.enemies.indexOf(enemy);
                if (currentIndex !== -1) {
                    this.world.level.enemies.splice(currentIndex, 1);
                }
            }
        }, delay);
    }

    increaseCharacterEnergy() {
        this.world.character.energy = Math.min(this.world.character.energy + 20, 100);
        this.world.statusBar.setPercentage(this.world.character.energy);
    }

    checkCoinCollisions() {
        this.world.level.coins.forEach((coin) => {
            if (this.shouldCollectCoin(coin)) {
                this.collectCoin(coin);
            }
        });
    }

    shouldCollectCoin(coin) {
        return this.world.character.isColliding(coin) && this.world.character.coinCount < 100;
    }

    collectCoin(coin) {
        this.world.playCoinCollectedSound();
        this.incrementCoinCount();
        this.removeCoinFromLevel(coin);
        this.updateCoinStatusBar();
    }

    incrementCoinCount() {
        this.world.character.coinCount = Math.min(this.world.character.coinCount + 25, 100);
    }

    removeCoinFromLevel(coin) {
        const coinIndex = this.world.level.coins.indexOf(coin);
        if (coinIndex !== -1) {
            this.world.level.coins.splice(coinIndex, 1);
        }
    }

    updateCoinStatusBar() {
        this.world.coinBar.setPercentageForCoins(this.world.character.coinCount);
    }

    checkBottleCollisions() {
        this.world.level.bottle.forEach((bottle) => {
            if (this.shouldCollectBottle(bottle)) {
                this.collectBottle(bottle);
            }
        });
    }

    shouldCollectBottle(bottle) {
        return this.world.character.isColliding(bottle) && this.world.character.bottleCount < 5;
    }

    collectBottle(bottle) {
        this.world.playBottleCollectedSound();
        this.incrementBottleCount();
        this.removeBottleFromLevel(bottle);
        this.updateBottleStatusBar();
    }

    incrementBottleCount() {
        this.world.character.bottleCount = Math.min(this.world.character.bottleCount + 1, 5);
    }

    removeBottleFromLevel(bottle) {
        const bottleIndex = this.world.level.bottle.indexOf(bottle);
        if (bottleIndex !== -1) {
            this.world.level.bottle.splice(bottleIndex, 1);
        }
    }

    updateBottleStatusBar() {
        let percentage = (this.world.character.bottleCount / 5) * 100;
        this.world.statusBarForBottle.setPercentageForBottle(percentage);
    }

    checkBottleChickenCollision() {
        this.world.throwableObjects.forEach((bottle, i) => {
            let isRemoved = this.checkBottleEnemyCollision(bottle, i);
            if (!isRemoved) {
                this.checkBottleGroundCollision(bottle, i);
            }
        });
    }

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
                this.handleEndbossBottleCollision(bottle, enemy);
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

    reduceEndbossEnergy(endboss) {
        endboss.endBossEnergy -= 25;
        if (endboss.endBossEnergy <= 0) {
            this.world.endBossIsEliminated = true;
            endboss.endBossEnergy = 0;
        }
    }

    updateEndbossHealthBar(endboss) {
        this.world.endbossHealthBar.setPercentageForEndBoss(endboss.endBossEnergy);
    }

    resetEndbossCollisionState(endboss) {
        endboss.endBossGotHit = false;
        endboss.characterEnemyCollision = false;
    }

    removeEnemy(enemy) {
        setTimeout(() => {
            this.world.level.enemies = this.world.level.enemies.filter(e => e !== enemy);
        }, 500);
    }

    removeThrowableObject(index) {
        const bottle = this.world.throwableObjects[index];
        if (bottle) {
            this.world.throwableObjects.splice(index, 1);
        }
    }

    checkThrowableObjects() { /////////////////////////
        if (this.world.keyboard.D && this.world.character.bottleCount > 0 && !this.world.character.throwCooldown) {
            this.activateThrowCooldown();
            this.throwBottles();
            this.updateBottleCount();
            this.world.playThrowSound();
            this.updateBottleStatusBar();
            this.resetThrowCooldownAfterDelay();
        }
    }

    activateThrowCooldown() {
        this.world.character.throwCooldown = true;
    }

    throwBottles() {
        let xOffset = this.world.character.lastDirection === 'right' ? 100 : 0;
        let bottle = new ThrowableObject(this.world.character.x + xOffset, this.world.character.y + 100, this.world.character.lastDirection);
        this.world.throwableObjects.push(bottle);
    }

    updateBottleCount() {
        if (this.world.character.bottleCount > 0) {
            this.world.character.bottleCount -= 1;
        }
        this.world.character.bottleCount = Math.min(Math.max(this.world.character.bottleCount, 0), 5);
    }

    resetThrowCooldownAfterDelay() {
        setTimeout(() => {
            this.world.character.throwCooldown = false;
        }, 1000);
    }

    checkCharacterXPosition() {
        this.world.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss && this.world.character.x > 4000) {
                enemy.endBossMovesLeft = true;
            }
        });
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