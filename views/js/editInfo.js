let button = document.querySelector(".change-btn");
let username = document.getElementsByName("username")[0];
let name = document.getElementsByName("name")[0];
let surname = document.getElementsByName("surname")[0];
let email = document.getElementsByName("email")[0];
let phone = document.getElementsByName("phone")[0];
let birthdate = document.getElementsByName("birthdate")[0];
let form = document.querySelector("form");
let card = document.querySelector(".card");
button.onclick = b1;
window.addEventListener("DOMContentLoaded", request);

function b1(){
    button.setAttribute("class","btn btn-success");
    button.innerHTML = "Αποθήκευση αλλαγών";
    card.style.height = '600px';
    let inputs = form.getElementsByTagName("input");
    for (inp of inputs){
        if(inp.name != "username" &&inp.name != "email"){
            inp.removeAttribute("disabled");
        }
    }
    button.onclick = b2;
}

function b2(){
    form.submit();
    button.setAttribute("class","btn btn-warning");
    button.innerHTML = "Αλλαγή στοιχείων&nbsp;<i class='fas fa-edit'></i>";
    card.style.height = '560px';
    let inputs = form.getElementsByTagName("input");
    for (inp of inputs){
        inp.setAttribute("disabled", "");
    }
    button.onclick = b1;
}

function request(){
    console.log("requested");
    fetch("/user-info/info").then(
        (response) => response.json().then(
            (userInfoJson) => {
                console.log(userInfoJson);
                username.value = userInfoJson.username;
                name.value = userInfoJson.name;
                surname.value = userInfoJson.surname;
                email.value = userInfoJson.email;
                phone.value = userInfoJson.phone;
                birthdate.value = userInfoJson.birthdate;
            })
    )
}