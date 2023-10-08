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

        this.setPercentageForBottle(0);


        this.x = 16;
        this.y = 42;
        this.width = 150;
        this.height = 50;
    }
    setPercentageForBottle(percentage) {
        this.percentageForBottle = percentage;
        let path = this.IMAGES_FOR_BOTTLE[this.resolveImageIndexForBottle()];
        this.img = this.imageCache[path];
    }

    resolveImageIndexForBottle() {
        if (this.percentageForBottle === 100) {
            return 5;

        } else if (this.percentageForBottle > 80) {
            return 4;

        } else if (this.percentageForBottle > 60) {
            return 3;

        } else if (this.percentageForBottle > 40) {
            return 2;

        } else if (this.percentageForBottle > 20) {
            return 1;

        } else {
            return 0;

        }
    }
}