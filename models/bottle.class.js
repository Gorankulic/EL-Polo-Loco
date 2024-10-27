/**
 * Class representing a bottle object in the game.
 * Extends the MovableObject class.
 */
class Bottle extends MovableObject {
    y = 365;
    height = 50;
    width = 40;

    // Array of image paths for the bottle sprites
    BOTTLE_IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    // Static array to keep track of previous bottle positions
    static previousBottlePositions = [];

    /**
     * Constructs a new Bottle instance and initializes its properties.
     * Randomly selects an image for the bottle and sets its spawn position.
     */
    constructor() {
        super();
        const randomIndex = Math.floor(Math.random() * this.BOTTLE_IMAGES.length);
        const randomImage = this.BOTTLE_IMAGES[randomIndex];

        this.loadImage(randomImage);
        this.x = this.getSpawnX();
        Bottle.previousBottlePositions.push(this.x); // Store the bottle's x position
    }

    /**
     * Calculates the x-coordinate for spawning the bottle, ensuring a minimum distance 
     * between bottles using the getRandomSpawnX method from the MovableObject class.
     * @returns {number} The calculated x-coordinate for the bottle's spawn position.
     */
    getSpawnX() {
        let minX = 600;
        let maxX = 4500;
        let minDistance = 300; // Minimum distance between bottles

        let newX;
        let validPosition = false;

        // Repeat until a valid position is found
        do {
            newX = this.getRandomSpawnX(minX, maxX, minDistance, 'Bottles');
            // Check if the new x position is sufficiently far from all previous bottles
            validPosition = Bottle.previousBottlePositions.every(position => {
                return Math.abs(newX - position) >= minDistance;
            });
        } while (!validPosition);

        return newX;
    }
}