class World {

    // Initialize instance variables for the World class.
    // Initialisiere Instanzvariablen für die Klasse World.

    // Create a character object.
    // Erstelle ein Charakter-Objekt.
    character = new Character();

    // Set the level based on level1.
    // Setze das Level basierend auf level1.
    level = level1;

    // Initialize a canvas variable.
    // Initialisiere eine Canvas-Variable.
    canvas;

    // Initialize a drawing context variable.
    // Initialisiere eine Zeichenkontext-Variable.
    ctx;

    // Initialize a keyboard input variable.
    // Initialisiere eine Tastatureingabe-Variable.
    keyboard;

    // Initialize the camera's x-coordinate.
    // Initialisiere die x-Koordinate der Kamera.
    camera_x = 0;

    // Create a health status bar object.
    // Erstelle ein Objekt für die Gesundheitsstatusleiste.
    statusBar = new StatusBar();

    // Create a bottle status bar object.
    // Erstelle ein Objekt für die Flaschenstatusleiste.
    statusBarForBottle = new BottleBar();

    // Initialize an array for throwable objects.
    // Initialisiere ein Array für werfbare Objekte.
    throwableObjects = [];

    // Constructor function for creating instances of the World class.
    // Konstruktorfunktion zur Erstellung von Instanzen der Klasse World.
    constructor(canvas, keyboard) {
        // Get the 2D drawing context of the canvas.
        // Hole den 2D-Zeichenkontext der Leinwand.
        this.ctx = canvas.getContext('2d');

        // Store the canvas in the instance variable.
        // Speichere die Leinwand in der Instanzvariable.
        this.canvas = canvas;

        // Store the keyboard input in the instance variable.
        // Speichere die Tastatureingabe in der Instanzvariable.
        this.keyboard = keyboard;

        // Call the draw function to start rendering the game.
        // Rufe die Zeichenfunktion auf, um das Spiel zu rendern.
        this.draw();

        // Call the setWorld function to set the world for the character.
        // Rufe die Funktion setWorld auf, um die Welt für den Charakter festzulegen.
        this.setWorld();

        // Start the game loop by calling the run function.
        // Starte die Spiel-Schleife, indem du die Funktion run aufrufst.
        this.run();
    }

    // Function to set the world for the character.
    // Funktion zur Festlegung der Spielwelt für den Charakter.
    setWorld() {
        // Set the character's world property to this instance of World.
        // Setze die Welt-Eigenschaft des Charakters auf diese Instanz von World.
        this.character.world = this;
    }

    // Function to run the game loop.
    // Funktion zur Ausführung der Spiel-Schleife.
    run() {
        // Set an interval to check collisions and throwable objects every 200 milliseconds.
        // Setze ein Intervall, um alle 200 Millisekunden Kollisionen und werfbare Objekte zu überprüfen.
        setInterval(() => {
            // Call the checkCollisions function to detect collisions.
            // Rufe die Funktion checkCollisions auf, um Kollisionen zu erkennen.
            this.checkCollisions();

            // Call the checkThrowableObjects function to handle throwable objects.
            // Rufe die Funktion checkThrowableObjects auf, um werfbare Objekte zu verarbeiten.
            this.checkThrowableObjects();
        }, 200);
    }

