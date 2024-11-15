class Coins extends MovableObject {
    y = 320;
    height = 140;
    width = 140;

    COIN_IMAGES = [
        'img/8_coin/coin_1.png'
    ]

    constructor() {
            super().loadImage('img/8_coin/coin_1.png');
            this.loadImages(this.COIN_IMAGES);
            this.x = this.getSpawnX();
            this.y = this.getRandomHeight(); // Set random vertical position

        }
        // Method to calculate the spawn x position with minimum distance from the last chicken
    getSpawnX() {
        // Set the range and minimum distance for spawning coins
        let minX = 800;
        let maxX = 4500;
        let minDistance = 300;

        // Use the method from MovableObject with 'Coins' as the object type
        return this.getRandomSpawnX(minX, maxX, minDistance, 'Coins');
    }
    // Method to calculate a random height for the coin within a specified range
    getRandomHeight() {
    const minY = 10;
    const maxY = 20;
    return Math.random() * (maxY - minY) + minY;
}
}