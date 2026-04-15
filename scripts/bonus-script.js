const emailListContainerEl = document.querySelector("#email-list-container");
const createList15Btn = document.querySelector("#create-list-15");
const createList20Btn = document.querySelector("#create-list-20");
const createList100Btn = document.querySelector("#create-list-100");
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
let outerEmailHTML ="";
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
    return await innerHTMLString;
}

async function generateEmailList(number){
    let outerEmailHTML = '';
    for(let i = 0; i < number; i++){
        outerEmailHTML += await fetchEmail();
    }
    emailListContainerEl.innerHTML = outerEmailHTML;
}

generateEmailList();

function createList15BtnHandler(){
    counter = 0;
    generateEmailList(15);
}
function createList20BtnHandler(){
    counter = 0;
    generateEmailList(20);
}
function createList100BtnHandler(){
    counter = 0;
    generateEmailList(100);
}

generateEmailList(15);

createList15Btn.addEventListener("click", createList15BtnHandler);
createList20Btn.addEventListener("click", createList20BtnHandler);
createList100Btn.addEventListener("click", createList100BtnHandler);

