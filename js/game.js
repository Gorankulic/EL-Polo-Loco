let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas'); // Get a reference to the canvas element (Holen Sie sich eine Referenz zum Canvas-Element).
    world = new World(canvas, keyboard); // Create a new World instance with the canvas and keyboard (Erstellen Sie eine neue World-Instanz mit dem Canvas und der Tastatur).
}

// Event listener for keydown (Ereignislistener für Tastendruck).
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {
        // Left arrow key pressed (Linke Pfeiltaste gedrückt).
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        // Up arrow key pressed (Obere Pfeiltaste gedrückt).
        keyboard.UP = true;
    }
    if (e.keyCode == 39) {
        // Right arrow key pressed (Rechte Pfeiltaste gedrückt).
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 40) {
        // Down arrow key pressed (Untere Pfeiltaste gedrückt).
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        // Space key pressed (Leertaste gedrückt).
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        // D key pressed (Taste D gedrückt).
        keyboard.D = true;
    }
});

// Event listener for keyup (Ereignislistener für Tastenfreigabe).
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 37) {
        // Left arrow key released (Linke Pfeiltaste losgelassen).
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        // Up arrow key released (Obere Pfeiltaste losgelassen).
        keyboard.UP = false;
    }
    if (e.keyCode == 39) {
        // Right arrow key released (Rechte Pfeiltaste losgelassen).
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 40) {
        // Down arrow key released (Untere Pfeiltaste losgelassen).
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        // Space key released (Leertaste losgelassen).
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        // D key released (Taste D losgelassen).
        keyboard.D = false;
    }
});