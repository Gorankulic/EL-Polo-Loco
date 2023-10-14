class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    THROW_REQUEST_STOP = new Date().getTime();
    THROW_REQUEST_START = 0;

    constructor() {
        this.bindKeyPressEvents();
        this.bindBtsPressEvents();
    }

    bindBtsPressEvents() {
        // For the Left button
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        // For the Right button
        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        // For the Jump button
        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true; // Assuming SPACE is used for jump in keyboard controls
        });
        document.getElementById('btnJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });

        // For the Throw button
        document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true; // Assuming D is used for throw in keyboard controls
        });
        document.getElementById('btnThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        });
    }

    bindKeyPressEvents() {
        // Keyboard controls
        window.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                case 37:
                    this.LEFT = true;
                    break;
                case 38:
                    this.UP = true;
                    break;
                case 39:
                    this.RIGHT = true;
                    break;
                case 40:
                    this.DOWN = true;
                    break;
                case 32:
                    this.SPACE = true;
                    break;
                case 68:
                    setTimeout(() => {
                        this.D = true;
                    }, 500);
                    break;
            }
        });

        window.addEventListener("keyup", (e) => {
            switch (e.keyCode) {
                case 37:
                    this.LEFT = false;
                    break;
                case 38:
                    this.UP = false;
                    break;
                case 39:
                    this.RIGHT = false;
                    break;
                case 40:
                    this.DOWN = false;
                    break;
                case 32:
                    this.SPACE = false;
                    break;
                case 68:
                    setTimeout(() => {
                        this.D = false;
                    }, 500);
                    break;
            }
        });
    }
}