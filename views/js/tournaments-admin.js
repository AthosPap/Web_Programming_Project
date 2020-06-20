let container = document.querySelector(".container");
const html = `<div class="jumbotron mt-3">
<div class="d-flex justify-content-end">
    <button class="btn btn-danger btn-remove"><i class="fa fa-times" aria-hidden="true"></i></button>
</div>
<div class="d-flex justify-content-around">
    <div>
        <div>
            <h5 id="talk" class="mb-4 name">Καλοκαιρινό Μονό Ενηλίκων</h5>
            <p class="dates"> Ημερομηνίες διεξαγωγής: 12 Ιουλίου - 19 Ιουλίου 2020</p>
        </div>
        <div>
            <p>
            <h6>Συμμετέχοντες:</h6>
            </p>
        </div>
        <div>
            <table class="table">
                
            </table>
        </div>
        <div class="d-flex justify-content-center">
            <button class="btn btn-info btn-add mt-3">Προσθήκη συμμετοχής</button>
        </div>
    </div>
</div>
</div>`;
const table1html = `<thead>
<tr class="table-secondary">
    <th scope="col">Όνομα</th>
    <th scope="col">Επώνυμο</th>
    <th scope="col">Email</th>
    <th scope="col">Τηλέφωνο</th>
    <th></th>
</tr>
</thead>
<tbody>

</tbody>`;
const table2html = `<thead>
<tr class="table-secondary">
    <th scope="col">Όνομα</th>
    <th scope="col">Επώνυμο</th>
    <th scope="col">Email</th>
    <th scope="col">Τηλέφωνο</th>
    <th scope="col">Όνομα συμπαίκτη</th>
    <th scope="col">Email συμπαίκτη</th>
    <th scope="col">Τηλέφωνο συμπαίκτη</th>
    <th></th>
</tr>
</thead>
<tbody>

</tbody>`;
const formhtml = `<form>
<div class="form-group">
    <label for="name">Όνομα Τουρνουά</label>
    <input type="text" class="form-control" size="40" id="name" name="name">
</div>
<div class="form-group">
    <label for="dates">Ημερομηνίες διεξαγωγής</label>
    <input type="text" class="form-control" size="40" id="dates" name="dates">
</div>
<div class="form-group">
    <label for="type">Τύπος Τουρνουά</label>
    <select class="form-control" id="type">
        <option value="singles">Μονά</option>
        <option value="doubles">Διπλά</option>
    </select>
</div>
<div class="form-group">
    <label for="dates">Φωτογραφία Τουρνουά</label><br>
    <input type="file" enctype="multipart/form-data" id="photo" name="photo">
</div>
<div class="form-group d-flex justify-content-center">
    <input type="button" class="btn btn-primary" id="sub" name="sub" value="Δημιουργία Τουρνουά">
</div>
</form>`;
let newTour = document.querySelector("#addTournament");
newTour.addEventListener("click", addNewTournament);
getTournaments();
getParticipations();

function getTournaments() {
    fetch("/tournaments/tournaments").then(
        (response) => response.json().then(
            (tourJson) => {
                container.innerHTML = `<div class="pb-2 mt-4 mb-2 border-bottom text-center">
                    <h2>ΤΟΥΡΝΟΥΑ</h2>
                </div>
                <p class="text-center">Εδώ μπορείτε να δηλώσετε συμμετοχή σε ανερχόμενα τουρνουά που διοργανώνονται από τον
                Όμιλό μας.</p>
                `;
                for (let tournament of tourJson) {
                    let div = document.createElement("div");
                    div.setAttribute("id", "tour" + tournament.id);
                    container.appendChild(div);
                    div.innerHTML = html;
                    let table = div.querySelector("table");
                    let button = div.querySelector(".btn-add");
                    if (tournament.type == "singles") {
                        table.innerHTML = table1html;
                        table.setAttribute("class", "table singles");
                        button.addEventListener("click", addParticipation1);
                    }
                    else {
                        table.innerHTML = table2html;
                        table.setAttribute("class", "table doubles");
                        button.addEventListener("click", addParticipation2);
                    }
                    div.getElementsByClassName("name")[0].innerHTML = tournament.name;
                    div.getElementsByClassName("dates")[0].innerHTML = 'Ημερομηνίες διεξαγωγής: ' + tournament.dates;
                    let remove = div.querySelector(".btn-remove");
                    remove.addEventListener("click", function () {
                        let data = {
                            sub: tournament.id + "dto"
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
                                    getTournaments();
                                    getParticipations();
                                }))
                    })
                }
            })
    )
}

