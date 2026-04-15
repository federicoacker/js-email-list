const emailListContainerEl = document.querySelector("#email-list-container");
const EMAIL_API_URL = "https://flynn.boolean.careers/exercises/api/random/mail";
function createEmailEntry(number, name, email){
    return `
    <tr>
        <td>${number}</td>
        <td>${name}</td>
        <td>${email}</td>
    </tr>
    `
}

// Andiamo ora ad usare la fetchAPI, creando una funzione il cui compito è generarmi 10 email
function fetchEmail(){
    let counter = 0;
    fetch(EMAIL_API_URL)
    .then((response) => response.json())
    .then((responseJson) => {
        const {success, response} = responseJson;
        if(success){
            const name = response.split("@")[0]; //Selezioniamo la prima parte della email, che sarà per me, il mio nome
            const nameArray = name.split('');
            nameArray[0] = nameArray[0].toUpperCase;
            name = nameArray.join('');
            const emailHTML = createEmailEntry(0, name, response);
            emailListContainerEl.innerHTML += emailHTML;
        }
    });
}

fetchEmail();