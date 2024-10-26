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

    getSpawnX() {
        // Set the range and minimum distance for spawning bottles
        let minX = 800;
        let maxX = 2500;
        let minDistance = 100; // Minimum distance between bottles

        // Use the method from MovableObject with 'Bottles' as the object type
        return this.getRandomSpawnX(minX, maxX, minDistance, 'Bottles');
    }
}