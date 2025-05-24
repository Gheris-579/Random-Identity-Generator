// --- Funzione per la generazione dell'identità (trasposta da Python a JS) ---
function generateRandomIdentityData() {
    const firstNames = [
        "Mario", "Giulia", "Andrea", "Sofia", "Marco", "Anna", "Luca", "Laura",
        "Giovanni", "Sara", "Alessio", "Elena", "Francesco", "Martina", "Simone", "Chiara",
        "Alessandro", "Aurora", "Leonardo", "Valentina", "Pietro", "Beatrice", "Federico", "Greta"
    ];
    const lastNames = [
        "Rossi", "Bianchi", "Ferrari", "Russo", "Mancini", "Conti", "Ricci", "Bruno",
        "Gallo", "Costa", "Romano", "Marino", "Greco", "Lombardi", "Moretti", "Barbieri",
        "Fontana", "Santoro", "Mariani", "Rizzo", "Caruso", "Esposito", "Colombo", "Galli"
    ];
    const streets = [
        "Via Roma", "Via Milano", "Via Garibaldi", "Via Mazzini", "Corso Italia",
        "Piazza Duomo", "Via Verdi", "Via Dante", "Viale della Libertà", "Via Po",
        "Via Appia", "Via Cristoforo Colombo", "Via Cavour", "Via Amendola", "Via Don Luigi Sturzo"
    ];
    const cities = [
        "Roma", "Milano", "Napoli", "Torino", "Palermo", "Genova", "Bologna", "Firenze",
        "Bari", "Catania", "Venezia", "Verona", "Messina", "Padova", "Trieste", "Taranto",
        "Brescia", "Prato", "Reggio Calabria", "Modena", "Parma", "Perugia", "Pescara", "Lecce", "Durrës", "Tirana", "Vlorë"
    ];
    const provinces = [
        "RM", "MI", "NA", "TO", "PA", "GE", "BO", "FI", "BA", "CT", "VE", "VR", "ME",
        "PD", "TS", "TA", "BS", "PO", "RC", "MO", "PR", "PG", "PE", "LE", "AL"
    ];
    const domains = ["example.com", "test.it", "randommail.net", "generatemail.org", "fakemail.co", "mail.al"];

    const firstName = randomChoice(firstNames);
    const lastName = randomChoice(lastNames);
    const gender = randomChoice(["Male", "Female", "Non-binary"]);

    // Genera una data di nascita casuale (tra 18 e 65 anni fa)
    const today = new Date();
    const minBirthYear = today.getFullYear() - 65;
    const maxBirthYear = today.getFullYear() - 18;
    const randomYear = Math.floor(Math.random() * (maxBirthYear - minBirthYear + 1)) + minBirthYear;
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const randomDay = Math.floor(Math.random() * 28) + 1; // Per evitare problemi con mesi da 30/31 giorni
    const dob = new Date(randomYear, randomMonth - 1, randomDay).toISOString().slice(0, 10);

    const streetName = randomChoice(streets);
    const houseNumber = Math.floor(Math.random() * 200) + 1;
    const city = randomChoice(cities);
    const zipCode = String(Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000);
    const province = randomChoice(provinces);

    let phonePrefix = "+39";
    if (["Durrës", "Tirana", "Vlorë"].includes(city)) {
        phonePrefix = "+355";
    }
    const phoneNumber = `${phonePrefix} ${Math.floor(Math.random() * (399 - 300 + 1)) + 300} ${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`;

    const emailUsername = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 99) + 1}`;
    const email = `${emailUsername}@${randomChoice(domains)}`;

    const roles = ["Student", "Professor", "Admin"];
    const role = randomChoice(roles);
    let idPrefix = "";
    if (role === "Student") {
        idPrefix = "S";
    } else if (role === "Professor") {
        idPrefix = "P";
    } else {
        idPrefix = "A";
    }
    const idNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const userId = `${idPrefix}${idNumber}`;

    // Genera una password semplice (per testing, non per produzione!)
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 10; i++) {
        password += randomChoice(Array.from(characters));
    }

    const identity = {
        "User ID": userId,
        "Role": role,
        "First Name": firstName,
        "Last Name": lastName,
        "Gender": gender,
        "Date of Birth": dob,
        "Address": `${streetName} ${houseNumber}, ${zipCode} ${city} (${province})`,
        "Phone Number": phoneNumber,
        "Email": email,
        "Password (Plain Text - for testing only!)": password
    };

    return identity;
}

// Funzione helper per scegliere un elemento casuale da un array
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// --- Funzioni per l'interfaccia utente ---
document.addEventListener('DOMContentLoaded', () => {
    const numIdentitiesInput = document.getElementById('numIdentities');
    const generateBtn = document.getElementById('generateBtn');
    const outputArea = document.getElementById('outputArea');
    const copyAutoCheckbox = document.getElementById('copyAuto');
    const includePasswordCheckbox = document.getElementById('includePassword');
    const copyAllBtn = document.getElementById('copyAllBtn');
    const clearBtn = document.getElementById('clearBtn');

    generateBtn.addEventListener('click', () => {
        let numToGenerate = parseInt(numIdentitiesInput.value, 10);

        if (isNaN(numToGenerate) || numToGenerate <= 0) {
            alert("Per favore, inserisci un numero valido maggiore di zero.");
            return;
        }
        if (numToGenerate > 10) {
            if (!confirm("Generare un numero così elevato di identità potrebbe rallentare la pagina. Continuare?")) {
                return;
            }
        }

        outputArea.innerHTML = ''; // Pulisce l'area di output
        let allGeneratedText = [];

        for (let i = 0; i < numToGenerate; i++) {
            const identity = generateRandomIdentityData();
            let identityHtml = `<h3>--- Identità ${i + 1} ---</h3>`;
            let identityPlainText = `--- Identità ${i + 1} ---\n`;

            for (const key in identity) {
                if (key.includes("Password") && !includePasswordCheckbox.checked) {
                    continue; // Salta la password se la checkbox è disattivata
                }
                identityHtml += `<p><strong>${key}:</strong> ${identity[key]}</p>`;
                identityPlainText += `${key}: ${identity[key]}\n`;

                if (key.includes("Password")) {
                    identityHtml += `<p class="warning-text">ATTENZIONE: Questa password è generata in testo semplice SOLO per testing. NON usarla in produzione!</p>`;
                    identityPlainText += `ATTENZIONE: Questa password è generata in testo semplice SOLO per testing. NON usarla in produzione!\n`;
                }
            }
            identityHtml += '<br>'; // Spazio tra le identità HTML
            identityPlainText += '\n'; // Spazio tra le identità in testo semplice

            outputArea.innerHTML += identityHtml;
            allGeneratedText.push(identityPlainText);
        }

        // Copia automatica se solo una identità e checkbox attiva
        if (numToGenerate === 1 && copyAutoCheckbox.checked) {
            navigator.clipboard.writeText(allGeneratedText[0])
                .then(() => alert("Identità copiata negli appunti!"))
                .catch(err => console.error('Errore durante la copia: ', err));
        }
    });

    copyAllBtn.addEventListener('click', () => {
        const textContent = outputArea.innerText.trim(); // Usa innerText per ottenere solo il testo
        if (textContent) {
            navigator.clipboard.writeText(textContent)
                .then(() => alert("Tutti i dati generati sono stati copiati negli appunti!"))
                .catch(err => console.error('Errore durante la copia: ', err));
        } else {
            alert("Non ci sono dati da copiare.");
        }
    });

    clearBtn.addEventListener('click', () => {
        outputArea.innerHTML = '';
    });
});