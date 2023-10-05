// Define a class named Endboss that extends the MovableObject class.
class Endboss extends MovableObject {
    // Define properties specific to the Endboss class.
    height = 400; // Height of the end boss.
    width = 250; // Width of the end boss.
    y = 60; // Initial Y-coordinate of the end boss.

    // Define an array of image paths for the walking animation of the end boss.
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    // Constructor for the Endboss class.
    constructor() {
        // Call the parent class's constructor and load the initial image.
        super().loadImage(this.IMAGES_WALKING[0]);

        // Load all images for the walking animation.
        this.loadImages(this.IMAGES_WALKING);

        // Set the initial X-coordinate of the end boss.
        this.x = 2500;

        // Start the animation loop for the end boss.
        this.animate();
    }

    // Method to animate the end boss by cycling through its walking images.
    animate() {
        // Set up a setInterval to change the displayed image at a certain interval.
        setInterval(() => {
            // Call the playAnimation method to cycle through the walking images.
            this.playAnimation(this.IMAGES_WALKING);
        }, 200); // Change image every 200 milliseconds (5 frames per second).
    }
}