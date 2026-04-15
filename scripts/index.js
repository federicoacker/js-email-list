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
let counter = 0;
// Andiamo ora ad usare la fetchAPI, creando una funzione il cui compito è generarmi 10 email
async function fetchEmail(){
    
    let innerHTMLString = "";
    innerHTMLString = await fetch(EMAIL_API_URL)
    .then((response) => response.json())
    .then((responseJson) => {
        const {success, response} = responseJson;
        if(success){
            let name = response.split("@")[0]; //Selezioniamo la prima parte della email, che sarà per me, il mio nome
            const nameArray = name.split('');
            nameArray[0] = nameArray[0].toUpperCase();
            name = nameArray.join('');
            
            const emailHTML = createEmailEntry(counter, name, response);
            counter++;
            return emailHTML;
        }
    });
    emailListContainerEl.innerHTML += await innerHTMLString;
}

for(let i = 0; i<15; i++){
    fetchEmail();
}