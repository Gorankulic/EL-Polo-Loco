class EndBossHealthBar extends DrawableObject {
    IMAGES_ENDBOSS_HEALTH_BAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];
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

    setPercentageForEndBoss(percentage) {
        this.percentageForEndBoss = percentage;
        let path = this.IMAGES_ENDBOSS_HEALTH_BAR[this.resolveImageIndexForEndBoss()];
        this.img = this.imageCache[path];
    }

    resolveImageIndexForEndBoss() {
        if (this.percentageForEndBoss === 100) {
            return 5;

        } else if (this.percentageForEndBoss == 80) {
            return 4;

        } else if (this.percentageForEndBoss == 60) {
            return 3;

        } else if (this.percentageForEndBoss == 40) {
            return 2;

        } else if (this.percentageForEndBoss == 20) {
            return 1;

        } else {
            return 0;

        }
    }

    animate() {
        setInterval(() => {

        }, 80);

    }
    show() {
        this.visible = true; // Assuming there is a 'visible' property controlling the draw
    }

    hide() {
        this.visible = false;
    }




}