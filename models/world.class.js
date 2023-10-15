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
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        // Bind fullscreen toggle to button click
        const btn = document.querySelector('.full-screen-button');
        btn.addEventListener('click', this.toggleFullScreen.bind(this));
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();

        }, 1000 / 60);
        setInterval(() => {
            this.checkThrowableObjects();
        }, 1000 / 10);
    }

    checkThrowableObjects() {
        if (this.keyboard.D && this.character.bottleCount > 0) {
            for (let i = 0; i < this.character.bottleCount; i++) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
            }

            this.character.bottleCount -= 25;

            if (this.character.bottleCount < 0) {
                this.character.bottleCount = 0;
            }

            this.statusBarForBottle.setPercentageForBottle(this.character.bottleCount);


        }
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround()) {
                    this.character.secondJump();
                    this.level.enemies.splice(i, 1);
                    i--;
                    if (this.character.energy < 100) {
                        this.character.energy += 10;
                        this.statusBar.setPercentage(this.character.energy);
                    }
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkCoinCollisions() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.coinCount += 25;
                const coinIndex = this.level.coins.indexOf(coin);
                this.level.coins.splice(coinIndex, 1);
                this.coinBar.setPercentageForCoins(this.character.coinCount);
            }
        });
    }


    checkBottleCollisions() {
        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.character.bottleCount < 100) {
                this.character.bottleCount += 25;
                if (this.character.bottleCount > 100) {
                    this.character.bottleCount = 100;
                }
                const bottleIndex = this.level.bottle.indexOf(bottle);
                if (bottleIndex !== -1) {
                    this.level.bottle.splice(bottleIndex, 1);
                }
                this.statusBarForBottle.setPercentageForBottle(this.character.bottleCount);
            }
        });
    }

    checkBottleChickenCollision() {
        for (let i = 0; i < this.throwableObjects.length; i++) {
            const bottle = this.throwableObjects[i];
            for (let j = 0; j < this.level.enemies.length; j++) {
                const chicken = this.level.enemies[j];
                const xCollision = bottle.x + bottle.width >= chicken.x && bottle.x <= chicken.x + chicken.width;
                const yCollision = bottle.y + bottle.height >= chicken.y && bottle.y <= chicken.y + chicken.height;
                if (xCollision && yCollision) {
                    this.throwableObjects.splice(i, 1);
                    i--;
                    this.level.enemies.splice(j, 1);
                    j--;
                }
            }
        }
    }

    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCoinCollisions();
        this.checkBottleCollisions();
        this.checkBottleChickenCollision();
    }

    draw() {
        this.statusBar.draw(this.ctx);
        this.statusBarForBottle.draw(this.ctx);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.statusBarForBottle.draw(this.ctx);
        this.coinBar.draw(this.ctx);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
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
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            // Enter fullscreen mode
            if (this.canvas.requestFullscreen) {
                this.canvas.requestFullscreen();
            } else if (this.canvas.msRequestFullscreen) {
                this.canvas.msRequestFullscreen();
            } else if (this.canvas.mozRequestFullScreen) {
                this.canvas.mozRequestFullScreen();
            } else if (this.canvas.webkitRequestFullscreen) {
                this.canvas.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            // Exit fullscreen mode
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }


}