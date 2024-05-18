class restartButton extends DrawableObject {
    RESTART_GAME_ICON = [
        `img/icons/refresh-icon.png`
    ];

    constructor() {
        super();
        this.loadImage(this.RESTART_GAME_ICON);
        this.x = 0;
        this.y = 0;
        this.width = 50;
        this.height = 50;


    }


}