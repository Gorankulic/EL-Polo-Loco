// Define a class named Level.
class Level {
    // Define properties to store different game elements.
    enemies; // Speichert Feindobjekte.
    coins; // Speichert Münzobjekte.
    bottle; // Speichert Flaschenobjekte.
    clouds; // Speichert Wolkenobjekte.
    backgroundObjects; // Speichert Hintergrundobjekte.
    level_end_x = 2200; // Stellt den Endpunkt (x-Koordinate) des Levels dar.

    // The constructor initializes the properties with the provided game elements.
    // Der Konstruktor initialisiert die Eigenschaften mit den bereitgestellten Spielelementen.
    constructor(enemies, coins, bottle, clouds, backgroundObjects) {
        this.enemies = enemies; // Initialisiere Feinde.
        this.coins = coins; // Initialisiere Münzen.
        this.bottle = bottle; // Initialisiere Flaschen.
        this.clouds = clouds; // Initialisiere Wolken.
        this.backgroundObjects = backgroundObjects; // Initialisiere Hintergrundobjekte.
    }
}