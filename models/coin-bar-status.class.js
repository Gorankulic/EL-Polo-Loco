class CoinBar extends DrawableObject {
    IMAGES_FOR_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES_FOR_COINS);
        this.setPercentageForCoins(0);
        this.x = 12;
        this.y = 82;
        this.width = 150;
        this.height = 50;
    }
    setPercentageForCoins(percentage) {
        this.percentageForCoins = percentage;
        let path = this.IMAGES_FOR_COINS[this.resolveImageIndexForCoins()];
        this.img = this.imageCache[path];
    }

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