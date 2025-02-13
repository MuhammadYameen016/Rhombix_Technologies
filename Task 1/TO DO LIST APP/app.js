const getUI = document.getElementById('ul')

function add(){
    const getInp = document.getElementById('input')
    if(getInp.value == ""){
        alert('Please Enter a value!')
    } else{
    getUI.innerHTML += `<li> ${getInp.value} <button onclick = "deleteSingle(this)" class="btn3"> Delete </button> <button onclick = "updateItem(this)" class="btn4"> Update </button> </li>`;
    getInp.value = ""
}    
}

function deleteAll(){
    getUI.innerHTML = "";
}

function deleteSingle(e){
    e.parentNode.remove()
}

function updateItem(e){
    let getPrompt = prompt("Enter any update you want: ", e.parentNode.firstChild.textContent)
    e.parentNode.firstChild.textContent = getPrompt
}