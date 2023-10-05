// Define a class named Chicken that extends the MovableObject class.
// Definiere eine Klasse namens Chicken, die die Klasse MovableObject erweitert.
class Chicken extends MovableObject {
    // Set the initial y-coordinate, height, and width for the chicken object.
    // Setze die anfängliche y-Koordinate, Höhe und Breite für das Hühnerobjekt.
    y = 370;
    height = 50;
    width = 40;

    // Define an array of image paths for the walking animation of the chicken.
    // Definiere ein Array von Bildpfaden für die Laufanimation des Huhns.
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    // Constructor function for creating instances of the Chicken class.
    // Konstruktorfunktion zur Erstellung von Instanzen der Klasse Chicken.
    constructor() {
        super(); // Call the constructor of the parent class.

        // Load the initial image for the chicken.
        // Lade das anfängliche Bild für das Huhn.
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        // Load images for the walking animation of the chicken.
        // Lade Bilder für die Laufanimation des Huhns.
        this.loadImages(this.IMAGES_WALKING);

        // Set the initial x-coordinate for the chicken with some random variation.
        // Setze die anfängliche x-Koordinate für das Huhn mit einer zufälligen Variation.
        this.x = 300 + Math.random() * 2200;

        // Set the speed of the chicken with some random variation.
        // Setze die Geschwindigkeit des Huhns mit einer zufälligen Variation.
        this.speed = 0.15 + Math.random() * 0.25;

        // Start the chicken's animation.
        // Starte die Animation des Huhns.
        this.animate();
    }

    // Method to handle chicken animations.
    // Methode zur Steuerung der Hühneranimationen.
    animate() {
        // Set up an interval to move the chicken left.
        // Richte ein Intervall ein, um das Huhn nach links zu bewegen.
        setInterval(() => {
            this.moveLeft(); // Move the chicken to the left.
        }, 1000 / 60); // Set the interval to 60 frames per second.

        // Set up another interval to play the walking animation of the chicken.
        // Richte ein weiteres Intervall ein, um die Laufanimation des Huhns abzuspielen.
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING); // Play the walking animation.
        }, 100); // Set the interval for animation updates.
    }
}