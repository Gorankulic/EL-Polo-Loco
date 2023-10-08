class MovableObject extends DrawableObject {
    speed = 0.15; // Movement speed
    otherDirection = false; // Indicates whether the object is facing the opposite direction
    speedY = 0; // Vertical speed (used for jumping and gravity)
    acceleration = 1; // Gravity acceleration
    energy = 100; // Initial energy level
    lastHit = 0; // Timestamp of the last hit

    // Method to apply gravity, causing the object to fall if above the ground
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    // Method to check if the object is above the ground (used for jumping)
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true; // Throwable objects are always above the ground
        } else {
            return this.y < 80; // Check if the object's y-coordinate is less than 80 (assumes ground level)
        }
    }

    // Method to check if the object is colliding with another object
    isColliding(mo) {
        return (
            this.x + this.width > mo.x && this.x < mo.x + mo.width //////////////code baustelle////////////////////////////////

        );
    }

    // Method to handle a hit or damage to the object
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();

        }
    }

    // Method to check if the object is dead (energy depleted)
    isDead() {
        return this.energy === 0;
    }

    // Method to check if the object is hurt (recently hit)
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Time elapsed since last hit (in milliseconds)
        timePassed = timePassed / 1000; // Convert to seconds
        return timePassed < 1; // Object is hurt if less than 1 second has passed since the last hit
    }

    // Method to play an animation using a sequence of images
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    // Method to move the object to the right
    moveRight() {
        this.x += this.speed;
    }

    // Method to move the object to the left
    moveLeft() {
        this.x -= this.speed; // Update x coordinate to move left
    }

    // Method to make the object jump
    jump() {
        this.speedY = 12; // Set the vertical speed to simulate a jump
    }
}