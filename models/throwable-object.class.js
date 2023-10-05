class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');

        this.x = x; // Horizontal position (Horizontale Position).
        this.y = y; // Vertical position (Vertikale Position).
        this.height = 60; // Height of the throwable object (Höhe des werfbaren Objekts).
        this.width = 50; // Width of the throwable object (Breite des werfbaren Objekts).
        this.throw(); // Call the throw method to initiate throwing (Rufen Sie die Methode "throw" auf, um das Werfen zu initiieren).
    }

    throw () {
        this.speedY = 15; // Set the vertical speed for throwing (Setzen Sie die vertikale Geschwindigkeit für das Werfen).
        this.applyGravity(); // Apply gravity to the throwable object (Schwerkraft auf das werfbare Objekt anwenden).
        setInterval(() => {
            this.x += 1; // Move the throwable object horizontally (Bewegen Sie das werfbare Objekt horizontal).
        }, 5); // Interval for horizontal movement (Intervall für die horizontale Bewegung).
    }
}