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

        }, 1000 / 30);
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
        }, 1000 / 30);

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
        }, 1000);
    }


    checkEnemyCollisions() {
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
        }
    }

    playPepeHurtSound() {
        if (this.gameSoundActive) {
            this.pepe_hurt.play();
        } else {
            this.pepe_hurt.pause();
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

        }
    }

    playChickenHitSound() {
        if (this.gameSoundActive) {
            this.chicken_hit_sound.play();
            this.chicken_eliminated_from_player.play();
        } else {
            this.chicken_hit_sound.pause();
            this.chicken_eliminated_from_player.pause();
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

    playCoinCollectedSound() {
        if (this.gameSoundActive) {
            this.coin_sound.play();
        } else {
            this.coin_sound.pause();
        }
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
        return this.character.isColliding(bottle) && this.character.bottleCount < 100;
    }

    collectBottle(bottle) {
        this.playBottleCollectedSound();
        this.incrementBottleCount();
        this.removeBottleFromLevel(bottle);
        this.updateBottleStatusBar();
    }

    playBottleCollectedSound() {
        if (this.gameSoundActive) {
            this.bottle_collected_sound.play();
        } else {
            this.bottle_collected_sound.pause();
        }
    }

    incrementBottleCount() {
        this.character.bottleCount = Math.min(this.character.bottleCount + 20, 100);
    }

    removeBottleFromLevel(bottle) {
        const bottleIndex = this.level.bottle.indexOf(bottle);
        if (bottleIndex !== -1) {
            this.level.bottle.splice(bottleIndex, 1);
        }
    }

    updateBottleStatusBar() {
        this.statusBarForBottle.setPercentageForBottle(this.character.bottleCount);
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
                this.handleChickenBottleCollision(bottle, enemy);
                this.playBottleChickenCollisionSound();
                bottle.triggerSplash(); // Trigger splash animation upon collision
                this.removeThrowableObject(index);
                isRemoved = true;
            }
        });

        return isRemoved;
    }

    checkBottleGroundCollision(bottle, index) {
        if (bottle.y >= 379) {
            this.playBottleGroundCollisionSound();
            bottle.triggerSplash(); // Trigger splash animation
            this.removeThrowableObject(index);
        }
    }

    playBottleChickenCollisionSound() {
        if (!this.gameSoundActive) {
            this.chicken_hit_sound.pause();
            this.bottle_splash_sound.pause();
        } else {
            this.chicken_hit_sound.play();
            this.bottle_splash_sound.play();
        }
    }

    playBottleGroundCollisionSound() {
        if (!this.gameSoundActive) {
            this.bottle_splash_sound.pause();
        } else {
            this.bottle_splash_sound.play();
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
        setTimeout(() => {
            this.level.enemies = this.level.enemies.filter(e => e !== enemy); // Remove the specific enemy
        }, 500);
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
        this.statusBar.draw(this.ctx);
        this.statusBarForBottle.draw(this.ctx);
        this.coinBar.draw(this.ctx);
    }

    handleEndBossHealthBar() {
        if (this.character.x > 1500) {
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

    playEndBossComingSound() {
        if (!this.gameSoundActive) {
            this.endbboss_coming_sound.pause();
        } else {
            this.endbboss_coming_sound.play();
        }
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
            if (enemy instanceof Endboss && this.character.x > 1500) {
                enemy.endBossMovesLeft = true;
            }


            //   setTimeout(() => {
            //     this.small_chickens_move_sound.play();
            // }, 30000); remove 
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