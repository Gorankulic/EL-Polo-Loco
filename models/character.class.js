/**
 * Class representing the main character (Pepe) in the game.
 * Extends the MovableObject class and includes methods for movement, animation, and interactions.
 */
class Character extends MovableObject {
    height = 350;
    width = 150;
    speed = 5;
    offset = {
        right: 55,
        left: 55,
        bottom: 30,
        top: 155
    };
    lastMovedTimestamp = null;
    characterCanJump = true;

    // Image arrays for different character animations
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world;
    gameSounds;
    moveInterval = null;
    animationInterval = null;

    /**
     * Constructs a Character instance and initializes its properties and animations.
     * @param {Object} gameSounds - The gameSounds object for handling sound effects.
     */
    constructor(gameSounds) {
        super();
        this.gameSounds = gameSounds;
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEPING);
        this.bottleCount = 0;
        this.coinCount = 0;
        this.applyGravity();
        this.lastMovedTimestamp = new Date().getTime();
        this.animate();
    }

    /**
     * Handles the character's movement and updates the camera position accordingly.
     */
    handleMovement() {
        this.handleHorizontalMovement();
        this.handleJumping();
        this.updateCameraPosition();
        this.restrictVerticalPosition();
    }

    /**
     * Handles the horizontal movement of the character (left and right).
     */
    handleHorizontalMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.gameSounds.sleeping_sound.pause();
            this.otherDirection = false;
            this.updateLastMovedTimestamp();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.gameSounds.sleeping_sound.pause();
            this.otherDirection = true;
            this.updateLastMovedTimestamp();
        }
    }

    /**
     * Handles the jumping logic for the character.
     */
    handleJumping() {
        if (this.world.keyboard.SPACE && !this.isAboveGround() && this.characterCanJump) {
            this.jump();
            this.gameSounds.sleeping_sound.pause();
            this.gameSounds.updateJumpSound();
            this.updateLastMovedTimestamp();
        }
    }

    /**
     * Updates the camera position based on the character's position.
     */
    updateCameraPosition() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Restricts the vertical position of the character to a maximum of 75.
     */
    restrictVerticalPosition() {
        if (this.y > 75) {
            this.y = 75;
        }
    }

    /**
     * Updates the timestamp of the last movement.
     */
    updateLastMovedTimestamp() {
        this.lastMovedTimestamp = new Date().getTime();
    }


    /**
     * Handles the character's animation based on its state (e.g., walking, jumping, idle, hurt, dead).
     */
    handleAnimation() {
        if (this.isDead()) {
            this.gameSounds.playCharacterEliminatedSounds();
            this.gameSounds.pauseAmbientSounds();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.gameSounds.playPepeHurtSound();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.gameSounds.sleeping_sound.pause();

        } else if (this.isSleeping() && this.world.character.energy > 0) {
            this.playAnimation(this.IMAGES_SLEEPING);
            this.gameSounds.playSleepingSound();
        } else if (this.isBored()) {
            this.playAnimation(this.IMAGES_IDLE);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.gameSounds.updateWalkingSound();
        } else {
            this.gameSounds.walking_sound.pause();
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Handles the character's animations and intervals for movement.
     */
    animate() {
        this.moveInterval = setInterval(() => {
            this.handleMovement();
        }, 500 / 20);

        this.animationInterval = setInterval(() => {
            this.handleAnimation();
        }, 500 / 10);
    }

    /**
     * Plays the death animation when the character dies.
     */
    handleDeath() {
        this.playAnimation(this.IMAGES_DEAD);
        if (this.world.gameSoundActive) {
            this.character_eliminated_sound.play();
            this.pepe_eliminated_sound.play();
            this.you_lost_music.play();
        }
    }

    /**
     * Clears all intervals associated with the character to stop movement and animations.
     */
    clearAllIntervals() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
        }
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }

    /**
     * Makes the character jump if allowed.
     */
    jump() {
        if (this.characterCanJump) {
            this.speedY = 16;
        }
    }

    /**
     * Makes the character perform a second jump with reduced speed.
     */
    secondJump() {
        this.speedY = 15;
    }

    /**
     * Checks if the character is bored based on inactivity time.
     * @returns {boolean} True if the character is bored, otherwise false.
     */
    isBored() {
        const currentTime = new Date().getTime();
        return this.lastMovedTimestamp && (currentTime - this.lastMovedTimestamp) > 500;
    }

    /**
     * Checks if the character is sleeping based on inactivity time.
     * @returns {boolean} True if the character is sleeping, otherwise false.
     */
    isSleeping() {
        const currentTime = new Date().getTime();
        return this.lastMovedTimestamp && (currentTime - this.lastMovedTimestamp) > 5000;
    }

    /**
     * Moves the character to the left.
     */
    moveLeft() {
        this.x -= this.speed;
        this.lastDirection = 'left';
    }

    /**
     * Moves the character to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.lastDirection = 'right';
    }
    reset() {
        // Reset character's properties
        this.characterCanJump = true;
        this.energy = 100; // Reset energy to full (or initial value)
        this.bottleCount = 0; // Reset the number of bottles
        this.coinCount = 0; // Reset the number of coins
        this.x = 0; // Reset position (example starting x-coordinate)
        this.y = 75; // Reset position (example starting y-coordinate)
        this.speedY = 0; // Reset vertical speed
        this.lastMovedTimestamp = new Date().getTime(); // Reset activity timestamp
        this.speed = 5;

        // Restart animations and gravity
        this.applyGravity();
        this.animate();
        this.handleAnimation();
    }


}