    // Function to handle throwable objects.
    // Funktion zur Verarbeitung werfbarer Objekte.
    checkThrowableObjects() {
        if (this.keyboard.D && this.character.bottleCount > 0) {
            for (let i = 0; i < this.character.bottleCount; i++) {
                // Create a new ThrowableObject with an adjusted position.
                // Erstelle ein neues ThrowableObject mit angepasster Position.
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);

                // Add the created bottle object to the array of throwable objects.
                // Füge das erstellte Flaschenobjekt dem Array der werfbaren Objekte hinzu.
                this.throwableObjects.push(bottle);
            }

            // Reduce the character's bottle count by 25 after throwing.
            // Reduziere die Flaschenanzahl des Charakters um 25 nach dem Werfen.
            this.character.bottleCount -= 25;

            // Ensure that the character's bottle count does not go below 0.
            // Stelle sicher, dass die Flaschenanzahl des Charakters nicht unter 0 fällt.
            if (this.character.bottleCount < 0) {
                this.character.bottleCount = 0;
            }

            // Update the bottle status bar with the adjusted bottle count.
            // Aktualisiere die Flaschenstatusleiste mit der angepassten Flaschenanzahl.
            this.statusBarForBottle.setPercentageForBottle(this.character.bottleCount);
        }
    }

    // Function to check collisions with enemies and update character's energy.
    // Funktion zur Überprüfung von Kollisionen mit Feinden und Aktualisierung der Energie des Charakters.
    checkEnemyCollisions() {
            // Iterate through the enemies in the level.
            // Iteriere durch die Feinde im Level.
            this.level.enemies.forEach((enemy) => {
                // Check if the character is colliding with an enemy.
                // Überprüfe, ob der Charakter mit einem Feind kollidiert.
                if (this.character.isColliding(enemy)) {
                    // Call the character's hit function to handle the collision.
                    // Rufe die Trefferfunktion des Charakters auf, um die Kollision zu behandeln.
                    this.character.hit();

                    // Update the health status bar with the character's energy level.
                    // Aktualisiere die Gesundheitsstatusleiste mit dem Energiepegel des Charakters.
                    this.statusBar.setPercentage(this.character.energy);
                }
            });
        }
        // Function to check collisions with enemies and update character's energy.
        // Funktion zur Überprüfung von Kollisionen mit Feinden und Aktualisierung der Energie des Charakters.
    checkEnemyCollisionsOnYAxis() { //////////////////////////////////////////////////important////////////////////////////////
        // Iterate through the enemies in the level.
        // Iteriere durch die Feinde im Level.
        this.level.enemies.forEach((enemy) => {
            // Check if the character is colliding with an enemy.
            // Überprüfe, ob der Charakter mit einem Feind kollidiert.
            if (this.character.isCollidingOnYAxis(enemy)) {
                // Call the character's hit function to handle the collision.
                // Rufe die Trefferfunktion des Charakters auf, um die Kollision zu behandeln.


                // Update the health status bar with the character's energy level.
                // Aktualisiere die Gesundheitsstatusleiste mit dem Energiepegel des Charakters.
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    // Function to check collisions with coins and update character's energy.
    // Funktion zur Überprüfung von Kollisionen mit Münzen und Aktualisierung der Energie des Charakters.
    checkCoinCollisions() {
        // Iterate through the coins in the level.
        // Iteriere durch die Münzen im Level.
        this.level.coins.forEach((coin) => {
            // Check if the character is colliding with a coin and has energy below 100.
            // Überprüfe, ob der Charakter mit einer Münze kollidiert und eine Energie unter 100 hat.
            if (this.character.isColliding(coin) && this.character.energy < 100) {
                // Increase character's energy by 10 for each collected coin.
                // Erhöhe die Energie des Charakters um 10 für jede gesammelte Münze.
                this.character.energy += 10;

                // Limit character's energy to a maximum of 100.
                // Begrenze die Energie des Charakters auf maximal 100.
                if (this.character.energy > 100) {
                    this.character.energy = 100;
                }

                // Update the health status bar with the character's energy level.
                // Aktualisiere die Gesundheitsstatusleiste mit dem Energiepegel des Charakters.
                this.statusBar.setPercentage(this.character.energy);

                // Find the index of the collected coin in the array and remove it.
                // Finde den Index der gesammelten Münze im Array und entferne sie.
                const coinIndex = this.level.coins.indexOf(coin);
                if (coinIndex !== -1) {
                    this.level.coins.splice(coinIndex, 1);
                }
            }
        });
    }

    // Function to check collisions with bottles and update character's bottle count.
    // Funktion zur Überprüfung von Kollisionen mit Flaschen und Aktualisierung der Flaschenanzahl des Charakters.
    checkBottleCollisions() {
        // Iterate through the bottles in the level.
        // Iteriere durch die Flaschen im Level.
        this.level.bottle.forEach((bottle) => {
            // Check if the character is colliding with a bottle and has bottle count below 100.
            // Überprüfe, ob der Charakter mit einer Flasche kollidiert und eine Flaschenanzahl unter 100 hat.
            if (this.character.isColliding(bottle) && this.character.bottleCount < 100) {
                // Increase bottle count by 25 for each bottle collected.
                // Erhöhe die Flaschenanzahl um 25 für jede gesammelte Flasche.
                this.character.bottleCount += 25;

                // Limit bottle count to a maximum of 100.
                // Begrenze die Flaschenanzahl auf maximal 100.
                if (this.character.bottleCount > 100) {
                    this.character.bottleCount = 100;
                }

                // Find the index of the collected bottle in the array and remove it.
                // Finde den Index der gesammelten Flasche im Array und entferne sie.
                const bottleIndex = this.level.bottle.indexOf(bottle);
                if (bottleIndex !== -1) {
                    this.level.bottle.splice(bottleIndex, 1);
                }

                // Update the bottle status bar with the adjusted bottle count.
                // Aktualisiere die Flaschenstatusleiste mit der angepassten Flaschenanzahl.
                this.statusBarForBottle.setPercentageForBottle(this.character.bottleCount);
            }
        });
    }


    // Function to check if a thrown bottle has hit a chicken.
    checkBottleChickenCollision() {
        // Iterate through the throwable objects (bottles).
        for (let i = 0; i < this.throwableObjects.length; i++) {
            const bottle = this.throwableObjects[i];

            // Iterate through both big and small chickens.
            for (let j = 0; j < this.level.enemies.length; j++) {
                const chicken = this.level.enemies[j];

                // Check if the bottle has hit the chicken on both x and y axes.
                const xCollision = bottle.x + bottle.width >= chicken.x && bottle.x <= chicken.x + chicken.width;
                const yCollision = bottle.y + bottle.height >= chicken.y && bottle.y <= chicken.y + chicken.height;

                if (xCollision && yCollision) {
                    // Remove the bottle from the throwable objects array.
                    this.throwableObjects.splice(i, 1);
                    i--; // Decrement i to account for the removed bottle.

                    // Remove the chicken from the enemies array.
                    this.level.enemies.splice(j, 1);
                    j--; // Decrement j to account for the removed chicken.
                }
            }
        }
    }



    // Function to perform collision checks.
    // Funktion zur Durchführung von Kollisionsüberprüfungen.
    checkCollisions() {
        // Check collisions with enemies.
        // Überprüfe Kollisionen mit Feinden.
        this.checkEnemyCollisions();

        // Check collisions with coins.
        // Überprüfe Kollisionen mit Münzen.
        this.checkCoinCollisions();

        // Check collisions with bottles.
        // Überprüfe Kollisionen mit Flaschen.
        this.checkBottleCollisions();
        this.checkBottleChickenCollision();
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
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    // Function to flip the image horizontally.
    // Funktion zur horizontalen Spiegelung des Bildes.
    flipImage(mo) {
        // Save the current drawing state.
        // Speichere den aktuellen Zeichnungszustand.
        this.ctx.save();

        // Translate the context to the width of the object.
        // Übersetze den Kontext auf die Breite des Objekts.
        this.ctx.translate(mo.width, 0);

        // Scale the context horizontally to flip the image.
        // Skaliere den Kontext horizontal, um das Bild zu spiegeln.
        this.ctx.scale(-1, 1);

        // Invert the object's x-coordinate.
        // Kehre die x-Koordinate des Objekts um.
        mo.x = mo.x * -1;
    }

    // Function to flip the image back to its original orientation.
    // Funktion zur Rückkehr des Bildes zur ursprünglichen Ausrichtung.
    flipImageBack(mo) {
        // Invert the object's x-coordinate back to its original value.
        // Kehre die x-Koordinate des Objekts zurück zu ihrem ursprünglichen Wert.
        mo.x = mo.x * -1;

        // Restore the saved drawing state to its previous state.
        // Stelle den gespeicherten Zeichnungszustand in seinen vorherigen Zustand wieder her.
        this.ctx.restore();
    }
}