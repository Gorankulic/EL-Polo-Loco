/**
 * Class representing the keyboard controls and button events for the game.
 * Manages both keyboard and button press events, including touch and mouse events for mobile and desktop compatibility.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    THROW_REQUEST_STOP = new Date().getTime();
    THROW_REQUEST_START = 0;

    /**
     * Constructs a Keyboard instance, binding key and button events for user input.
     */
    constructor() {
        this.bindKeyPressEvents();
        this.bindBtsPressEvents();
    }

    /**
     * Binds keyboard events for key press and release actions.
     * Handles movement, jump, and throw actions when the corresponding keys are pressed or released.
     */
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
                case 38: // Up arrow key
                    this.UP = false;
                    break;
                case 39: // Right arrow key
                    this.RIGHT = false;
                    this.simulateAdditionalMovement('RIGHT');
                    break;
                case 40: // Down arrow key
                    this.DOWN = false;
                    break;
                case 32: // Space key (jump)
                    this.SPACE = false;
                    break;
                case 68: // 'D' key (throw action)
                    this.D = false;
                    break;
            }
        });
    }

    /**
     * Binds button press events for mobile and desktop controls using touch and mouse events.
     * Manages movement, jump, and throw actions through on-screen buttons.
     */
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

    /**
     * Simulates additional movement for a short duration when a key is released.
     * @param {string} direction - The direction ('LEFT' or 'RIGHT') to simulate movement.
     */
    simulateAdditionalMovement(direction) {
        if (direction === 'LEFT' || direction === 'RIGHT') {
            setTimeout(() => {
                this[direction] = true;
                setTimeout(() => {
                    this[direction] = false;
                }, 250); // Continue movement for 250 ms
            }, 0);
        }
    }

    /**
     * Detaches all key press events, useful for resetting or stopping controls.
     */
    detachEvents() {
        window.removeEventListener('keydown', this.keyDown);
        window.removeEventListener('keyup', this.keyUp);
    }
}