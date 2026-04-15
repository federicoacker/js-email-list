//URL DELL'API
const EMAIL_API_URL = "https://flynn.boolean.careers/exercises/api/random/mail";
//VARIABILI

const dom = {
    emailListContainerEl : document.querySelector("#email-list-container"),
    createList15Btn : document.querySelector("#create-list-15"),
    createList20Btn : document.querySelector("#create-list-20"),
    createList100Btn : document.querySelector("#create-list-100"),
}

let emailsHTMLArray = []; // Inizializiamo un Array vuoto

// Funzione che crea la stringa html per una singola entry
function createEmailEntry(number, name, email){
    return `
    <tr>
        <td>${number}</td>
        <td>${name}</td>
        <td>${email}</td>
    </tr>
    `
}
// Funzione che crea la email list, accetta il numero di entry che vogliamo creare, di default 10
function createEmailList(number = 10){

    emailsHTMLArray.length = 0; // Prima cosa, settiamo la lunghezza dell'array a 0 (per quando schiacciamo i bottoni)

    for(let i = 0; i<number; i++){                                                  // Poi iteriamo per il numero di email che vogliamo avere
        fetch(EMAIL_API_URL)                                                        // Facciamo il fetch ed otteniamo la promessa dall'API
        .then((response) => response.json())                                        // Poi usando, then, gli dico cosa fare una volta che avrò il dato effettivo, con la response
                                                                                    // uso .json() per ottenere la promessa del json che è nel body della response
        .then((responseJson) => {                                                   // Poi vado di nuovo di then, prendendomi la promessa del json, una volta che avrò il json:
            const {success, response} = responseJson;                               // Lo destrutturo in variabile success e response
            if(success){                                                            // Se success era true
                let name = response.split("@")[0];                                  //Selezioniamo la prima parte della email, che sarà per me, il mio nome
                const nameArray = name.split('');                                   //La splitto in un array
                nameArray[0] = nameArray[0].toUpperCase();                          //Rendo uppercase la prima lettera
                name = nameArray.join('');                                          //Rejoino l'array in un'unica variabile che sarà il name
                const emailHTML = createEmailEntry(i, name, response);              //creo la stringa html, dandogli i dati che ho recuperato dalla fetch
                emailsHTMLArray.push(emailHTML);                                    //La pusho nell'array
                if(emailsHTMLArray.length === number){                              //Una volta che l'array avrà length === al numero di email che avevamo richiesto
                    dom.emailListContainerEl.innerHTML = emailsHTMLArray.join("");  // Allora aggiorno l'innerHTML con tutte le stringhe dell'array
                                                                                    // Joinate con join("");
                }
            }
        });
    }
}

//Funzione handler per il pulsante che crea 15 entries
function createList15BtnHandler(){
    createEmailList(15);
}
//Funzione handler per il pulsante che crea 20 entries
function createList20BtnHandler(){
    createEmailList(20);
}
//Funzione handler per il pulsante che crea 100 entries
function createList100BtnHandler(){
    createEmailList(100);
}

//Creiamo una prima emailList
createEmailList(15);

//Aggiungiamo gli eventListener per il click
dom.createList15Btn.addEventListener("click", createList15BtnHandler);
dom.createList20Btn.addEventListener("click", createList20BtnHandler);
dom.createList100Btn.addEventListener("click", createList100BtnHandler);
