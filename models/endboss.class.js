/**
 * Class representing the End Boss in the game.
 * Extends the MovableObject class and contains all logic related to the End Boss's animations and behavior.
 */
class Endboss extends MovableObject {
    height = 400;
    width = 300;
    y = 40;
    endBossMovesLeft = false;
    endBossAttacking = false;
    endBossGotHit = false;
    gameSounds = new GameSound();

    offset = {
        right: 85,
        left: 50,
        bottom: 30,
        top: 200
    };

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

    moveInterval = null;
    animationInterval = null;

    /**
     * Constructs an Endboss instance and initializes its properties, including loading images and starting animations.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_ENDBOSS_RUNNING);
        this.loadImages(this.IMAGES_ENDBOSS_ATTACKING);
        this.loadImages(this.IMAGES_ENDBOSS_HIT);
        this.loadImages(this.IMAGES_BOSS_ELIMINATED);
        this.x = 5000;
        this.speed = 5;
        this.animate();
    }

    /**
     * Handles the animation of the End Boss based on its state (e.g., dead, hit, attacking, or moving).
     */
    animate() {
        if (this.moveInterval) {
            return;
        }

        this.moveInterval = setInterval(() => {
            if (this.endBossIsDead()) {
                this.handleEndBossDeath();
            } else if (this.endBossGotHit) {
                this.handleEndBossHit();
            } else if (this.endBossAttacking) {
                this.handleEndBossAttack();
            } else if (this.endBossMovesLeft && !this.endBossGotHit) {
                this.handleEndBossMovement();
            }
        }, 100);
    }



    /**
     * Handles the End Boss's death animation and sound effects.
     */
    handleEndBossDeath() {
        this.endBossIsEliminatedAnimation();
        this.toggleEndBossDeathSound();
    }

    /**
     * Plays the End Boss's hit animation and temporarily stops movement.
     */
    handleEndBossHit() {
        this.endBossGotHitAnimation();
    }

    /**
     * Plays the End Boss's attacking animation.
     */
    handleEndBossAttack() {
        this.endBossAttackingAnimation();
    }

    /**
     * Handles the End Boss's running animation when moving left.
     */
    handleEndBossMovement() {
        this.endBossRunningAnimation();
    }

    /**
     * Toggles the End Boss's death sound based on the game's sound state.
     */
    toggleEndBossDeathSound() {
        if (world.gameSoundActive) {
            this.gameSounds.endboss_got_eliminated.play();
        } else {
            this.gameSounds.endboss_got_eliminated.pause();
        }
    }

    /**
     * Plays the animation when the End Boss is hit and temporarily stops its movement.
     */
    endBossGotHitAnimation() {
        if (this.endBossGotHit) {
            this.playAnimation(this.IMAGES_ENDBOSS_HIT);
            this.speed = 0;
            setTimeout(() => {
                this.endBossGotHit = false;
                this.speed = 5;
            }, 500);
        }
    }

    /**
     * Plays the animation when the End Boss is eliminated.
     * Stops its movement completely.
     */
    endBossIsEliminatedAnimation() {
        this.speed = 0;
        this.playAnimation(this.IMAGES_BOSS_ELIMINATED);
    }

    /**
     * Plays the attacking animation for the End Boss and makes it jump.
     * Resets the attack state and speed after a short delay.
     */
    endBossAttackingAnimation() {
        this.playAnimation(this.IMAGES_ENDBOSS_ATTACKING);
        this.jump();
        setTimeout(() => {
            this.endBossAttacking = false;
            this.speed = 5;
        }, 500);
    }

    /**
     * Plays the running animation when the End Boss moves left.
     */
    endBossRunningAnimation() {
        this.moveLeft();
        this.playAnimation(this.IMAGES_ENDBOSS_RUNNING);
    }

    /**
     * Clears all intervals associated with the End Boss, stopping all animations and movement.
     */
    clearAllIntervals() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
            this.moveInterval = null;
        }
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
    }


    reset() {
        this.clearAllIntervals();
        this.x = 5000; // Reset position
        this.speed = 5;
        this.endBossEnergy = 100;
        this.endBossGotHit = false;
        this.endBossMovesLeft = false;
        this.percentageForEndBoss = 100;
        this.animate();
    }


}