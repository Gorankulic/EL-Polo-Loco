class ResetGameRules {
    constructor(world, world2) { // Make sure you pass world2 to the constructor
        this.world = world;
        this.world2 = world2; // Assign the world2 object here
    }

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

    resetGlobalFlags() {
        const world = this.world;
        world.gameOver = false;
        world.characterIsDead = false;
        world.endBossAttacking = false;
        world.endBossGotHit = false;
        world.endBossIsEliminated = false;
        world.endBossMovesLeft = false;
        world.stopAllAnimations = false;
        world.pauseSmallChickenSound = false;
    }

    resetCharacter() {
        const character = this.world.character;
        character.clearAllIntervals();
        character.reset();
    }

    resetGameEntities() {
        this.resetCollectibleItems();
        this.resetEndBoss();
        this.resetEnemies();
        this.resetClouds();
        this.clearThrowableObjects();
    }

    resetCollectibleItems() {
        this.resetBottles();
        this.resetCoins();
    }

    resetBottles() {
        this.world.level.bottle = [];
        this.world.level.bottle = createInstances(Bottle, 10);
    }

    resetCoins() {
        this.world.level.coins = [];
        this.world.level.coins.push(new Coins(), new Coins(), new Coins(), new Coins());
    }

    resetEndBoss() {
        const endboss = this.world.endboss;
        endboss.reset();
        this.world.endbossHealthBar.setPercentageForEndBoss(100);
    }

    resetEnemies() {
        this.world.level.enemies = [
            ...createInstances(Chicken, 5),
            ...createInstances(SmallChickens, 10),
            new Endboss(this.world),
        ];

        this.world.level.enemies.forEach(enemy => {
            enemy.clearAllIntervals();
            enemy.reset();
        });
    }

    resetClouds() {
        this.world.level.clouds.forEach(cloud => {
            cloud.clearAllIntervals();
            cloud.reset();
        });
    }

    clearThrowableObjects() {
        this.world.clearAllBottleObjects();
    }

    resetStatusBars() {
        const world = this.world;
        world.statusBar.setPercentage(100);
        world.statusBarForBottle.setPercentageForBottle(0);
        world.coinBar.setPercentageForCoins(0);
    }

    resetBackgroundObjects() {
        const world = this.world;
        const imageWidth = 719;
        const repetitions = Math.ceil(world.level.level_end_x / imageWidth) + 1;
        world.level.backgroundObjects = createBackgroundObjects(imageWidth, repetitions);
    }

    resetCameraPosition() {
        this.world.camera_x = 0;
    }

    resetGameSounds() {
        const world = this.world;
        if (world.gameSoundActive) {
            world.gameSounds.desert_ambient_sound.currentTime = 0;
            world.gameSounds.background_game_music.currentTime = 0;
            world.gameSounds.playAmbientSounds();
        }
    }

    restartGameLoops() {
        this.world.world2.run();
        this.world.draw();
    }
}
