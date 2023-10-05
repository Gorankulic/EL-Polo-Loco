// Define a class named Cloud that extends the MovableObject class.
// Definiere eine Klasse namens Cloud, die die Klasse MovableObject erweitert.
class Cloud extends MovableObject {
    // Set the initial y-coordinate, height, and width for the cloud object.
    // Setze die anfängliche y-Koordinate, Höhe und Breite für das Wolkenobjekt.
    y = 10;
    height = 250;
    width = 450;

    // Constructor function for creating instances of the Cloud class.
    // Konstruktorfunktion zur Erstellung von Instanzen der Klasse Cloud.
    constructor() {
        super(); // Call the constructor of the parent class.

        // Load multiple images for the cloud to create animation effect.
        // Lade mehrere Bilder für die Wolke, um einen Animations-Effekt zu erzeugen.
        this.loadImage(
            'img/5_background/layers/4_clouds/1.png',
            'img/5_background/layers/4_clouds/2.png'
        );

        // Set the initial x-coordinate for the cloud with some random variation.
        // Setze die anfängliche x-Koordinate für die Wolke mit einer zufälligen Variation.
        this.x = Math.random() * 3000;

        // Set the initial y-coordinate for the cloud with some random variation.
        // Setze die anfängliche y-Koordinate für die Wolke mit einer zufälligen Variation.
        this.y = Math.random() * 30;

        // Start the cloud's animation.
        // Starte die Animation der Wolke.
        this.animate();
    }

    // Method to handle cloud animations.
    // Methode zur Steuerung der Wolkenanimationen.
    animate() {
        // Set up an interval to move the cloud left, creating a scrolling effect.
        // Richte ein Intervall ein, um die Wolke nach links zu bewegen und einen Scroll-Effekt zu erzeugen.
        this.moveLeft();
    }

    // Method to move the cloud to the left.
    // Methode zum Bewegen der Wolke nach links.
    moveLeft() {
        // Set up an interval to gradually decrease the x-coordinate of the cloud.
        // Richte ein Intervall ein, um die x-Koordinate der Wolke allmählich zu verringern.
        setInterval(() => {
            this.x -= 0.055; // Adjust the x-coordinate for leftward movement.
        }, 1000 / 60); // Set the interval to 60 frames per second.
    }
}