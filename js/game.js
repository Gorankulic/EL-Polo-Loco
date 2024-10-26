let canvas;
let world;
let keyboard;

function init() {
    keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    // Assuming you have a Character instance available through the world object
    const character = world.character;
    const walkingFrames = character.IMAGES_WALKING;

    // Create the FaviconAnimator instance
    const faviconAnimator = new FaviconAnimator(walkingFrames); // Set to 16ms for max frame rate (60 FPS)

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
    world.endGameRoutine();
}

function startAnimations() {
    world.level.enemies.forEach(enemy => {
        if (enemy instanceof Chicken || enemy instanceof SmallChickens) {
            enemy.animate();
        }
    });
}