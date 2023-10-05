class BackgroundObject extends MovableObject {
    width = 720; // Width of the background object (Breite des Hintergrundobjekts).
    height = 480; // Height of the background object (Höhe des Hintergrundobjekts).

    constructor(imagePath, x) {
        super().loadImage(imagePath); // Call the loadImage method from the superclass to load the background image (Rufe die loadImage-Methode aus der Superklasse auf, um das Hintergrundbild zu laden).
        this.x = x; // Set the x-coordinate of the background object (Setze die x-Koordinate des Hintergrundobjekts).
        this.y = 480 - this.height; // Calculate the y-coordinate based on the height of the canvas and the height of the background object (Berechne die y-Koordinate basierend auf der Höhe der Leinwand und der Höhe des Hintergrundobjekts).
    }
}