/**
 * Class representing the Coin Bar in the game.
 * Extends the DrawableObject class.
 * Displays the status of how many coins the player has collected.
 */
class CoinBar extends DrawableObject {
    // Array of image paths for the different states of the coin bar
    IMAGES_FOR_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * Constructs a new CoinBar instance, initializes the image cache,
     * sets the default percentage of coins collected to 0, and defines the
     * position and size of the CoinBar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_FOR_COINS);
        this.setPercentageForCoins(0);
        this.x = 20;
        this.y = 75;
        this.width = 125;
        this.height = 45;
    }

    /**
     * Sets the percentage of coins collected and updates the CoinBar image accordingly.
     * @param {number} percentage - The percentage of coins collected by the player.
     */
    setPercentageForCoins(percentage) {
        this.percentageForCoins = percentage;
        let path = this.IMAGES_FOR_COINS[this.resolveImageIndexForCoins()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the appropriate index in the image array based on the percentage of coins collected.
     * @returns {number} The index of the image to display in the CoinBar.
     */
    resolveImageIndexForCoins() {
        if (this.percentageForCoins === 100 || this.percentageForCoins >= 100) {
            return 5;
        } else if (this.percentageForCoins > 80) {
            return 4;
        } else if (this.percentageForCoins > 60) {
            return 3;
        } else if (this.percentageForCoins > 40) {
            return 2;
        } else if (this.percentageForCoins > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}