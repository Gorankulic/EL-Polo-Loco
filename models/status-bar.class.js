/**
 * Class representing the status bar for the character's health.
 * Extends the DrawableObject class to visually represent the character's health in the game.
 */
class StatusBar extends DrawableObject {
    // Array of image paths representing the different states of the health bar
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /**
     * Constructs a StatusBar instance, initializes its position, dimensions, and sets its initial health to 100%.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);

        this.x = 20;
        this.y = 5;
        this.width = 125;
        this.height = 45;
    }

    /**
     * Updates the status bar based on the given health percentage.
     * @param {number} percentage - The current health percentage (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the appropriate image index based on the current health percentage.
     * @returns {number} The index of the image corresponding to the health percentage.
     */
    resolveImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}