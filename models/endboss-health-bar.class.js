/**
 * Class representing the health bar for the End Boss in the game.
 * Extends the DrawableObject class and displays the End Boss's health status.
 */
class EndBossHealthBar extends DrawableObject {
    // Array of image paths representing the health bar states
    IMAGES_ENDBOSS_HEALTH_BAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /**
     * Constructs the EndBossHealthBar instance, loads the health bar images, 
     * sets the initial position and dimensions, and animates the health bar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSS_HEALTH_BAR);
        this.setPercentageForEndBoss(100);
        this.x = 500;
        this.y = 80;
        this.width = 150;
        this.height = 50;
        this.speed = 140 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Sets the percentage of health for the End Boss and updates the health bar image accordingly.
     * @param {number} percentage - The percentage of the End Boss's health.
     */
    setPercentageForEndBoss(percentage) {
        this.percentageForEndBoss = percentage;
        let path = this.IMAGES_ENDBOSS_HEALTH_BAR[this.resolveImageIndexForEndBoss()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the appropriate index in the health bar image array based on the End Boss's health percentage.
     * @returns {number} The index of the image to display in the health bar.
     */
    resolveImageIndexForEndBoss() {
        if (this.percentageForEndBoss === 100) {
            return 5;
        } else if (this.percentageForEndBoss > 80) {
            return 4;
        } else if (this.percentageForEndBoss > 60) {
            return 3;
        } else if (this.percentageForEndBoss > 40) {
            return 2;
        } else if (this.percentageForEndBoss > 20) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Animates the health bar. Placeholder function for potential animations.
     */
    animate() {
        setInterval(() => {
            // Placeholder for health bar animation logic
        }, 80);
    }

    /**
     * Shows the health bar, making it visible on the screen.
     */
    show() {
        this.visible = true; // Assuming there is a 'visible' property controlling the draw
    }

    /**
     * Hides the health bar, making it invisible on the screen.
     */
    hide() {
        this.visible = false;
    }
}