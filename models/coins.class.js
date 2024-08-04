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
        }
        // Method to calculate the spawn x position with minimum distance from the last chicken
    getSpawnX() {
        // Minimum x value for spawning
        let minX = 800;
        // Maximum x value for spawning
        let maxX = 2500;
        // Minimum distance between chickens
        let minDistance = 100;

        let newX;
        // Generate a new x position until it meets the minimum distance requirement
        do {
            newX = minX + Math.random() * (maxX - minX);
        } while (Math.abs(newX - Coins.lastX) < minDistance);

        // Update the last chicken's position
        Coins.lastX = newX;
        return newX;
    }
}