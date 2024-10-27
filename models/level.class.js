/**
 * Class representing a game level.
 * Contains all elements present in the level, including enemies, coins, bottles, clouds, and background objects.
 */
class Level {
    enemies;
    coins;
    bottle;
    clouds;
    backgroundObjects;
    level_end_x = 5000; // The x-coordinate where the level ends

    /**
     * Constructs a new Level instance with the specified game elements.
     * @param {Array} enemies - An array of enemies present in the level.
     * @param {Array} coins - An array of coins present in the level.
     * @param {Array} bottle - An array of bottles present in the level.
     * @param {Array} clouds - An array of clouds present in the level.
     * @param {Array} backgroundObjects - An array of background objects for the level.
     */
    constructor(enemies, coins, bottle, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.coins = coins;
        this.bottle = bottle;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}