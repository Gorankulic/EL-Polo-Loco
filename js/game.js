let canvas;
let world;
let keyboard;
let gameStarted = false; // Tracks whether the game has started


/**
 * Initializes the game by setting up the keyboard, canvas, and world objects.

 */
function init() {
    keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    window.world = world; // Make the world instance globally accessible
    const character = world.character;
    removeStartScreenInfo();
}

/**
 * Starts the game by hiding the start screen, showing control bars, hiding the Impressum button,
 * and starting animations for the game objects.
 */
function removeStartScreenInfo() {
    hideStartScreen();
    showControlBars();
    hideImpressumButton();
    startAnimations();
    hideBigHomeButton();
}

/**
 * Ends the current game session and returns to the home screen.
 * Stops game processes and displays the start screen.
 */
function returnToHomeSite() {
    world.pauseAllGameSoundsAtTheEnd();
    showStartScreen();

    hideBigHomeButton();
}

/**
 * Hides the start screen by setting its display style to 'none'.
 */
function hideStartScreen() {
    document.getElementById('startScreen').style.display = 'none';

}

/**
 * Handles the start button click event.
 * Initializes a new game if not started, or restarts the game if already running.
 */
function handleStartButtonClick() {
    if (!gameStarted) {
        init(); // Start a new game
    } else {
        restartGame(); // Reset and restart the game
    }
    gameStarted = true; // Set to true after the first click
}

function restartGame() {
    if (window.world) {
        world.resetGameLoopAndStopOrientation();
        world.prepareGameforNewStart(); // Ensure old intervals and sounds are stopped
    }
    keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    window.world = world;
    removeStartScreenInfo();
}

function showStartScreen() {
    document.getElementById('impressumDatenschutzButton').classList.remove('hidden');
    document.getElementById('startScreen').style.display = 'flex';
    hideBigHomeButton();

}

function showBigHomeButton() {
    const homeButton = document.getElementById('home-restart-button-at-the-end-of-the-game');
    homeButton.classList.remove('hidden'); // Add the 'hidden' class to hide the button

}

function hideBigHomeButton() {
    const homeButton = document.getElementById('home-restart-button-at-the-end-of-the-game');
    homeButton.classList.add('hidden');
}



/**
 * Displays all elements with the class 'bottom-control-bar' by removing the 'hidden' class.
 */
function showControlBars() {
    const controlBars = document.getElementsByClassName('bottom-control-bar');
    for (let controlBar of controlBars) {
        controlBar.classList.remove('hidden');
    }
}

/**
 * Hides the Impressum button by adding the 'hidden' class to its element.
 */
function hideImpressumButton() {
    const impressumButton = document.getElementById('impressumDatenschutzButton');
    impressumButton.classList.add('hidden');
}

/**
 * Reloads the page and ends the current game routine.
 */
function reloadPage() {
    location.reload();
}

/**
 * Starts animations for all enemies in the current level.
 * Specifically animates enemies of type Chicken and SmallChickens.
 */
function startAnimations() {
    world.level.enemies.forEach(enemy => {
        if (enemy instanceof Chicken || enemy instanceof SmallChickens || enemy instanceof Endboss) {
            enemy.animate();
        }
    });
}

/**
 * Displays the Impressum popup with dynamically injected content.
 */
