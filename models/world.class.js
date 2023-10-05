// Define a class named World.
// Definiere eine Klasse namens World.
class World {

    // Initialize instance variables for the World class.
    // Initialisiere Instanzvariablen für die Klasse World.
    character = new Character(); // Create a character object.
    // Erstelle ein Charakter-Objekt.
    level = level1; // Set the level based on level1.
    // Setze das Level basierend auf level1.
    canvas; // Initialize a canvas variable.
    // Initialisiere eine Canvas-Variable.
    ctx; // Initialize a drawing context variable.
    // Initialisiere eine Zeichenkontext-Variable.
    keyboard; // Initialize a keyboard input variable.
    // Initialisiere eine Tastatureingabe-Variable.
    camera_x = 0; // Initialize the camera's x-coordinate.
    // Initialisiere die x-Koordinate der Kamera.
    statusBar = new StatusBar(); // Create a health status bar object.
    // Erstelle ein Objekt für die Gesundheitsstatusleiste.
    statusBarForBottle = new BottleBar(); // Create a bottle status bar object.
    // Erstelle ein Objekt für die Flaschenstatusleiste.
    throwableObjects = []; // Initialize an array for throwable objects.
    // Initialisiere ein Array für werfbare Objekte.

    // Constructor function for creating instances of the World class.
    // Konstruktorfunktion zur Erstellung von Instanzen der Klasse World.
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // Get the 2D drawing context of the canvas.
        // Hole den 2D-Zeichenkontext der Leinwand.
        this.canvas = canvas; // Store the canvas in the instance variable.
        // Speichere die Leinwand in der Instanzvariable.
        this.keyboard = keyboard; // Store the keyboard input in the instance variable.
        // Speichere die Tastatureingabe in der Instanzvariable.
        this.draw(); // Call the draw function to start rendering the game.
        // Rufe die Zeichenfunktion auf, um das Spiel zu rendern.
        this.setWorld(); // Call the setWorld function to set the world for the character.
        // Rufe die Funktion setWorld auf, um die Welt für den Charakter festzulegen.
        this.run(); // Start the game loop by calling the run function.
        // Starte die Spiel-Schleife, indem du die Funktion run aufrufst.
    }

    // Function to set the world for the character.
    // Funktion zur Festlegung der Spielwelt für den Charakter.
    setWorld() {
        this.character.world = this; // Set the character's world property to this instance of World.
        // Setze die Welt-Eigenschaft des Charakters auf diese Instanz von World.
    }

    // Function to run the game loop.
    // Funktion zur Ausführung der Spiel-Schleife.
    run() {
        // Set an interval to check collisions and throwable objects every 200 milliseconds.
        // Setze ein Intervall, um alle 200 Millisekunden Kollisionen und werfbare Objekte zu überprüfen.
        setInterval(() => {
            this.checkCollisions(); // Call the checkCollisions function to detect collisions.
            // Rufe die Funktion checkCollisions auf, um Kollisionen zu erkennen.
            this.checkThrowableObjects(); // Call the checkThrowableObjects function to handle throwable objects.
            // Rufe die Funktion checkThrowableObjects auf, um werfbare Objekte zu verarbeiten.
        }, 200);
    }

    // Function to handle throwable objects.
    // Funktion zur Verarbeitung werfbarer Objekte.
    checkThrowableObjects() {
        if (this.keyboard.D) { // Check if the "D" key is pressed.
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            // Create a new ThrowableObject at a specific position relative to the character.
            // Erstelle ein neues ThrowableObject an einer bestimmten Position relativ zum Charakter.
            this.throwableObjects.push(bottle); // Add the created throwable object to the array.
            // Füge das erstellte werfbare Objekt zum Array hinzu.
        }
    }

    // Function to check collisions with enemies and update character's energy.
    // Funktion zur Überprüfung von Kollisionen mit Feinden und Aktualisierung der Energie des Charakters.
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) { // Check if the character is colliding with an enemy.
                this.character.hit(); // Call the character's hit function to handle the collision.
                this.statusBar.setPercentage(this.character.energy);
                // Update the health status bar with the character's energy level.
            }
        });
    }

    // Function to check collisions with coins and update character's energy.
    // Funktion zur Überprüfung von Kollisionen mit Münzen und Aktualisierung der Energie des Charakters.
    checkCoinCollisions() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && this.character.energy < 100) {
                this.character.energy += 10; // Increase character's energy by 10 for each collected coin.
                if (this.character.energy > 100) {
                    this.character.energy = 100; // Limit character's energy to a maximum of 100.
                }
                this.statusBar.setPercentage(this.character.energy);
                // Update the health status bar with the character's energy level.
                const coinIndex = this.level.coins.indexOf(coin);
                if (coinIndex !== -1) {
                    this.level.coins.splice(coinIndex, 1); // Remove the collected coin from the array.
                }
            }
        });
    }

    // Function to check collisions with bottles and update character's bottle count.
    // Funktion zur Überprüfung von Kollisionen mit Flaschen und Aktualisierung der Flaschenanzahl des Charakters.
    checkBottleCollisions() {
        this.level.bottle.forEach((bottle) => { // Iterate through bottles
            if (this.character.isColliding(bottle) && this.character.bottleCount < 100) {
                this.character.bottleCount += 25; // Increase bottle count by 25 for each bottle collected
                if (this.character.bottleCount > 100) {
                    this.character.bottleCount = 100; // Limit bottle count to a maximum of 100
                }
                const bottleIndex = this.level.bottle.indexOf(bottle);
                if (bottleIndex !== -1) {
                    this.level.bottle.splice(bottleIndex, 1); // Remove the collected bottle from the array
                }
                // Update the bottle status bar here
                this.statusBarForBottle.setPercentageForBottle(this.character.bottleCount);
            }
        });
    }

    // Function to perform collision checks.
    // Funktion zur Durchführung von Kollisionsüberprüfungen.
    checkCollisions() {
        this.checkEnemyCollisions(); // Check collisions with enemies.
        this.checkCoinCollisions(); // Check collisions with coins.
        this.checkBottleCollisions(); // Check collisions with bottles.
    }

    // Function to draw elements of the game.
    // Funktion zur Darstellung der Spielelemente.
    draw() {
        // Draw the health status bar at a specific position.
        // Zeichne die Gesundheitsstatusleiste an einer bestimmten Position.
        this.statusBar.draw(this.ctx);

        // Draw the bottle status bar at a different position.
        // Zeichne die Flaschenstatusleiste an einer anderen Position.
        this.statusBarForBottle.draw(this.ctx);

        // Clear the canvas to prepare for rendering.
        // Lösche die Leinwand, um sie für die Darstellung vorzubereiten.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Translate the drawing context to adjust for camera movement.
        // Übersetze den Zeichenkontext, um die Kamerabewegung anzupassen.
        this.ctx.translate(this.camera_x, 0);

        // Add background objects to the map.
        // Füge Hintergrundobjekte zur Karte hinzu.
        this.addObjectsToMap(this.level.backgroundObjects);

        // Translate the drawing context back to its original position.
        // Übersetze den Zeichenkontext zurück in seine ursprüngliche Position.
        this.ctx.translate(-this.camera_x, 0);

        // Add the health status bar to the map.
        // Füge die Gesundheitsstatusleiste zur Karte hinzu.
        this.addToMap(this.statusBar);

        // Draw the bottle status bar.
        // Zeichne die Flaschenstatusleiste.
        this.statusBarForBottle.draw(this.ctx);

        // Translate the drawing context to adjust for camera movement.
        // Übersetze den Zeichenkontext, um die Kamerabewegung anzupassen.
        this.ctx.translate(this.camera_x, 0);

        // Add character and other game elements to the map.
        // Füge den Charakter und andere Spielelemente zur Karte hinzu.
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);

        // Translate the drawing context back to its original position.
        // Übersetze den Zeichenkontext zurück in seine ursprüngliche Position.
        this.ctx.translate(-this.camera_x, 0);

        // Request the next animation frame for continuous rendering.
        // Fordere den nächsten Animationsrahmen für kontinuierliche Darstellung an.
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    // Function to add an array of objects to the map.
    // Funktion zur Hinzufügung eines Arrays von Objekten zur Karte.
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    // Function to add an object to the map.
    // Funktion zur Hinzufügung eines Objekts zur Karte.
    addToMap(mo) {
        if (mo.otherDirection) { // Check if the object has the "otherDirection" property.
            this.flipImage(mo); // Flip the image horizontally.
        }
        mo.draw(this.ctx); // Draw the object on the canvas.
        mo.drawFrame(this.ctx); // Draw the object's frame on the canvas.

        if (mo.otherDirection) { // Check if the object has the "otherDirection" property.
            this.flipImageBack(mo); // Flip the image back to its original orientation.
        }
    }

    // Function to flip the image horizontally.
    // Funktion zur horizontalen Spiegelung des Bildes.
    flipImage(mo) {
        this.ctx.save(); // Save the current drawing state.
        this.ctx.translate(mo.width, 0); // Translate the context to the width of the object.
        this.ctx.scale(-1, 1); // Scale the context horizontally to flip the image.
        mo.x = mo.x * -1; // Invert the object's x-coordinate.
    }

    // Function to flip the image back to its original orientation.
    // Funktion zur Rückkehr des Bildes zur ursprünglichen Ausrichtung.
    flipImageBack(mo) {
        mo.x = mo.x * -1; // Invert the object's x-coordinate back to its original value.
        this.ctx.restore(); // Restore the saved drawing state to its previous state.
    }
}