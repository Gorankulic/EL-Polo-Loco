/**
 * Class representing the end game screen when the player loses the game.
 * Extends the DrawableObject class to display the game over image and restart button.
 */
class endGameLooseScreenPicture extends DrawableObject {
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

        this.RESTART_GAME_ICON = {
            x: 310, 
            y: 380, 
            width: 50, 
            height: 50 
        };
    }
}