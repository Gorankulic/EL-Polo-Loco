/**
 * Class representing all game sounds used in the game.
 * Manages the playback and control of various audio elements based on game events.
 */
class GameSound {
    pepe_hurt = new Audio('audio/pepe hurt.mp3');
    pepe_throw = new Audio('audio/throw sound.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    small_chicken_walk_sound = new Audio('audio/small chickens moving sound.mp3');
    bottle_collected_sound = new Audio('audio/coin.mp3');
    bottle_splash_sound = new Audio('audio/broken bottle.mp3');
    normal_chicken_walking_sound = new Audio('audio/normal chicken coming sound.mp3');
    chicken_hit_sound = new Audio('audio/chicken hit sound.mp3');
    chicken_eliminated_from_player = new Audio('audio/chicken eliminated from player.mp3');
    endboss_hit_sound = new Audio('audio/enboss got hit.mp3');
    small_chickens_move_sound = new Audio('audio/small chickens moving sound.mp3');
    endboss_coming_sound = new Audio('audio/endboss coming sound.mp3');
    desert_ambient_sound = new Audio('audio/desert ambient sound.mp3');
    background_game_music = new Audio('audio/game music.mp3');
    game_won_sound = new Audio('audio/game won.mp3');
    endboss_got_eliminated = new Audio('audio/endboss eliminated sound.mp3');
    character_eliminated_sound = new Audio('audio/endboss eliminated sound.mp3');
    game_over_voice = new Audio('audio/game over voice.mp3');
    pepe_eliminated_sound = new Audio('audio/pepe eliminated sound.mp3');
    walking_sound = new Audio('audio/walking.mp3');
    pepe_jump = new Audio('audio/pepe jump.mp3');
    sleeping_sound = new Audio('audio/sleeping sound.mp3');
    you_lost_music = new Audio('audio/game lost.mp3');

    /**
     * Toggles all sounds based on whether to play or pause.
     * @param {boolean} play - Whether to play or pause all ambient and background sounds.
     */
    toggleAllSounds(play) {
            if (play) {
                this.desert_ambient_sound.currentTime = 0;
                this.background_game_music.currentTime = 0;
                this.playAmbientSounds();
            } else {
                this.pauseAllSounds();
            }
        }
        /**
         * Plays all ambient and background sounds in the game.
         */
    playAmbientSounds() {
        if (!this.background_game_music.paused || this.background_game_music.currentTime > 0) {
            this.background_game_music.pause();
            this.background_game_music.currentTime = 0; // Reset to start
        }
        this.desert_ambient_sound.play();
        this.background_game_music.play();
    }


    /**
     * Pauses all ambient and background sounds in the game.
     */
    pauseAmbientSounds() {
        this.desert_ambient_sound.pause();
        this.background_game_music.pause();
    }

    /**
     * Pauses all game sounds to ensure silence across all events.
     */
    pauseAllSounds() {
        this.pepe_hurt.pause();
        this.pepe_throw.pause();
        this.coin_sound.pause();
        this.bottle_collected_sound.pause();
        this.bottle_splash_sound.pause();
        this.chicken_hit_sound.pause();
        this.chicken_eliminated_from_player.pause();
        this.endboss_hit_sound.pause();
        this.small_chickens_move_sound.pause();
        this.endboss_coming_sound.pause();
        this.desert_ambient_sound.pause();
        this.background_game_music.pause();
        this.game_won_sound.pause();
        this.endboss_got_eliminated.pause();
        this.pepe_eliminated_sound.pause();
        this.you_lost_music.pause();
        this.walking_sound.pause();
        this.normal_chicken_walking_sound.pause();

    }

    stopAndResetAllSounds() {
        // Stop and reset all sounds
        this.pepe_hurt.pause();
        this.pepe_throw.pause();
        this.coin_sound.pause();
        this.bottle_collected_sound.pause();
        this.bottle_splash_sound.pause();
        this.chicken_hit_sound.pause();
        this.chicken_eliminated_from_player.pause();
        this.endboss_hit_sound.pause();
        this.small_chickens_move_sound.pause();
        this.endboss_coming_sound.pause();
        this.desert_ambient_sound.pause();
        this.background_game_music.pause();
        this.game_won_sound.pause();
        this.endboss_got_eliminated.pause();
        this.pepe_eliminated_sound.pause();
        this.you_lost_music.pause();
        this.walking_sound.pause();
        this.normal_chicken_walking_sound.pause();

        // Reset all sounds to the beginning
        this.pepe_hurt.currentTime = 0;
        this.pepe_throw.currentTime = 0;
        this.coin_sound.currentTime = 0;
        this.bottle_collected_sound.currentTime = 0;
        this.bottle_splash_sound.currentTime = 0;
        this.chicken_hit_sound.currentTime = 0;
        this.chicken_eliminated_from_player.currentTime = 0;
        this.endboss_hit_sound.currentTime = 0;
        this.small_chickens_move_sound.currentTime = 0;
        this.endboss_coming_sound.currentTime = 0;
        this.desert_ambient_sound.currentTime = 0;
        this.background_game_music.currentTime = 0;
        this.game_won_sound.currentTime = 0;
        this.endboss_got_eliminated.currentTime = 0;
        this.pepe_eliminated_sound.currentTime = 0;
        this.you_lost_music.currentTime = 0;
        this.walking_sound.currentTime = 0;
        this.normal_chicken_walking_sound.currentTime = 0;
    }


    /**
     * Plays the sound for character elimination.
     */
    playCharacterEliminatedSounds() {
        if (world.gameSoundActive) {
            this.pepe_eliminated_sound.play();
            setTimeout(() => {
                this.pauseAllSounds();
                world.gameSoundActive = false;

            }, 3000);
            this.you_lost_music.play();
        } else {
            this.pepe_eliminated_sound.pause();
            this.you_lost_music.pause();
        }
    }

    /**
     * Updates the walking sound based on the character's status.
     */
    updateWalkingSound() {
        if (world.gameSoundActive && !world.characterIsDead && !world.endBossIsEliminated) {
            this.walking_sound.play();
        } else {
            this.walking_sound.pause();
        }
    }

    /**
     * Plays the sound when the character gets hurt.
     */
    playPepeHurtSound() {
        if (world.gameSoundActive && this.pepe_hurt.paused) {
            this.pepe_hurt.play();
        }
    }

    /**
     * Plays the sound for character throwing an item.
     */
    playThrowSound() {
        if (world.gameSoundActive) {
            this.pepe_throw.play();
        }
    }

    /**
     * Plays the sound when a bottle is collected.
     */
    playBottleCollectedSound() {
        if (world.gameSoundActive) {
            this.bottle_collected_sound.play();
        }
    }

    /**
     * Plays the sound when a chicken is hit.
     */
    playChickenHitSound() {
        if (world.gameSoundActive) {
            this.chicken_hit_sound.play();
            this.chicken_eliminated_from_player.play();
        }
    }

    /**
     * Plays the sound when the End Boss is approaching.
     */
    playEndBossComingSound() {
        if (world.gameSoundActive) {
            this.endboss_coming_sound.play();
        }
    }

    /**
     * Plays the sound for when a bottle collides with a chicken.
     */
    playBottleChickenCollisionSound() {
        if (world.gameSoundActive) {
            this.chicken_hit_sound.play();
            this.bottle_splash_sound.play();
        }
    }

    /**
     * Plays the sound when a coin is collected.
     */
    playCoinCollectedSound() {
        if (world.gameSoundActive) {
            this.coin_sound.play();
        }
    }

    /**
     * Plays the sound for when a bottle collides with the ground.
     */
    playBottleGroundCollisionSound() {
        if (world.gameSoundActive) {
            this.bottle_splash_sound.play();
        }
    }

    /**
     * Plays the victory sound when the game is won.
     */
    playVictorySound() {
        if (world.gameSoundActive) {
            this.game_won_sound.play();
        } else {
            this.game_won_sound.pause();
        }
    }

    /**
     * Updates the jump sound based on the game sound status.
     */
    updateJumpSound() {
        if (world.gameSoundActive) {
            this.pepe_jump.play();
        } else {
            this.pepe_jump.pause();
        }
    }

    /**
     * Plays the sleeping sound for the character.
     */
    playSleepingSound() {
        if (world.gameSoundActive) {
            this.sleeping_sound.play();
        } else {
            this.sleeping_sound.pause();
        }
    }

    /**
     * Plays normal brown chicken walking sound
     */
    playNormalChickenWalkingSound() {
        if (world.gameSoundActive) {
            this.normal_chicken_walking_sound.play();
        } else {
            this.normal_chicken_walking_sound.pause();
        }
    }

    /**
     * Plays the walking sound for small chickens.
     */
    playSmallChickenWalkSound() {
        if (world.gameSoundActive && !world.pauseSmallChickenSound && this.small_chickens_move_sound.paused) {
            this.small_chickens_move_sound.play();
        }
    }

    /**
     * Pauses the small chickens' moving sound.
     */
    pauseSmallChickensMovingSound() {
        this.small_chickens_move_sound.pause();
    }
}