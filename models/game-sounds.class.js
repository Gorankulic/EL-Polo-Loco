class GameSound {
    pepe_hurt = new Audio('audio/pepe hurt.mp3');
    pepe_throw = new Audio('audio/throw sound.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    bottle_collected_sound = new Audio('audio/coin.mp3');
    bottle_splash_sound = new Audio('audio/broken bottle.mp3');
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


    toggleAllSounds(play) {
        if (play) {
            this.playAmbientSounds();
        } else {
            this.pauseAllSounds();
        }
    }

    playAmbientSounds() {
        this.desert_ambient_sound.play();
        this.background_game_music.play();
    }
    pauseAmbientSounds() {
        this.desert_ambient_sound.pause();
        this.background_game_music.pause();
    }

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
    }

    playCharacterEliminatedSounds() {
        if (world.gameSoundActive) {
            this.pepe_eliminated_sound.play();
            this.you_lost_music.play();
        } else if (!world.gameSoundActive) {
            this.pepe_eliminated_sound.pause();
            this.you_lost_music.pause();
        }
    }

    playPepeHurtSound() {
        if (world.gameSoundActive && this.pepe_hurt.paused) {
            this.pepe_hurt.play();
        }
    }

    playThrowSound() {
        if (world.gameSoundActive) {
            this.pepe_throw.play();
        }
    }

    playBottleCollectedSound() {
        if (world.gameSoundActive) {
            this.bottle_collected_sound.play();
        }
    }

    playChickenHitSound() {
        if (world.gameSoundActive) {
            this.chicken_hit_sound.play();
            this.chicken_eliminated_from_player.play();
        }
    }

    playEndBossComingSound() {
        if (world.gameSoundActive) {
            this.endboss_coming_sound.play();
        }
    }

    playBottleChickenCollisionSound() {
        if (world.gameSoundActive) {
            this.chicken_hit_sound.play();
            this.bottle_splash_sound.play();
        }
    }

    playCoinCollectedSound() {
        if (world.gameSoundActive) {
            this.coin_sound.play();
        }
    }

    playBottleGroundCollisionSound() {
        if (world.gameSoundActive) {
            this.bottle_splash_sound.play();
        }
    }

    playVictorySound() {
        if (world.gameSoundActive) {
            this.game_won_sound.play();
        } else if (world.gameSoundActive) {
            this.game_won_sound.pause();
        }
    }
    updateWalkingSound() {
        if (world.gameSoundActive) {
            this.walking_sound.play();
        } else if (!world.gameSoundActive) {
            this.walking_sound.pause();
        }
    }

    updateJumpSound() {
        if (world.gameSoundActive) {
            this.pepe_jump.play();
        } else if (!world.gameSoundActive) {
            this.pepe_jump.pause();
        }
    }

    playSleepingSound() {
        if (world.gameSoundActive) {
            this.sleeping_sound.play();
        } else if (!world.gameSoundActive) {
            this.sleeping_sound.pause();
        }
    }



}