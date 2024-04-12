class Endboss extends MovableObject {
    height = 200;
    width = 150;
    y = 230;
    endBossMovesLeft = false;
    endBossAttacking = false;
    endBossGotHit = false;


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
        this.loadImages(this.IMAGES_ENDBOSS_HIT);
        this.loadImages(this.IMAGES_BOSS_ELIMINATED);
        this.x = 2500;
        this.animate();


        this.speed = 7 + Math.random() * 0.25;
    }
    animate() { //ovaj dio treba popravljanje
        setInterval(() => {
            if (this.endBossGotHit) { //wenn das huhn getroffen ist
                this.playAnimation(this.IMAGES_ENDBOSS_HIT); //
                console.log("Hit animation should play"); //console log statement
                this.speed = 0; //huhn speed = 0
                this.speed = 7 + Math.random() * 0.25; // endboss bekommt neuer speed
                this.moveLeft(); // Resume movement
                this.endBossGotHit = false; //wenn das endboss nicht getroffen ist
                console.log('Setting endBossGotHit to false'); //console log statement


            } else if (this.endBossAttacking) { //when enboss is attacking  
                this.playAnimation(this.IMAGES_ENDBOSS_ATTACKING); //play animation 
                console.log("ENDBOSS IS ATTACKING"); //console log 
                this.jump(); //huhn spring ins luft
                this.speed = 0; //huhn speed is 0
                setTimeout(() => {
                    this.endBossAttacking = false;
                    this.speed = 7 + Math.random() * 0.25;
                    this.moveLeft(); // Allow some time for the animation to play
                }, 500);
            } else if (this.endBossMovesLeft && this.endBossGotHit == false) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_ENDBOSS_RUNNING);
                console.log("RUNNING ANIMATION");
            }
        }, 80);
    }

}