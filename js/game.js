let canvas;
let world;
let keyboard;

function init() {
    keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}