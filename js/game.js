let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My character is', world.character);
}


window.addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {
        // Left arrow key (keyCode 37)
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        // Up arrow key (keyCode 38)
        keyboard.UP = true;
    }
    if (e.keyCode == 39) {
        // Right arrow key (keyCode 39)
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 40) {
        // Down arrow key (keyCode 40)
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        // Space key (keyCode 32)
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        // Space key (keyCode 32)
        keyboard.D = true;
    }

});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 37) {
        // Left arrow key released
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        // Up arrow key released
        keyboard.UP = false;
    }
    if (e.keyCode == 39) {
        // Right arrow key released
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 40) {
        // Down arrow key released
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        // Space key released
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        // Space key (keyCode 32)
        keyboard.D = false;
    }

});




//doso sam do 17 videa dio matematika