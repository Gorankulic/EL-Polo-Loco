// Define a class named BottleBar that extends the DrawableObject class.
// Definiere eine Klasse namens BottleBar, die die Klasse DrawableObject erweitert.
class BottleBar extends DrawableObject {

    // Create an array of image paths representing the bottle status bar at different fill levels.
    // Erstelle ein Array von Bildpfaden, die den Flaschenstatusbalken bei verschiedenen Füllständen darstellen.
    IMAGES_FOR_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    // Constructor function for creating instances of the BottleBar class.
    // Konstruktorfunktion zur Erstellung von Instanzen der Klasse BottleBar.
    constructor() {
        // Call the constructor of the parent class (DrawableObject) using super().
        // Rufe den Konstruktor der übergeordneten Klasse (DrawableObject) mit super() auf.
        super();

        // Load the images specified in IMAGES_FOR_BOTTLE array.
        // Lade die in IMAGES_FOR_BOTTLE-Array angegebenen Bilder.
        this.loadImages(this.IMAGES_FOR_BOTTLE);

        // Initialize the bottle fill percentage to 0% (completely full).
        // Initialisiere den Füllstand der Flasche auf 0% (vollständig gefüllt).
        this.setPercentageForBottle(0);

        // Define the position and dimensions of the bottle status bar.
        // Definiere die Position und die Abmessungen des Flaschenstatusbalkens.
        this.x = 16; // X-coordinate of the status bar on the canvas.
        this.y = 42; // Y-coordinate of the status bar on the canvas.
        this.width = 150; // Width of the status bar.
        this.height = 50; // Height of the status bar.
    }

    // Function to set the fill percentage of the bottle status bar and update the displayed image.
    // Funktion zur Festlegung des Füllstands des Flaschenstatusbalkens und Aktualisierung des angezeigten Bildes.
    setPercentageForBottle(percentage) {
        // Store the provided percentage value in the instance variable percentageForBottle.
        // Speichere den bereitgestellten Prozentsatzwert in der Instanzvariable percentageForBottle.
        this.percentageForBottle = percentage;

        // Determine the appropriate image path based on the current percentage and update the displayed image accordingly.
        // Ermittle den entsprechenden Bildpfad basierend auf dem aktuellen Prozentsatz und aktualisiere das angezeigte Bild entsprechend.
        let path = this.IMAGES_FOR_BOTTLE[this.resolveImageIndexForBottle()];
        this.img = this.imageCache[path];
    }

    // Function to calculate the index of the image in the IMAGES_FOR_BOTTLE array based on the current percentage.
    // Funktion zur Berechnung des Index des Bildes im Array IMAGES_FOR_BOTTLE basierend auf dem aktuellen Prozentsatz.
    resolveImageIndexForBottle() {
        if (this.percentageForBottle === 100) {
            return 5; // Index 5 corresponds to the image representing a completely full bottle.
            // Index 5 entspricht dem Bild, das eine vollständig gefüllte Flasche darstellt.
        } else if (this.percentageForBottle > 80) {
            return 4; // Index 4 for percentage greater than 80%.
            // Index 4 für Prozentsatz größer als 80%.
        } else if (this.percentageForBottle > 60) {
            return 3; // Index 3 for percentage greater than 60%.
            // Index 3 für Prozentsatz größer als 60%.
        } else if (this.percentageForBottle > 40) {
            return 2; // Index 2 for percentage greater than 40%.
            // Index 2 für Prozentsatz größer als 40%.
        } else if (this.percentageForBottle > 20) {
            return 1; // Index 1 for percentage greater than 20%.
            // Index 1 für Prozentsatz größer als 20%.
        } else {
            return 0; // Index 0 corresponds to the image representing a nearly empty bottle (0-20%).
            // Index 0 entspricht dem Bild, das eine fast leere Flasche (0-20%) darstellt.
        }
    }
}