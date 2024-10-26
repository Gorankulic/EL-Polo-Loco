class Level {
    enemies;
    coins;
    bottle;
    clouds;
    backgroundObjects;
    level_end_x = 5000;

    constructor(enemies, coins, bottle, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.coins = coins;
        this.bottle = bottle;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}