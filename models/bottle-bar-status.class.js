class BottleBar extends DrawableObject {
    IMAGES_FOR_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png', // 0% (no bottles)
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png', // 20% (1 bottle)
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png', // 40% (2 bottles)
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png', // 60% (3 bottles)
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png', // 80% (4 bottles)
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png' // 100% (5 bottles)
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_FOR_BOTTLE); // Preload bottle status bar images
        this.setBottleCount(0); // Initialize with 0 bottles
        this.x = 20; // X position on canvas
        this.y = 40; // Y position on canvas
        this.width = 125; // Width of the status bar
        this.height = 45; // Height of the status bar
    }

    /**
     * Set the current number of bottles and update the status bar.
     * @param {number} bottleCount - The current number of bottles (0 to 5).
     */
    setBottleCount(bottleCount) {
        // Convert bottle count (0 to 5) to percentage (0 to 100)
        let percentage = bottleCount * 20;
        this.setPercentageForBottle(percentage); // Update the percentage for the bar
    }

    /**
     * Update the image based on the current percentage of the bottle bar.
     * @param {number} percentage - The current percentage (0 to 100) for the bottle bar.
     */
    setPercentageForBottle(percentage) {
        this.percentageForBottle = percentage;
        let path = this.IMAGES_FOR_BOTTLE[this.resolveImageIndexForBottle()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolve which image should be shown based on the percentage.
     * @returns {number} - The index of the image to display from IMAGES_FOR_BOTTLE array.
     */
    resolveImageIndexForBottle() {
        if (this.percentageForBottle === 100) return 5;
        else if (this.percentageForBottle === 80) return 4;
        else if (this.percentageForBottle === 60) return 3;
        else if (this.percentageForBottle === 40) return 2;
        else if (this.percentageForBottle === 20) return 1;
        else return 0;
    }
}