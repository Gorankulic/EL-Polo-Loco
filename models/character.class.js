// Define a class named Character that extends the MovableObject class.
// Definiere eine Klasse namens Character, die die Klasse MovableObject erweitert.
class Character extends MovableObject {
    // Set the initial height, width, and y-coordinate for the character object.
    // Setze die anfängliche Höhe, Breite und y-Koordinate für das Charakterobjekt.
    height = 350;
    width = 150;
    y = 80;
    speed = 10;
    offset = {
        right: 10,
        left: 10,
        bottom: 5
    }

    // Define arrays of image paths for different character animations.
    // Definiere Arrays von Bildpfaden für verschiedene Charakteranimationen.
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

    world; // Reference to the world object
    walking_sound = new Audio('audio/walking.mp3'); // Sound for walking

    // Constructor function for creating instances of the Character class.
    // Konstruktorfunktion zur Erstellung von Instanzen der Klasse Character.
    constructor() {

        super(); // Call the constructor of the parent class.

        // Load the initial image for the character.
        // Lade das anfängliche Bild für den Charakter.
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');

        // Load images for different character animations.
        // Lade Bilder für verschiedene Charakteranimationen.
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);

        this.bottleCount = 0; // Initialize bottle count to 0
        this.applyGravity(); // Apply gravity to the character.

        // Start the character's animation.
        this.animate();
    }

    // Method to increment the bottle count when a bottle is collected.
    // Methode zur Erhöhung der Flaschenanzahl, wenn eine Flasche eingesammelt wird.
    collectBottle() {
        this.bottleCount++; // Increment bottle count when a bottle is collected
    }

    // Method to handle character animations and user input.
    // Methode zur Steuerung der Charakteranimationen und Benutzereingabe.
    animate() {
        // Set up an interval to handle character movement and actions.
        // Richte ein Intervall ein, um die Charakterbewegung und -aktionen zu steuern.
        setInterval(() => {
            this.walking_sound.pause(); // Pause the walking sound.

            // Check if the right arrow key is pressed and the character is within the level bounds.
            // Überprüfe, ob die rechte Pfeiltaste gedrückt ist und der Charakter innerhalb der Levelgrenzen ist.
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight(); // Move the character to the right.
                this.walking_sound.play(); // Play the walking sound.
                this.otherDirection = false; // Set the character direction to right.
            }

            // Check if the left arrow key is pressed and the character is within the level bounds.
            // Überprüfe, ob die linke Pfeiltaste gedrückt ist und der Charakter innerhalb der Levelgrenzen ist.
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.walking_sound.play(); // Play the walking sound.
                this.moveLeft(); // Move the character to the left.
                this.otherDirection = true; // Set the character direction to left.
            }

            // Check if the spacebar is pressed and the character is not already jumping.
            // Überprüfe, ob die Leertaste gedrückt ist und der Charakter nicht bereits springt.
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump(); // Make the character jump.
            }

            // Update the camera position to follow the character.
            // Aktualisiere die Kameraposition, um dem Charakter zu folgen.
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60); // Set the interval to 60 frames per second.

        // Set up another interval to handle character animations.
        // Richte ein weiteres Intervall ein, um die Charakteranimationen zu steuern.
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD); // Play the death animation.
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT); // Play the hurt animation.
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING); // Play the jumping animation.
            } else {
                // Walk animation
                // Gehanimationsanimation
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING); // Play the walking animation.
                }
            }
        }, 50); // Set the interval for animation updates.
    }

    // Method to make the character jump.
    // Methode, um den Charakter springen zu lassen.
    jump() {
        this.speedY = 14; // Set the vertical speed for jumping.
    }
}