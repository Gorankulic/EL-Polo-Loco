const level1 = new Level(
    [
        new Chicken(), // Create a Chicken object (Erstellen Sie ein Huhn-Objekt).
        new Chicken(), // Create another Chicken object (Erstellen Sie ein weiteres Huhn-Objekt).
        new Chicken(), // Create one more Chicken object (Erstellen Sie noch ein Huhn-Objekt).

        new SmallChickens(), // Create a SmallChickens object (Erstellen Sie ein SmallChickens-Objekt).
        new SmallChickens(), // Create another SmallChickens object (Erstellen Sie ein weiteres SmallChickens-Objekt).
        new SmallChickens(), // Create one more SmallChickens object (Erstellen Sie noch ein SmallChickens-Objekt).

        new Endboss() // Create an Endboss object (Erstellen Sie ein Endboss-Objekt).
    ],

    [
        new Coins(), // Create a Coins object (Erstellen Sie ein Münzen-Objekt).
        new Coins(), // Create another Coins object (Erstellen Sie ein weiteres Münzen-Objekt).
        new Coins(), // Create one more Coins object (Erstellen Sie noch ein Münzen-Objekt).
        new Coins(), // Create another Coins object (Erstellen Sie ein weiteres Münzen-Objekt).
        new Coins(), // Create one more Coins object (Erstellen Sie noch ein Münzen-Objekt).
        new Coins(), // Create another Coins object (Erstellen Sie ein weiteres Münzen-Objekt).
        new Coins(), // Create one more Coins object (Erstellen Sie noch ein Münzen-Objekt).
        new Coins() // Create another Coins object (Erstellen Sie ein weiteres Münzen-Objekt).
    ],

    [
        new Bottle(), // Create a Bottle object (Erstellen Sie ein Flaschen-Objekt).
        new Bottle(), // Create another Bottle object (Erstellen Sie ein weiteres Flaschen-Objekt).
        new Bottle(), // Create one more Bottle object (Erstellen Sie noch ein Flaschen-Objekt).
        new Bottle() // Create another Bottle object (Erstellen Sie ein weiteres Flaschen-Objekt).
    ],

    [
        new Cloud(), // Create a Cloud object (Erstellen Sie ein Wolken-Objekt).
        new Cloud(), // Create another Cloud object (Erstellen Sie ein weiteres Wolken-Objekt).
        new Cloud(), // Create one more Cloud object (Erstellen Sie noch ein Wolken-Objekt).
        new Cloud(), // Create another Cloud object (Erstellen Sie ein weiteres Wolken-Objekt).
        new Cloud(), // Create one more Cloud object (Erstellen Sie noch ein Wolken-Objekt).
        new Cloud(), // Create another Cloud object (Erstellen Sie ein weiteres Wolken-Objekt).
        new Cloud(), // Create one more Cloud object (Erstellen Sie noch ein Wolken-Objekt).
        new Cloud() // Create another Cloud object (Erstellen Sie ein weiteres Wolken-Objekt).
    ],

    [
        new BackgroundObject('img/5_background/layers/air.png', -719), // Create a BackgroundObject with air image (Erstellen Sie ein BackgroundObject mit Luftbild).
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719), // Create a BackgroundObject with the third layer image (Erstellen Sie ein BackgroundObject mit dem Bild der dritten Ebene).
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719), // Create a BackgroundObject with the second layer image (Erstellen Sie ein BackgroundObject mit dem Bild der zweiten Ebene).
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719), // Create a BackgroundObject with the first layer image (Erstellen Sie ein BackgroundObject mit dem Bild der ersten Ebene).

        new BackgroundObject('img/5_background/layers/air.png', 0), // Create a BackgroundObject with air image (Erstellen Sie ein BackgroundObject mit Luftbild).
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0), // Create a BackgroundObject with the third layer image (Erstellen Sie ein BackgroundObject mit dem Bild der dritten Ebene).
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0), // Create a BackgroundObject with the second layer image (Erstellen Sie ein BackgroundObject mit dem Bild der zweiten Ebene).
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0), // Create a BackgroundObject with the second layer image (Erstellen Sie ein BackgroundObject mit dem Bild der zweiten Ebene).
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0), // Create a BackgroundObject with the first layer image (Erstellen Sie ein BackgroundObject mit dem Bild der ersten Ebene).
        new BackgroundObject('img/5_background/layers/air.png', 719), // Create a BackgroundObject with air image (Erstellen Sie ein BackgroundObject mit Luftbild).
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719), // Create a BackgroundObject with the third layer image (Erstellen Sie ein BackgroundObject mit dem Bild der dritten Ebene).
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719), // Create a BackgroundObject with the second layer image (Erstellen Sie ein BackgroundObject mit dem Bild der zweiten Ebene).
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719), // Create a BackgroundObject with the first layer image (Erstellen Sie ein BackgroundObject mit dem Bild der ersten Ebene).

        new BackgroundObject('img/5_background/layers/air.png', 719 * 2), // Create a BackgroundObject with air image (Erstellen Sie ein BackgroundObject mit Luftbild).
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2), // Create a BackgroundObject with the third layer image (Erstellen Sie ein BackgroundObject mit dem Bild der dritten Ebene).
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2), // Create a BackgroundObject with the second layer image (Erstellen Sie ein BackgroundObject mit dem Bild der zweiten Ebene).
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2), // Create a BackgroundObject with the second layer image (Erstellen Sie ein BackgroundObject mit dem Bild der zweiten Ebene).
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2), // Create a BackgroundObject with the first layer image (Erstellen Sie ein BackgroundObject mit dem Bild der ersten Ebene).
        new BackgroundObject('img/5_background/layers/air.png', 719 * 3), // Create a BackgroundObject with air image (Erstellen Sie ein BackgroundObject mit Luftbild).
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3), // Create a BackgroundObject with the third layer image (Erstellen Sie ein BackgroundObject mit dem Bild der dritten Ebene).
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3), // Create a BackgroundObject with the second layer image (Erstellen Sie ein BackgroundObject mit dem Bild der zweiten Ebene).
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3) // Create a BackgroundObject with the first layer image (Erstellen Sie ein BackgroundObject mit dem Bild der ersten Ebene).
    ]
);