function getParticipations() {
    let tbodies = document.querySelectorAll("tbody");
    for (let body of tbodies) {
        body.innerHTML = '';
    }
    fetch("/tournaments/all").then(
        (response) => response.json().then(
            (partJson) => {
                for (let part of partJson) {
                    let master = document.querySelector("#tour" + part.tournamentID);
                    let table = master.getElementsByTagName("tbody")[0];
                    if (table.parentElement.getAttribute("class") == "table singles") {
                        insertTable1(part, table);
                    }
                    else if (table.parentElement.getAttribute("class") == "table doubles") {
                        insertTable2(part, table);
                    }
                }
            })
    )
}

function insertTable1(participation, table) {
    let tr = document.createElement("tr");
    table.appendChild(tr);
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
            sub: participation.tournamentID + "del"
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

function insertTable2(participation, table) {
    let tr = document.createElement("tr");
    table.appendChild(tr);
    tr.setAttribute("class", "table-primary")
    for (let i = 0; i < 8; i++) {
        let d = document.createElement("td");
        tr.appendChild(d);
    }
    let tds = tr.getElementsByTagName("td");
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
            sub: participation.tournamentID + "del"
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
    let div = this.parentElement;
    div.removeChild(this);
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
                    sub: div.parentElement.parentElement.parentElement.parentElement.getAttribute("id").slice(4) + "add",
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
                            div.innerHTML = '<button class="btn btn-info btn-add mt-3">Προσθήκη συμμετοχής</button>';
                            let button = div.querySelector(".btn-add");
                            button.addEventListener("click", addParticipation1);
                            getParticipations();
                        }))
            }
        })
    }
}

function addParticipation2() {
    let div = this.parentElement;
    div.removeChild(this);
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
                    sub: div.parentElement.parentElement.parentElement.parentElement.getAttribute("id").slice(4) + "add",
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
                            div.innerHTML = '<button class="btn btn-info btn-add mt-3">Προσθήκη συμμετοχής</button>';
                            let button = div.querySelector(".btn-add");
                            button.addEventListener("click", addParticipation2);
                            getParticipations();
                        }))
            }
        })
    }
}

function addNewTournament() {
    let div = newTour.parentElement;
    div.removeChild(newTour);
    div.innerHTML = formhtml;
    let sub = div.querySelector("#sub");
    let select = div.querySelector("select");
    sub.addEventListener("click", function () {
        let data = new FormData();
        data.append('photo', div.querySelector("#photo").files[0]);
        data.append("sub", "0tou");
        data.append("name", div.querySelector("#name").value);
        data.append("dates", div.querySelector("#dates").value);
        data.append("type", select.options[select.selectedIndex].value);
        // let data = {
        //     sub: "0tou",
        //     name: div.querySelector("#name").value,
        //     dates: div.querySelector("#dates").value,
        //     type: select.options[select.selectedIndex].value
        // };
        fetch("/tournaments.html", {
            method: "POST",
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // },
            body: data//JSON.stringify(data)
        }).then(
            (resp) => resp.json().then(
                (Jsonobj) => {
                    getTournaments();
                    getParticipations();
                    div.innerHTML = '<button class="btn btn-primary m-3" id="addTournament">Δημιουργία νέου τουρνουά</button>';
                    newTour = document.querySelector("#addTournament");
                    newTour.addEventListener("click", addNewTournament);
                }))
    });
}
