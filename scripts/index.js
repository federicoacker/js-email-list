const emailListContainerEl = document.querySelector("#email-list-container");

function createEmailEntry(number, name, email){
    return `
    <tr>
        <td>${number}</td>
        <td>${name}</td>
        <td>${email}</td>
    </tr>
    `
}