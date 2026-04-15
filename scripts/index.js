const emailListContainerEl = document.querySelector("#email-list-container");
const EMAIL_API_URL = "https://flynn.boolean.careers/exercises/api/random/mail";
const createListBtn = document.querySelector("#create-list")
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
function createEmailList(number = 10){
    emailListContainerEl.innerHTML = "";
    for(let i = 0; i<number; i++){
        fetch(EMAIL_API_URL)
        .then((response) => response.json())
        .then((responseJson) => {
            const {success, response} = responseJson;
            if(success){
                let name = response.split("@")[0]; //Selezioniamo la prima parte della email, che sarà per me, il mio nome
                const nameArray = name.split('');
                nameArray[0] = nameArray[0].toUpperCase();
                name = nameArray.join('');
                const emailHTML = createEmailEntry(i, name, response);
                emailListContainerEl.innerHTML += emailHTML;
            }
        });
    }
}

function createListBtnHandler(){
    createEmailList(10);
}

createEmailList(10);

createListBtn.addEventListener("click", createListBtnHandler);
