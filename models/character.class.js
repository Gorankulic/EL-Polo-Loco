class Character extends MovableObject {
    height = 450;
    width = 200;
    y = -300;
    speed = 10;
    offset = {
        right: 55,
        left: 55,
        bottom: 30,
        top: 45
    };
    lastMovedTimestamp = null;
    character_eliminated_sound = new Audio('audio/endboss eliminated sound.mp3');
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
        'img/2_character_pepe/3_jump/J-39.png',
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
    walking_sound = new Audio('audio/walking.mp3');
    pepe_jump = new Audio('audio/pepe jump.mp3');
    game_over_voice = new Audio('audio/game over voice.mp3');
    pepe_eliminated_sound = new Audio('audio/pepe eliminated sound.mp3');
    you_lost_music = new Audio('audio/game lost.mp3');
    sleeping_sound = new Audio('audio/sleeping sound.mp3');

    constructor() {
        super();
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
        this.character_eliminated_sound.pause();
        this.game_over_voice.pause();
        this.pepe_eliminated_sound.pause();
        this.you_lost_music.pause();
        this.sleeping_sound.pause();
    }

    collectBottle() {
        this.bottleCount++;
    }

    animate() {
        setInterval(() => {
            // Handle movement and sound effects
            this.walking_sound.pause();
            this.pepe_jump.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                if (!this.world.gameSoundActive) {
                    this.walking_sound.pause();
                    this.sleeping_sound.pause();
                }
                if (this.world.gameSoundActive) {
                    this.walking_sound.play();
                }


                this.otherDirection = false;
                this.lastMovedTimestamp = new Date().getTime();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                if (!this.world.gameSoundActive) {
                    this.walking_sound.pause();
                }
                if (this.world.gameSoundActive) {
                    this.walking_sound.play();
                }
                this.otherDirection = true;
                this.lastMovedTimestamp = new Date().getTime();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround() && this.characterCanJump) {
                this.jump();
                if (!this.world.gameSoundActive) {
                    this.pepe_jump.pause();
                    this.sleeping_sound.pause();
                }
                if (this.world.gameSoundActive) {
                    this.pepe_jump.play();
                    this.sleeping_sound.pause();
                }

                this.lastMovedTimestamp = new Date().getTime();
            }

            this.world.camera_x = -this.x + 100;


            if (this.y > -23) {
                // Setze den Charakter auf 300 Pixel auf der y-Achse
                this.y = -24;
            }

        }, 1000 / 60);

        setInterval(() => {
            // Handle animation states

            if (this.isDead()) {
                if (!this.world.gameSoundActive) {
                    this.character_eliminated_sound.pause();
                    this.pepe_eliminated_sound.pause();
                    this.you_lost_music.pause();
                    this.sleeping_sound.pause();
                }
                if (this.world.gameSoundActive) {
                    this.character_eliminated_sound.play();
                    this.pepe_eliminated_sound.play();
                    this.you_lost_music.play();
                    this.sleeping_sound.pause();
                }
                this.playAnimation(this.IMAGES_DEAD);

            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.sleeping_sound.pause();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.sleeping_sound.pause();
            } else if (this.isSleeping()) {
                this.playAnimation(this.IMAGES_SLEEPING);
                this.sleeping_sound.play();

            } else if (this.isBored()) {
                this.playAnimation(this.IMAGES_IDLE);
                this.sleeping_sound.pause();
            } else {
                // Default walking animation if character is moving left or right
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.sleeping_sound.pause();
                }
            }

        }, 50);
    }

    jump() {
        if (characterCanJump == true) {
            this.speedY = 16;
        }

    }
    secondJump() {
        this.speedY = 15; // Initial jump boost



    }
    isBored() {
        const currentTime = new Date().getTime();
        return this.lastMovedTimestamp && (currentTime - this.lastMovedTimestamp) > 500;
    }
    isSleeping() {
            const currentTime = new Date().getTime();
            return this.lastMovedTimestamp && (currentTime - this.lastMovedTimestamp) > 5000;
        }
        // Inside your Character class:
    moveLeft() {
        this.x -= this.speed;
        this.lastDirection = 'left';
    }

    moveRight() {
        this.x += this.speed;
        this.lastDirection = 'right';
    }


}