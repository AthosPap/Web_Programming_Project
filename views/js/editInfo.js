let button = document.querySelector(".change-btn");
let username = document.getElementsByName("username")[0];
let name = document.getElementsByName("name")[0];
let surname = document.getElementsByName("surname")[0];
let email = document.getElementsByName("email")[0];
let phone = document.getElementsByName("phone")[0];
let birthdate = document.getElementsByName("birthdate")[0];
let form = document.querySelector("form");
let card = document.querySelector(".card");
let warning = document.querySelector(".warning");
button.onclick = b1;
window.addEventListener("DOMContentLoaded", request);

function b1() {
    button.setAttribute("class", "btn btn-success");
    button.innerHTML = "Αποθήκευση αλλαγών";
    card.style.height = '600px';
    let inputs = form.getElementsByTagName("input");
    for (inp of inputs) {
        if (inp.name != "username" && inp.name != "email") {
            inp.removeAttribute("disabled");
        }
    }
    button.onclick = b2;
}

function b2() {
    warning.innerHTML = '';
    let data = {
        name: name.value,
        surname: surname.value,
        phone: phone.value,
        birthdate: birthdate.value
    };
    fetch("/user-info.html", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(
        (resp) => resp.json().then(
            (Jsonobj) => {
                if (Jsonobj.resp == "notPhone") {
                    card.style.height = '600px';
                    warning.innerHTML = 'Η μορφή του τηλεφώνου είναι λανθασμένη'
                }
                else {
                    button.setAttribute("class", "btn btn-warning");
                    button.innerHTML = "Αλλαγή στοιχείων&nbsp;<i class='fas fa-edit'></i>";
                    card.style.height = '560px';
                    let inputs = form.getElementsByTagName("input");
                    for (inp of inputs) {
                        inp.setAttribute("disabled", "");
                    }
                    button.onclick = b1;
                    request();
                }
            }))
}

function request() {
    fetch("/user-info/info").then(
        (response) => response.json().then(
            (userInfoJson) => {
                username.value = userInfoJson.username;
                name.value = userInfoJson.name;
                surname.value = userInfoJson.surname;
                email.value = userInfoJson.email;
                phone.value = userInfoJson.phone;
                birthdate.value = userInfoJson.birthdate;
            })
    )
}