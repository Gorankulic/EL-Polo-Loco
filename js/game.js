let canvas;
let world;
let keyboard;

function init() {

    keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    // Add the event listener for the restart image
    document.getElementById('restartGameIcon').addEventListener('click', reloadPage);



    document.getElementById('startScreen').style.display = 'none';



}

function reloadPage() {
    location.reload();
}