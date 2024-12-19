class BottleBar extends DrawableObject {
    IMAGES_FOR_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_FOR_BOTTLE);
        this.setBottleCount(0);
        this.x = 20;
        this.y = 40;
        this.width = 125;
        this.height = 45;
    }

    /**
     * Set the current number of bottles and update the status bar.
     * @param {number} bottleCount - The current number of bottles (0 to 5).
     */
    setBottleCount(bottleCount) {
        let percentage = bottleCount * 20;
        this.setPercentageForBottle(percentage);
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
