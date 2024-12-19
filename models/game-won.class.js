/**
 * Class representing the game screen shown when the user wins the game.
 * Extends the DrawableObject class to display the victory screen.
 */
class endGameUserWonGameScreenPicture extends DrawableObject {
    END_SCREEN_IMAGE = [
        `img/9_intro_outro_screens/game_over/game over.png`
    ];

    RESTART_GAME_ICON = {
        x: 310,
        y: 380,
        width: 50,
        height: 50
    };

    /**
     * Constructs an endGameUserWonGameScreenPicture instance, sets its image, position, and dimensions.
     */
    constructor() {
        super();
        this.loadImage(this.END_SCREEN_IMAGE);
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }
}