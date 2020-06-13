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
    tds[0].innerHTML = participation.name;
    tds[1].innerHTML = participation.surname;
    tds[2].innerHTML = participation.email;
    tds[3].innerHTML = participation.phone;
    let button = document.createElement("button");
    button.setAttribute("class", "btn btn-danger");
    button.innerText = 'Αφαίρεση';
    button.addEventListener("click", function () {
        let data = {
            username: participation.username,
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
    tds[0].innerHTML = participation.name;
    tds[1].innerHTML = participation.surname;
    tds[2].innerHTML = participation.email;
    tds[3].innerHTML = participation.phone;
    tds[4].innerHTML = participation.teammatename;
    tds[5].innerHTML = participation.teammateemail;
    tds[6].innerHTML = participation.teammatephone;
    let button = document.createElement("button");
    button.setAttribute("class", "btn btn-danger");
    button.innerText = 'Αφαίρεση';
    button.addEventListener("click", function () {
        let data = {
            username: participation.username,
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
    let input;
}

function addParticipation1() {
    
}