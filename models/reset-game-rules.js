/**
 * Class for resetting game rules and entities to their initial state.
 */
class ResetGameRules {
    /**
     * Initializes the ResetGameRules instance with references to the World and World2 instances.
     * @param {Object} world - The primary game world instance.
     * @param {Object} world2 - The secondary game logic instance.
     */
    constructor(world, world2) {
        this.world = world; // The primary game world instance.
        this.world2 = world2; // The secondary game logic instance.
    }

    /**
     * Resets the game state and entities to their initial values.
     */
    resetGameChanges() {
        const world = this.world;
        this.resetGlobalFlags();
        this.resetCharacter();
        this.resetGameEntities();
        this.resetEnemies();
        this.resetEndBoss();
        this.resetStatusBars();
        this.resetBackgroundObjects();
        this.resetCameraPosition();
        this.resetGameSounds();
        this.restartGameLoops();
    }


    /**
     * Resets global flags that track game state.
     */
    resetGlobalFlags() {
        const world = this.world;
        world.stopAllAnimations = false;
        world.gameOver = false;
        world.characterIsDead = false;
        world.endBossAttacking = false;
        world.endBossGotHit = false;
        world.endBossIsEliminated = false;
        world.endBossMovesLeft = false;
        world.pauseSmallChickenSound = false;
    }

    /**
     * Resets the main character to its initial state.
     */
    resetCharacter() {
        const character = this.world.character;
        character.clearAllIntervals();
        character.reset();
    }


    /**
     * Resets all game entities, including collectibles, enemies, and clouds.
     */
    resetGameEntities() {
        this.resetCollectibleItems();
        this.resetEnemies();
        this.resetClouds();
        this.clearThrowableObjects();
    }

    /**
     * Resets all collectible items like bottles and coins.
     */
    resetCollectibleItems() {
        this.resetBottles();
        this.resetCoins();
    }

    /**
     * Resets bottle items in the game level.
     */
    resetBottles() {
        this.world.level.bottle = [];
        this.world.level.bottle = createInstances(Bottle, 10);
    }

    /**
     * Resets coin items in the game level.
     */
    resetCoins() {
        this.world.level.coins = [];
        this.world.level.coins.push(new Coins(), new Coins(), new Coins(), new Coins());
    }

    /**
     * Resets enemy characters, including chickens and small chickens.
     */
    resetEnemies() {
        const world = this.world; // Use the instance's world
        // Clear intervals and reset all existing enemies
        world.level.enemies.forEach(enemy => {
            enemy.clearAllIntervals();
            enemy.reset();
        });

        // Recreate enemies from scratch
        world.level.enemies = [
            ...createInstances(Chicken, 5),
            ...createInstances(SmallChickens, 10),
            new Endboss(world),
        ];
    }


    resetEndBoss() {
        const world = this.world;
        const endboss = world.endboss;

        if (endboss) {
            endboss.clearAllIntervals(); // Clear any active intervals
            endboss.reset(); // Reset the Endboss's position, health, and state
        } else {
            world.endboss = new Endboss(world); // Create a new Endboss instance
        }

        // Ensure Endboss starts moving immediately after reset
        world.endboss.endBossMovesLeft = true;
        world.endboss.animate();

        // Reset Endboss health bar
        world.endbossHealthBar.setPercentageForEndBoss(100);
    }


    /**
     * Resets cloud objects to their initial state.
     */
    resetClouds() {
        this.world.level.clouds.forEach(cloud => {
            cloud.clearAllIntervals();
            cloud.reset();
        });
    }

    /**
     * Clears all throwable objects like bottles from the game.
     */
    clearThrowableObjects() {
        this.world.clearAllBottleObjects();
    }

    /**
     * Resets the status bars for health, bottles, and coins.
     */
    resetStatusBars() {
        const world = this.world;
        world.statusBar.setPercentage(100);
        world.statusBarForBottle.setPercentageForBottle(0);
        world.coinBar.setPercentageForCoins(0);
    }

    /**
     * Resets the background objects to their initial state.
     */
    resetBackgroundObjects() {
        const world = this.world;
        const imageWidth = 719;
        const repetitions = Math.ceil(world.level.level_end_x / imageWidth) + 1;
        world.level.backgroundObjects = createBackgroundObjects(imageWidth, repetitions);
    }

    /**
     * Resets the camera position to its initial state.
     */
    resetCameraPosition() {
        this.world.camera_x = 0;
    }

    /**
     * Resets and replays game sounds.
     */
    resetGameSounds() {
        const world = this.world;
        if (world.gameSoundActive) {
            world.gameSounds.desert_ambient_sound.currentTime = 0;
            world.gameSounds.background_game_music.currentTime = 0;
            world.gameSounds.playAmbientSounds();
        }
    }

    /**
     * Restarts game loops and reinitializes game drawing.
     */
    restartGameLoops() {
        this.world.world2.run();
    }
}