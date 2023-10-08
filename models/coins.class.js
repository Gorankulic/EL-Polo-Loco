class Coins extends MovableObject {
    y = 330;
    height = 140;
    width = 140;

    COIN_IMAGES = [
        'img/8_coin/coin_1.png'
    ]

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.COIN_IMAGES);
        this.x = 300 + Math.random() * 2000;
    }
}