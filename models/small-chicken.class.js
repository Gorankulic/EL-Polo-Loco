class SmallChickens extends MovableObject {
    y = 370; // Initial vertical position (Anfangsvertikale Position).
    height = 50; // Height of the small chicken (Höhe des kleinen Huhns).
    width = 40; // Width of the small chicken (Breite des kleinen Huhns).

    // Array of images for the running animation of the small chicken (Array von Bildern für die Laufanimation des kleinen Huhns).
    RUNNING_IMAGES_FOR_SMALL_CHICKEN = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png'); // Load the initial image (Lade das anfängliche Bild).

        this.loadImages(this.RUNNING_IMAGES_FOR_SMALL_CHICKEN); // Load the running animation images (Lade die Bilder der Laufanimation).

        this.x = 300 + Math.random() * 2200; // Set the initial horizontal position randomly (Setze die anfängliche horizontale Position zufällig).
        this.speed = 0.15 + Math.random() * 0.25; // Set a random speed for the small chicken (Setze eine zufällige Geschwindigkeit für das kleine Huhn).
        this.animate();
    }

    animate() {
        // Move the small chicken to the left at a regular interval (Bewege das kleine Huhn in regelmäßigen Abständen nach links).
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        // Play the running animation of the small chicken (Spiele die Laufanimation des kleinen Huhns).
        setInterval(() => {
            this.playAnimation(this.RUNNING_IMAGES_FOR_SMALL_CHICKEN);
        }, 100);
    }
}