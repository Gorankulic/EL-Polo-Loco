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
        // Common function to handle both touch and mouse events
        const handleStart = (buttonFlag) => {
            return (e) => {
                e.preventDefault();
                this[buttonFlag] = true;
            };
        };

        const handleEnd = (buttonFlag) => {
            return (e) => {
                e.preventDefault();
                this[buttonFlag] = false;
            };
        };

        // Bind for Left button
        const btnLeft = document.getElementById('btnLeft');
        btnLeft.addEventListener('touchstart', handleStart('LEFT'));
        btnLeft.addEventListener('touchend', handleEnd('LEFT'));
        btnLeft.addEventListener('mousedown', handleStart('LEFT'));
        btnLeft.addEventListener('mouseup', handleEnd('LEFT'));

        // Bind for Right button
        const btnRight = document.getElementById('btnRight');
        btnRight.addEventListener('touchstart', handleStart('RIGHT'));
        btnRight.addEventListener('touchend', handleEnd('RIGHT'));
        btnRight.addEventListener('mousedown', handleStart('RIGHT'));
        btnRight.addEventListener('mouseup', handleEnd('RIGHT'));

        // Bind for Jump button
        const btnJump = document.getElementById('btnJump');
        btnJump.addEventListener('touchstart', handleStart('SPACE'));
        btnJump.addEventListener('touchend', handleEnd('SPACE'));
        btnJump.addEventListener('mousedown', handleStart('SPACE'));
        btnJump.addEventListener('mouseup', handleEnd('SPACE'));

        // Bind for Throw button
        const btnThrow = document.getElementById('btnThrow');
        btnThrow.addEventListener('touchstart', handleStart('D'));
        btnThrow.addEventListener('touchend', handleEnd('D'));
        btnThrow.addEventListener('mousedown', handleStart('D'));
        btnThrow.addEventListener('mouseup', handleEnd('D'));
    }

    bindKeyPressEvents() {
        window.addEventListener("keydown", (e) => {
            if (!world.endBossIsEliminated) {
                switch (e.keyCode) {
                    case 37: // Left arrow key
                        this.LEFT = true;
                        this.lastKeyPressed = 'LEFT';

                        break;
                    case 39: // Right arrow key
                        this.RIGHT = true;
                        this.lastKeyPressed = 'RIGHT';

                        break;
                    case 40: // Down arrow key
                        this.DOWN = true;
                        break;
                    case 32: // Space key (jump)
                        this.SPACE = true;
                        break;
                    case 68: // 'D' key (throw action)
                        this.D = true;
                        break;
                }
            }
        });



        window.addEventListener("keyup", (e) => {
            switch (e.keyCode) {
                case 37: // Left arrow key
                    this.LEFT = false;
                    this.simulateAdditionalMovement('LEFT');
                    break;
                case 38:
                    this.UP = false;
                    break;
                case 39: // Right arrow key
                    this.RIGHT = false;
                    this.simulateAdditionalMovement('RIGHT');
                    break;
                    // Add cases for UP, DOWN, SPACE, D as needed
                case 40:
                    this.DOWN = false;
                    break;
                case 32:
                    this.SPACE = false;
                    break;
                case 68:
                    this.D = false;
                    break;
            }

        });
    }
    simulateAdditionalMovement(direction) {
        // Ensure the direction is either LEFT or RIGHT to proceed
        if (direction === 'LEFT' || direction === 'RIGHT') {
            setTimeout(() => {
                this[direction] = true;
                setTimeout(() => {
                    this[direction] = false;
                }, 250); // Continue movement for 150 ms
            }, 0); // Immediate timeout to allow for the keyup event to process
        }
    }
    detachEvents() {
        window.removeEventListener('keydown', this.keyDown);
        window.removeEventListener('keyup', this.keyUp);
    }



}
0