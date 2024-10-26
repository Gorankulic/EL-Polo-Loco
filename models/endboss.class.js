class Endboss extends MovableObject {
    height = 400;
    width = 300;
    y = 40;
    endBossMovesLeft = false;
    endBossAttacking = false;
    endBossGotHit = false;
    gameSounds = new GameSound(); // Create GameSound instance here
    offset = {
        right: 55,
        left: 155,
        bottom: 30,
        top: 200
    };
    endboss_got_eliminated = new Audio('audio/endboss eliminated sound.mp3');

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ENDBOSS_RUNNING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ENBOSS_ALERTED = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ENDBOSS_ATTACKING = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_ENDBOSS_HIT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_BOSS_ELIMINATED = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    moveInterval = null; // Track movement interval
    animationInterval = null; // Track animation interval
    gameSounds = new GameSound(); // Instance of GameSound class

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_ENDBOSS_RUNNING);
        this.loadImages(this.IMAGES_ENDBOSS_ATTACKING);
        this.loadImages(this.IMAGES_ENDBOSS_HIT);
        this.loadImages(this.IMAGES_BOSS_ELIMINATED);
        this.x = 5000;
        this.speed = 7 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        this.moveInterval = setInterval(() => {
            if (this.endBossIsDead()) {
                this.endBossIsEliminatedAnimation();
                this.gameSounds.background_game_music.pause();

                // Check if game sounds are active before playing the endboss eliminated sound
                if (world.gameSoundActive) {
                    this.endboss_got_eliminated.play();
                } else if (!world.gameSoundActive) {
                    this.endboss_got_eliminated.pause();
                }
            } else if (this.endBossGotHit) {
                this.endBossGotHitAnimation(); // Prioritize hit animation
            } else if (this.endBossAttacking) {
                this.endBossAttackingAnimation();
            } else if (this.endBossMovesLeft && !this.endBossGotHit) {
                this.endBossRunningAnimation();
            }
        }, 100); // Keep the normal interval for general animation
    }


    endBossGotHitAnimation() {
        if (this.endBossGotHit) {
            this.playAnimation(this.IMAGES_ENDBOSS_HIT); // Play hit animation
            this.speed = 0; // Stop movement when hit

            // Delay resetting `endBossGotHit` for a longer hit animation
            setTimeout(() => {
                this.endBossGotHit = false; // Reset hit flag after the delay
                this.speed = 7 + Math.random() * 0.25; // Reset speed after hit
            }, 500); // Increase delay to 1 second to make the hit animation last longer
        }
    }


    endBossIsEliminatedAnimation() {
        this.speed = 0;
        this.playAnimation(this.IMAGES_BOSS_ELIMINATED);

    }




    endBossAttackingAnimation() {
        this.playAnimation(this.IMAGES_ENDBOSS_ATTACKING);
        this.jump(); // Endboss jumps during attack
        setTimeout(() => {
            this.endBossAttacking = false;
            this.speed = 7 + Math.random() * 0.25; // Reset speed after attack
        }, 500); // Delay for attack animation
    }

    endBossRunningAnimation() {
        this.moveLeft();
        this.playAnimation(this.IMAGES_ENDBOSS_RUNNING); // Running animation
    }

    clearAllIntervals() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval); // Clear movement interval
        }
        if (this.animationInterval) {
            clearInterval(this.animationInterval); // Clear animation interval
        }
    }
}