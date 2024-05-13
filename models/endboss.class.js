class Endboss extends MovableObject {
    height = 400;
    width = 300;
    y = 40;
    endBossMovesLeft = false;
    endBossAttacking = false;
    endBossGotHit = false;
    offset = {
        right: 55,
        left: 35,
        bottom: 30,
        top: 45
    };
    endboss_got_eliminated = new Audio('audio/endboss eliminated sound.mp3');
    game_won_sound = new Audio('audio/game won.mp3');

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
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_ENDBOSS_RUNNING);
        this.loadImages(this.IMAGES_ENDBOSS_ATTACKING);
        this.loadImages(this.IMAGES_ENDBOSS_HIT);
        this.loadImages(this.IMAGES_BOSS_ELIMINATED);
        this.x = 2500;
        this.animate();
        this.speed = 7 + Math.random() * 0.25;
        this.endboss_got_eliminated.pause();
        this.game_won_sound.pause();

    }
    animate() {
        setInterval(() => {
            if (this.endBossIsDead()) {
                this.endBossIsEliminatedAnimation();
                world.background_game_music.pause();

                if (!world.gameSoundActive) {
                    this.endboss_got_eliminated.pause();
                    this.game_won_sound.pause();
                }
                if (world.gameSoundActive) {
                    this.endboss_got_eliminated.play();
                    this.game_won_sound.play();
                }

            } else if (this.endBossGotHit) {
                this.endBossGotHitAnimation();
            } else if (this.endBossAttacking) {
                this.endBossAttackingAnimation();
            } else if (this.endBossMovesLeft && !this.endBossGotHit) {
                this.endBossRunningAnimation();
            }
        }, 80); // The interval at which the animations are checked and updated
    }


    endBossGotHitAnimation() {
        if (this.endBossGotHit == true) {
            this.playAnimation(this.IMAGES_ENDBOSS_HIT);
            console.log("Endboss got hit. Hit animation playing.");
            setTimeout(() => {
                this.endBossGotHit = false; // Reset hit flag after animation
                this.speed = 7 + Math.random() * 0.25; // Reset speed after hit
                console.log('Hit animation ended. Resuming normal behavior.');
            }, 500); // Delay matches the length of the hit animation
        }

    }

    endBossIsEliminatedAnimation() {
        this.speed = 0;
        this.playAnimation(this.IMAGES_BOSS_ELIMINATED);
        console.log("Endboss is dead. Elimination animation playing.");
    }

    endBossAttackingAnimation() {
        this.playAnimation(this.IMAGES_ENDBOSS_ATTACKING);
        console.log("Endboss is attacking. Attack animation playing.");
        this.jump(); // Endboss jumps during attack
        setTimeout(() => {
            this.endBossAttacking = false;
            this.speed = 7 + Math.random() * 0.25; // Reset speed post-attack
            console.log('Attack animation ended. Resuming movement.');
        }, 500); // Delay after attack animation
    }

    endBossRunningAnimation() {
        this.moveLeft(); // Move the endboss left
        this.playAnimation(this.IMAGES_ENDBOSS_RUNNING); // Play the running animation
        console.log("Endboss is moving left. Running animation playing.");
    }


}