let canvas;
let world;
let keyboard;

function init() {

    keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);



    startGame();
    restartTheGame();


}

function restartTheGame() {
    document.getElementById('restartGameIcon').addEventListener('click', reloadPage);

}

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    startAnimations();

}

function reloadPage() {
    location.reload();
}

function startAnimations() {
    world.level.enemies.forEach(enemy => {
        if (enemy instanceof Chicken || enemy instanceof SmallChickens) {
            enemy.animate();
        }
    });
}