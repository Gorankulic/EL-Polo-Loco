class Coins extends MovableObject {
    y = 20;
    height = 140;
    width = 140;

    COIN_IMAGES = [
        'img/8_coin/coin_1.png'
    ]

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.COIN_IMAGES);
        this.x = this.getSpawnX();
    }
    getSpawnX() {
        let minX = 800;
        let maxX = 4500;
        let minDistance = 300;
        return this.getRandomSpawnX(minX, maxX, minDistance, 'Coins');
    }
}