class Character extends MovableObject {
    height = 350;
    width = 150;
    speed = 5;
    offset = {
        right: 55,
        left: 55,
        bottom: 30,
        top: 45
    };
    lastMovedTimestamp = null;
    characterCanJump = true;

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
    gameSounds; // Declare gameSounds
    moveInterval = null;
    animationInterval = null;

    constructor(gameSounds) { // Accept gameSounds object in constructor
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
        this.lastMovedTimestamp = new Date().getTime(); // Set the initial timestamp
        this.animate();

    }

    animate() {
        this.moveInterval = setInterval(() => {
            this.handleMovement();
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            this.handleAnimation();
        }, 1000 / 30);
    }

    handleMovement() {
        // Check for null before calling
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.lastMovedTimestamp = new Date().getTime();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.lastMovedTimestamp = new Date().getTime();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround() && this.characterCanJump) {
            this.jump();
            this.gameSounds.updateJumpSound();
            this.lastMovedTimestamp = new Date().getTime();
        }

        this.world.camera_x = -this.x + 100;

        if (this.y > 75) {
            this.y = 75;
        }
    }

    handleAnimation() {
        if (this.isDead()) {
            this.gameSounds.playCharacterEliminatedSounds();
            this.gameSounds.pauseAmbientSounds();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.gameSounds.playPepeHurtSound(); // Trigger hurt sound
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.isSleeping() && this.world.character.energy > 0) {
            this.playAnimation(this.IMAGES_SLEEPING);
            this.gameSounds.playSleepingSound(); // Play sleeping sound
        } else if (this.isBored()) {
            this.playAnimation(this.IMAGES_IDLE);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            // Only play walking animation and sound if Endboss has energy
            this.playAnimation(this.IMAGES_WALKING);
            this.gameSounds.updateWalkingSound(); // Start walking sound on key down
        } else {
            // Pause walking sound and reset animation if Endboss is defeated
            this.gameSounds.walking_sound.pause();
            this.playAnimation(this.IMAGES_IDLE); // Force idle image to stop flipping
        }
    }


    handleDeath() {
        this.playAnimation(this.IMAGES_DEAD);
        if (this.world.gameSoundActive) {
            this.character_eliminated_sound.play();
            this.pepe_eliminated_sound.play();
            this.you_lost_music.play();
        }
    }

    clearAllIntervals() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
        }
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }

    jump() {
        if (this.characterCanJump) {
            this.speedY = 16;
        }
    }

    secondJump() {
        this.speedY = 15;
    }

    isBored() {
        const currentTime = new Date().getTime();
        return this.lastMovedTimestamp && (currentTime - this.lastMovedTimestamp) > 500;
    }

    isSleeping() {
        const currentTime = new Date().getTime();
        return this.lastMovedTimestamp && (currentTime - this.lastMovedTimestamp) > 5000;
    }

    moveLeft() {
        this.x -= this.speed;
        this.lastDirection = 'left';
    }

    moveRight() {
        this.x += this.speed;
        this.lastDirection = 'right';
    }


}