function showImpressumPopup() {
    const popup = document.getElementById('impressumPopup');
    const popupText = document.getElementById('impressumText');


    popupText.innerHTML = `
        <div id='generator_results'>
<div id='generator_results_content'>
<h1>Datenschutzhinweise</h1>
<h2>Verantwortlicher</h2>
<p>Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutz-Grundverordnung (DSGVO), ist:</p>
<p class='generator_user_input'>Goran Kulic</p>
<h2>Ihre Betroffenenrechte</h2>
<p>Unter den angegebenen Kontaktdaten können Sie gemäß EU-Datenschutz-Grundverordnung (DSGVO) jederzeit folgende Rechte ausüben:</p>
<ul>
<li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO),</li>
<li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),</li>
<li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),</li>
<li>Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht löschen dürfen (Art. 18 DSGVO),</li>
<li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO) und</li>
<li>Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben (Art. 20 DSGVO).</li>
</ul>
<p>Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen.</p>
<p>Sie können sich jederzeit mit einer Beschwerde an eine Aufsichtsbehörde wenden, z. B. an die zuständige Aufsichtsbehörde des Bundeslands Ihres Wohnsitzes oder an die für uns als verantwortliche Stelle zuständige Behörde.</p>
<p>Eine Liste der Aufsichtsbehörden (für den nichtöffentlichen Bereich) mit Anschrift finden Sie unter: <a href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html">https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html</a>.</p>
<h2>Verarbeitungstätigkeiten</h2>
<h3>Erfassung allgemeiner Informationen beim Besuch unserer Website</h3>
<h4>Art und Zweck der Verarbeitung</h4>
<p>Wenn Sie auf unsere Website zugreifen, d.h., wenn Sie sich nicht registrieren oder anderweitig Informationen übermitteln, werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers, Ihre IP-Adresse und ähnliches.</p>
<p>Sie werden insbesondere zu folgenden Zwecken verarbeitet:</p>
<ul>
<li>Sicherstellung und Auswertung der Systemsicherheit und -stabilität, insbesondere zur Missbrauchserkennung</li>
</ul>
<p>Wir verwenden Ihre Daten nicht, um Rückschlüsse auf Ihre Person zu ziehen. Allerdings behalten wir uns vor, die Server-Logfiles nachträglich zu überprüfen, sollten konkrete Anhaltspunkte auf eine rechtswidrige Nutzung hinweisen.</p>
<h4>Rechtsgrundlage und berechtigtes Interesse</h4>
<p>Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an der Verbesserung der Stabilität und Funktionalität unserer Website sowie der Sicherstellung der Systemsicherheit und Missbrauchserkennung.</p>
<h4>Empfänger</h4>
<p>Empfänger der Daten sind ggf. technische Dienstleister, die für den Betrieb und die Wartung unserer Webseite als Auftragsverarbeiter tätig werden.</p>
<h4>Speicherdauer</h4>
<p>Daten werden in Server-Log-Dateien in einer Form, die die Identifizierung der betroffenen Personen ermöglicht, maximal für 14 gespeichert; es sei denn, dass ein sicherheitsrelevantes Ereignis auftritt (z.B. ein DDoS-Angriff).</p>
<p>Im Falle eines solchen Ereignisses werden Server-Log-Dateien bis zur Beseitigung und vollständigen Aufklärung des sicherheitsrelevanten Ereignisses gespeichert.</p>
<h4>Bereitstellung vorgeschrieben oder erforderlich</h4>
<p>Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder gesetzlich noch vertraglich vorgeschrieben. Ohne die IP-Adresse ist jedoch der Dienst und die Funktionsfähigkeit unserer Website nicht gewährleistet. Zudem können einzelne Dienste und Services nicht verfügbar oder eingeschränkt sein.</p>
<h4>Widerspruch</h4>
<p>Lesen Sie dazu die Informationen über Ihr Widerspruchsrecht nach Art. 21 DSGVO weiter unten.</p>
<h2>Information über Ihr Widerspruchsrecht nach Art. 21 DSGVO</h2>
<h3>Einzelfallbezogenes Widerspruchsrecht</h3>
<p>Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund Art. 6 Abs. 1 lit. f DSGVO (Datenverarbeitung auf der Grundlage einer Interessenabwägung) erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmung gestütztes Profiling im Sinne von Art. 4 Nr. 4 DSGVO.</p>
<p>Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.</p>
<h3>Empfänger eines Widerspruchs</h3>
<p class='generator_user_input'>Goran Kulic<br />
Papinstr. 35<br />
81249 München<br />
Telefon: +491742199994<br />
E-Mail: gorankulic@outlook.com</p>
<h2>Änderung unserer Datenschutzerklärung</h2>
<p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.</p>
<h2>Fragen zum Datenschutz</h2>
<p>Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail an den oben genannten Verantwortlichen.</p>
<h2>Urheberrechtliche Hinweise</h2>
<p><em>Diese Datenschutzerklärung wurde mit Hilfe der activeMind AG erstellt – den Experten für <a href="https://www.activemind.de/datenschutz/datenschutzbeauftragter/" target="_blank" rel="noopener dofollow">externe Datenschutzbeauftragte</a> (Version #2024-10-25).</em></p>
</div>
<h1>Quellen der in diesem Projekt verwendeten Bilder</h1>
<p>
  Der Hintergrund ist ein KI-GENERIERTES Bild. Bildnachweis: Das verwendete Wüstenbild wurde mit DALL·E von OpenAI erstellt, einem generativen KI-Bildtool. Das Design zeigt eine Cartoon-Wüstenlandschaft mit einem Farbverlauf am Himmel, Kakteen und Wüstentieren, angepasst für die Nutzung im Projekt.
</p>
<ul>
  <li><a href="https://www.flaticon.com/free-icons/restart" title="restart icons">Neustart-Symbole erstellt von Rakib Hassan Rahim - Flaticon</a></li>
  <li><a target="_blank" href="https://icons8.com/icon/2797/home">Home</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a></li>
  <li><a href="https://www.flaticon.com/free-icons/keyboard-command" title="keyboard command icons">Tastaturbefehl-Symbole erstellt von shohanur.rahman13 - Flaticon</a></li>
  <li><a target="_blank" href="https://icons8.com/icon/3Apt7KAlK2HU/space-key">Leertaste</a>-Symbol von <a target="_blank" href="https://icons8.com">Icons8</a></li>
  <li><a href="https://www.flaticon.com/free-icons/keyboard-command" title="keyboard command icons">Tastaturbefehl-Symbole erstellt von shohanur.rahman13 - Flaticon</a> (D-Taste-Symbol)</li>
  <li><a href="https://www.flaticon.com/free-icons/speaker" title="speaker icons">Lautsprecher-Symbole erstellt von Pixel perfect - Flaticon</a></li>
  <li><a href="https://www.flaticon.com/free-icons/mute" title="mute icons">Stumm-Symbole erstellt von Mayor Icons - Flaticon</a></li>
  <li><a href="https://fontmeme.com/fonts/zabars-font/">Im Spiel verwendete Schriftart</a> von FontMeme</li>
</ul>

</div>
        <h1>Impressum</h1>
        <p>Goran Kulic<br />
        Papinstr. 35<br />
        81249 München</p>
        <h2>Kontakt</h2>
        <p>Telefon: +491742199994<br />
        E-Mail: gorankulic@outlook.com</p>
    `;

    popup.classList.add('popup');
}

/**
 * Hides the Impressum popup by removing the 'popup' class from its element.
 */
function closeImpressumPopup() {
    const popup = document.getElementById('impressumPopup');
    popup.classList.remove('popup');
}

/**
 * Closes the Impressum popup when clicking on the body, except on popup content or the Impressum button.
 */
document.addEventListener('click', function (event) {
    const popup = document.getElementById('impressumPopup');
    const popupContent = document.querySelector('.popup-content');
    const impressumButton = document.getElementById('impressumDatenschutzButton');

    if (popup.classList.contains('popup') &&
        (event.target === popup ||
            (!popupContent.contains(event.target) && event.target !== impressumButton))) {
        closeImpressumPopup();
    }
});