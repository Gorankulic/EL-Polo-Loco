class restartButton extends DrawableObject {
    RESTART_GAME_ICON = [
        `img/icons/refresh-icon.png`
    ];

    constructor() {
        super();
        this.loadImage(this.RESTART_GAME_ICON);
        this.x = 335;
        this.y = 430;
        this.width = 50;
        this.height = 50;


    }


}