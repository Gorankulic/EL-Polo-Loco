class Endboss extends MovableObject {
    height = 200;
    width = 150;
    y = 230;
    endBossMovesLeft = false;
    endBossAttacking = false;

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
    IAMGES_ENDBOSS_HIT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G230.png'

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
        this.loadImages(this.IAMGES_ENDBOSS_HIT);
        this.loadImages(this.IMAGES_BOSS_ELIMINATED);
        this.x = 2500;
        this.animate();


        this.speed = 7 + Math.random() * 0.25;
    }
    animate() {
        setInterval(() => {
            if (this.endBossMovesLeft == true) { //enboss moves left
                this.moveLeft();
                this.playAnimation(this.IMAGES_ENDBOSS_RUNNING);
            }
        }, 80);
    }
    endBossAttacks() {
        // Immediately play the attack animation
        this.playAnimation(this.IMAGES_ENDBOSS_ATTACKING);

        // After 500 milliseconds, switch back to the running animation
        setTimeout(() => {
            this.playAnimation(this.IMAGES_ENDBOSS_RUNNING);
        }, 500);
    }

}