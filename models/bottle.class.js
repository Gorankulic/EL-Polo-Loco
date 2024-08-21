class Bottle extends MovableObject {

    y = 365;
    height = 50;
    width = 40;

    BOTTLE_IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    constructor() {
        super();
        const randomIndex = Math.floor(Math.random() * this.BOTTLE_IMAGES.length);
        const randomImage = this.BOTTLE_IMAGES[randomIndex];

        this.loadImage(randomImage);
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
        } while (Math.abs(newX - Bottle.lastX) < minDistance);

        // Update the last chicken's position
        Bottle.lastX = newX;
        return newX;
    }
}