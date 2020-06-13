let table1 = document.querySelector("#tbody1");
let table2 = document.querySelector("#tbody2");
let button1 = document.querySelector("#btn1");
let button2 = document.querySelector("#btn2");
button1.addEventListener("click", addParticipation1);
button2.addEventListener("click", addParticipation2);
getParticipations();

function getParticipations() {
    table1.innerHTML = '';
    table2.innerHTML = '';
    fetch("/tournaments/all").then(
        (response) => response.json().then(
            (partJson) => {
                console.log("json = ", partJson);
                for (let part of partJson) {
                    if (part.tournamentID == 1) {
                        insertTable1(part);
                    }
                    if (part.tournamentID == 2) {
                        insertTable2(part);
                    }
                }
            })
    )
}

function insertTable1(participation) {
    let tr = document.createElement("tr");
    table1.appendChild(tr);
    tr.setAttribute("class", "table-primary")
    for (let i = 0; i < 5; i++) {
        let d = document.createElement("td");
        tr.appendChild(d);
    }
    tds = tr.getElementsByTagName("td");
    tds[1].innerHTML = participation.surname;
    tds[3].innerHTML = participation.phone;
    if (participation.username) {
        tds[0].innerHTML = participation.userName;
        tds[1].innerHTML = participation.userSurname;
        tds[2].innerHTML = participation.userEmail;
        tds[3].innerHTML = participation.userPhone;
    }
    else {
        tds[1].innerHTML = participation.surname;
        tds[3].innerHTML = participation.phone;
    }
    let button = document.createElement("button");
    button.setAttribute("class", "btn btn-danger");
    button.innerText = 'Αφαίρεση';
    button.addEventListener("click", function () {
        let data = {
            username: participation.username,
            surname: participation.surname,
            phone: participation.phone,
            id: 1
        };
        fetch("/tournaments.html", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(
            (resp) => resp.json().then(
                (Jsonobj) => {
                    getParticipations();
                }))
    })
    tds[4].appendChild(button);
}

function insertTable2(participation) {
    let tr = document.createElement("tr");
    table2.appendChild(tr);
    tr.setAttribute("class", "table-primary")
    for (let i = 0; i < 8; i++) {
        let d = document.createElement("td");
        tr.appendChild(d);
    }
    tds = tr.getElementsByTagName("td");
    tds[4].innerHTML = participation.teammatename;
    tds[5].innerHTML = participation.teammateemail;
    tds[6].innerHTML = participation.teammatephone;
    if (participation.username) {
        tds[0].innerHTML = participation.userName;
        tds[1].innerHTML = participation.userSurname;
        tds[2].innerHTML = participation.userEmail;
        tds[3].innerHTML = participation.userPhone;
    }
    else {
        tds[1].innerHTML = participation.surname;
        tds[3].innerHTML = participation.phone;
    }
    let button = document.createElement("button");
    button.setAttribute("class", "btn btn-danger");
    button.innerText = 'Αφαίρεση';
    button.addEventListener("click", function () {
        let data = {
            username: participation.username,
            surname: participation.surname,
            phone: participation.phone,
            id: 2
        };
        fetch("/tournaments.html", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(
            (resp) => resp.json().then(
                (Jsonobj) => {
                    getParticipations();
                }))
    })
    tds[7].appendChild(button);
}

function addParticipation1() {
    let div = button1.parentElement;
    div.removeChild(button1);
    let input1 = document.createElement("input");
    let input2 = document.createElement("input");
    let inputs = [input1, input2];
    input1.setAttribute("placeholder", "Επώνυμο");
    input2.setAttribute("placeholder", "Τηλέφωνο");
    input2.style.marginLeft = '10px';
    for (let inp of inputs) {
        div.appendChild(inp);
        inp.setAttribute("type", "text");
        inp.setAttribute("class", "form-control");
        inp.setAttribute("size", "10");
        inp.addEventListener("keypress", function (e) {
            if (e.key === 'Enter' && input1.value && input2.value) {
                let data = {
                    sub1: 'Δήλωση συμμετοχής',
                    surname: input1.value,
                    phone: input2.value
                };
                fetch("/tournaments.html", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(
                    (resp) => resp.json().then(
                        (Jsonobj) => {
                            div.innerHTML = '<button class="btn btn-info mt-3" id="btn1">Προσθήκη συμμετοχής</button>';
                            button1 = document.querySelector("#btn1");
                            button1.addEventListener("click", addParticipation1);
                            getParticipations();
                        }))
            }
        })
    }
}

function addParticipation2() {
    let div = button2.parentElement;
    div.removeChild(button2);
    let input1 = document.createElement("input");
    let input2 = document.createElement("input");
    let input3 = document.createElement("input");
    let input4 = document.createElement("input");
    let inputs = [input1, input2, input3, input4];
    input1.setAttribute("placeholder", "Επώνυμο");
    input2.setAttribute("placeholder", "Τηλέφωνο");
    input3.setAttribute("placeholder", "Επώνυμο συμπαίκτη");
    input4.setAttribute("placeholder", "Τηλέφωνο συμπαίκτη");
    for (let inp of inputs) {
        div.appendChild(inp);
        inp.setAttribute("type", "text");
        inp.setAttribute("class", "form-control");
        inp.setAttribute("size", "10");
        inp.style.marginLeft = '10px';
        inp.addEventListener("keypress", function (e) {
            if (e.key === 'Enter' && input1.value && input2.value && input3.value && input4.value) {
                let data = {
                    sub2: 'Δήλωση συμμετοχής',
                    surname: input1.value,
                    phone: input2.value,
                    teamSurname: input3.value,
                    teamPhone: input4.value
                };
                fetch("/tournaments.html", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(
                    (resp) => resp.json().then(
                        (Jsonobj) => {
                            div.innerHTML = '<button class="btn btn-info mt-3" id="btn2">Προσθήκη συμμετοχής</button>';
                            button2 = document.querySelector("#btn2");
                            button2.addEventListener("click", addParticipation2);
                            getParticipations();
                        }))
            }
        })
    }
}