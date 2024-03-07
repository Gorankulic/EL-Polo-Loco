class Bottle extends MovableObject {

    y = 370;
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
        this.x = 300 + Math.random() * 2000;
    }
}