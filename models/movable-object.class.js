class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    endBossEnergy=100;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < -25;
        }
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit() {
        this.energy -= 1;  // Deduct a small amount of energy on each hit
        if (this.energy <= 0) {
            this.energy = 0;  // Ensure energy doesn't go negative
        } else {
        }
        this.lastHit = new Date().getTime();  // Update the time of the last hit
    }
    

    isDead() {
        return this.energy === 0;
    }
    endBossIsDead() {
        return this.endBossEnergy === 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 500;
        return timePassed < 1;
    }

    playAnimation(images) {
        if (!images || images.length === 0) return; // Exit if images is undefined or empty

        if (images.length === 1) {
            // If there's only one image, simply use it without needing the modulus operation
            this.img = this.imageCache[images[0]];
        } else {
            // Original logic for cycling through multiple images
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
            this.speedY = 12;
        }
        // Method to stop the object's movement on the x-axis
    stopMovementX() {
        this.speed = 0;
    }
}