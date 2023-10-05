// Define a class named Coins that extends the MovableObject class.
// Definiere eine Klasse namens Coins, die die Klasse MovableObject erweitert.
class Coins extends MovableObject {
    // Set initial values for the y-coordinate, height, and width of the coin object.
    // Setze Anfangswerte für die y-Koordinate, Höhe und Breite des Münzobjekts.
    y = 330;
    height = 140;
    width = 140;

    // Define an array of image paths for the coin.
    // Definiere ein Array von Bildpfaden für die Münze.
    COIN_IMAGES = [
        'img/8_coin/coin_1.png'
    ]

    // Constructor function for creating instances of the Coins class.
    // Konstruktorfunktion zur Erstellung von Instanzen der Klasse Coins.
    constructor() {
        super().loadImage('img/8_coin/coin_1.png'); // Call the loadImage function of the parent class to load the coin image.
        // Rufe die loadImage-Funktion der Elternklasse auf, um das Münzbild zu laden.

        this.loadImages(this.COIN_IMAGES); // Load additional images for the coin object if needed.
        // Lade zusätzliche Bilder für das Münzobjekt, falls erforderlich.

        this.x = 300 + Math.random() * 2000; // Set the initial x-coordinate of the coin with a random offset.
        // Setze die anfängliche x-Koordinate der Münze mit einer zufälligen Verschiebung.
    }
}