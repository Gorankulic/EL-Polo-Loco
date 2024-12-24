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
        this.bindKeyDownEvents();
        this.bindKeyUpEvents();
    }

    /**
     * Binds keyboard "keydown" events.
     * Sets the appropriate flags and handles key-specific logic.
     */
    bindKeyDownEvents() {
        window.addEventListener("keydown", (e) => {
            if (!world.endBossIsEliminated) {
                this.handleKeyDown(e.keyCode);
            }
        });
    }

    /**
     * Handles the logic for specific keys during the "keydown" event.
     * @param {number} keyCode - The code of the key that was pressed.
     */
    handleKeyDown(keyCode) {
        switch (keyCode) {
            case 37: // Left Arrow
                this.LEFT = true;
                this.lastKeyPressed = 'LEFT';
                break;
            case 39: // Right Arrow
                this.RIGHT = true;
                this.lastKeyPressed = 'RIGHT';
                break;
            case 40: // Down Arrow
                this.DOWN = true;
                break;
            case 32: // Space
                this.SPACE = true;
                break;
            case 68: // D
                this.D = true;
                break;
        }
    }

    /**
     * Binds keyboard "keyup" events.
     * Resets the appropriate flags and handles key-specific logic.
     */
    bindKeyUpEvents() {
        window.addEventListener("keyup", (e) => {
            this.handleKeyUp(e.keyCode);
        });
    }

    /**
     * Handles the logic for specific keys during the "keyup" event.
     * @param {number} keyCode - The code of the key that was released.
     */
    handleKeyUp(keyCode) {
        switch (keyCode) {
            case 37: // Left Arrow
                this.LEFT = false;
                this.simulateAdditionalMovement('LEFT');
                break;
            case 38: // Up Arrow
                this.UP = false;
                break;
            case 39: // Right Arrow
                this.RIGHT = false;
                this.simulateAdditionalMovement('RIGHT');
                break;
            case 40: // Down Arrow
                this.DOWN = false;
                break;
            case 32: // Space
                this.SPACE = false;
                break;
            case 68: // D
                this.D = false;
                break;
        }
    }

    /**
     * Binds button press events for mobile and desktop controls using touch and mouse events.
     * Manages movement, jump, and throw actions through on-screen buttons.
     */
    bindBtsPressEvents() {
        this.bindButtonEvents('btnLeft', 'LEFT');
        this.bindButtonEvents('btnRight', 'RIGHT');
        this.bindButtonEvents('btnJump', 'SPACE');
        this.bindButtonEvents('btnThrow', 'D');
    }

    /**
     * Binds touch and mouse events to a button for a specific action.
     * @param {string} buttonId - The ID of the button element.
     * @param {string} actionFlag - The corresponding action flag to set (e.g., 'LEFT', 'RIGHT', 'SPACE', 'D').
     */
    bindButtonEvents(buttonId, actionFlag) {
        const button = document.getElementById(buttonId);
        if (!button) return;

        button.addEventListener('touchstart', this.handleButtonStart(actionFlag));
        button.addEventListener('touchend', this.handleButtonEnd(actionFlag));
        button.addEventListener('mousedown', this.handleButtonStart(actionFlag));
        button.addEventListener('mouseup', this.handleButtonEnd(actionFlag));
    }

    /**
     * Creates a handler for starting a button action.
     * @param {string} actionFlag - The action flag to set (e.g., 'LEFT', 'RIGHT', 'SPACE', 'D').
     * @returns {Function} A function to handle the start of the action.
     */
    handleButtonStart(actionFlag) {
        return (e) => {
            e.preventDefault();
            this[actionFlag] = true;
        };
    }

    /**
     * Creates a handler for ending a button action.
     * @param {string} actionFlag - The action flag to reset (e.g., 'LEFT', 'RIGHT', 'SPACE', 'D').
     * @returns {Function} A function to handle the end of the action.
     */
    handleButtonEnd(actionFlag) {
        return (e) => {
            e.preventDefault();
            this[actionFlag] = false;
        };
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
                }, 250);
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