class StatusBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

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
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_FOR_BOTTLE);
        this.setPercentage(100); //this is for health

        this.x = 30;
        this.y = 10;
        this.width = 200;
        this.height = 60;


    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    setPercentageForBottle(percentage) {
        this.percentageForBottle = percentage;
        let path = this.IMAGES_FOR_BOTTLE[this.resolveImageIndexForBottle()];
        this.img = this.imageCache[path];
    }
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

    resolveImageIndexForBottle() {
        if (this.percentageforbottle === 100) {
            return 5;
        } else if (this.percentageforbottle > 80) {
            return 4;
        } else if (this.percentageforbottle > 60) {
            return 3;
        } else if (this.percentageforbottle > 40) {
            return 2;
        } else if (this.percentageforbottle > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}