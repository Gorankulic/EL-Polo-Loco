// Define a class named Bottle that extends the MovableObject class.
// Definiere eine Klasse namens Bottle, die die Klasse MovableObject erweitert.
class Bottle extends MovableObject {
    // Set the initial y-coordinate, height, and width for the bottle object.
    // Setze die anfängliche y-Koordinate, Höhe und Breite für das Flaschenobjekt.
    y = 370;
    height = 50;
    width = 40;

    // Define an array of image paths for the bottle.
    // Definiere ein Array von Bildpfaden für die Flasche.
    BOTTLE_IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    // Constructor function for creating instances of the Bottle class.
    // Konstruktorfunktion zur Erstellung von Instanzen der Klasse Bottle.
    constructor() {
        super(); // Call the constructor of the parent class.

        // Randomly select an image path from BOTTLE_IMAGES.
        // Wähle zufällig einen Bildpfad aus BOTTLE_IMAGES aus.
        const randomIndex = Math.floor(Math.random() * this.BOTTLE_IMAGES.length);
        const randomImage = this.BOTTLE_IMAGES[randomIndex];

        // Load the selected image for the bottle.
        // Lade das ausgewählte Bild für die Flasche.
        this.loadImage(randomImage);

        // Set the initial x-coordinate of the bottle object to a random position on the canvas.
        // Setze die anfängliche x-Koordinate des Flaschenobjekts auf eine zufällige Position auf der Leinwand.
        this.x = 300 + Math.random() * 2000;
    }
}