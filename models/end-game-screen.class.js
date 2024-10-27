/**
 * Class representing the end game screen when the player loses the game.
 * Extends the DrawableObject class to display the game over image and restart button.
 */
class endGameLooseScreenPicture extends DrawableObject {
    // Array containing the path to the end game screen image
    END_SCREEN_IMAGE = [
        `img/9_intro_outro_screens/game_over/oh no you lost!.png`
    ];

    /**
     * Constructs the endGameLooseScreenPicture instance, initializes properties, and loads the image.
     * Sets the position and dimensions of the game over screen and the restart game icon.
     */
    constructor() {
        super();
        this.loadImage(this.END_SCREEN_IMAGE);
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;

        // Coordinates and dimensions for the restart game icon
        this.RESTART_GAME_ICON = {
            x: 310, // X coordinate for the button
            y: 380, // Y coordinate for the button
            width: 50, // Width of the button
            height: 50 // Height of the button
        };
    }
}