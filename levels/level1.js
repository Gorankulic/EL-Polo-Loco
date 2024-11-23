/**
 * Generates background objects dynamically based on image width and repetitions.
 * @param {number} imageWidth - The width of each background image segment.
 * @param {number} repetitions - The number of repetitions needed to fill the level.
 * @returns {BackgroundObject[]} An array of BackgroundObject instances.
 */
function createBackgroundObjects(imageWidth, repetitions) {
    const backgroundObjects = [];

    // Start at -imageWidth to ensure the background extends before the visible area
    for (let i = -1; i <= repetitions; i++) {
        // Alternate groups based on the index pattern
        if (i % 2 === 0) {
            // Group with variation 2
            backgroundObjects.push(
                new BackgroundObject('img/5_background/layers/air.png', i * imageWidth),
                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', i * imageWidth),
                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', i * imageWidth),
                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', i * imageWidth)
            );
        } else {
            // Group with variation 1
            backgroundObjects.push(
                new BackgroundObject('img/5_background/layers/air.png', i * imageWidth),
                new BackgroundObject('img/5_background/layers/3_third_layer/1.png', i * imageWidth),
                new BackgroundObject('img/5_background/layers/2_second_layer/1.png', i * imageWidth),
                new BackgroundObject('img/5_background/layers/2_second_layer/1.png', i * imageWidth),
                new BackgroundObject('img/5_background/layers/1_first_layer/1.png', i * imageWidth)
            );
        }
    }

    return backgroundObjects;
}

// Set up constants for image width and level end x position
const imageWidth = 719;
const levelEndX = 5000;
const repetitions = Math.ceil(levelEndX / imageWidth) + 1; // Add one extra repetition to cover the end

// Generate the background objects
const backgroundObjects = createBackgroundObjects(imageWidth, repetitions);

/**
 * Helper function to create multiple instances of a given class.
 * @param {Function} classType - The class type to instantiate.
 * @param {number} count - The number of instances to create.
 * @returns {Object[]} An array of classType instances.
 */
function createInstances(classType, count) {
    return Array.from({ length: count }, () => new classType());
}

// Instantiate the level with all elements
const level1 = new Level(
    [
        ...createInstances(Chicken, 5),
        ...createInstances(SmallChickens, 10),
        new Endboss()
    ],
    createInstances(Coins, 4),
    createInstances(Bottle, 10),
    createInstances(Cloud, 20),
    backgroundObjects // Pass the dynamically generated background objects
);