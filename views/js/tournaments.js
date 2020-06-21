let container = document.querySelector(".container");
const newTour = `<div class="jumbotron mt-3">
<div class="d-flex justify-content-around flex-wrap">
    <div>
        <div>
            <h5 id="talk" class="mb-4 name">Καλοκαιρινό Μονό Ενηλίκων</h5>
        </div>
        <div>
            <p class="dates"> Ημερομηνίες διεξαγωγής: 12 Ιουλίου - 19 Ιουλίου 2020</p>
        </div>
        <form id="myForm" method="POST">
            
        </form>
        <div id="for">

        </div>
    </div>
    <div>
        <div class="float-lg-left mr-4 mt-4">
            <img class="mb-1" id="float" src="tourlogo.png" alt="logo"
                style="width: 400px; height: 200px;">
        </div>
    </div>
    
</div>
</div>`;
const formSingles = `<div class="form-group input">
<input type="checkbox" id="check1" name="check1" value="accept1">
<label for="check2"> Τα στοιχεία επικοινωνίας του λογαριασμού μου είναι έγκυρα</label><br>
</div>
<div class="form-group input">
<input type="checkbox" id="check2" name="check2" value="accept2">
<label for="check2"> Συμφωνώ με τους όρους συμμετοχής</label><br>
</div>
<div class="form-group d-flex justify-content-center mt-4" id="parent">
<input type="button" disabled class="btn btn-primary" value="Δήλωση συμμετοχής" id="sub" name="sub">
</div>`;
const formDoubles = `<div class="form-group">
<label for="teamname">Ονοματεπώνυμο Συμπαίκτη</label>
<input type="text" class="form-control" id="teamname" name="teamname" required>
</div>
<div class="form-group">
<label for="teamemail">Email Συμπαίκτη</label>
<input type="email" class="form-control" id="teamemail" name="teamemail" required>
</div>
<div class="form-group">
<label for="teamphone">Τηλέφωνο Συμπαίκτη</label>
<input type="tel" class="form-control" id="teamphone" name="teamphone" required>
</div>
<div class="form-group">
<input type="checkbox" id="check1" name="check1" value="accept1">
<label for="check3"> Ο συμπαίκτης μου είναι άνω των 18 ετών</label><br>
</div>
<div class="form-group">
<input type="checkbox" id="check2" name="check2" value="accept2">
<label for="check4"> Τα στοιχεία επικοινωνίας του λογαριασμού μου είναι έγκυρα</label><br>
</div>
<div class="form-group">
<input type="checkbox" id="check3" name="check3" value="accept3">
<label for="check5"> Συμφωνώ με τους όρους συμμετοχής</label><br>
</div>
<div class="form-group d-flex justify-content-center mt-4" id="parent">
<input type="submit" disabled class="btn btn-primary" value="Δήλωση συμμετοχής" id="sub" name="sub">
</div>`;
getTournaments();


function getTournaments() {
    fetch("/tournaments/tournaments").then(
        (response) => response.json().then(
            (tourJson) => {
                for (let tournament of tourJson) {
                    let div = document.createElement("div");
                    div.setAttribute("id", "tour" + tournament.id);
                    container.appendChild(div);
                    div.innerHTML = newTour;
                    if (tournament.photo) {
                        div.querySelector("img").setAttribute("src", tournament.photo);
                    }
                    let form = div.getElementsByTagName("form")[0];
                    if (tournament.type == "singles") {
                        form.innerHTML = formSingles;
                        let check1 = div.querySelector("#check1");
                        let check2 = div.querySelector("#check2");
                        let sub = div.querySelector("#sub");
                        check1.addEventListener("change", function () {
                            if (check1.checked && check2.checked) {
                                sub.removeAttribute("disabled");
                            }
                            else {
                                sub.setAttribute("disabled", "");
                            }
                        })
                        check2.addEventListener("change", function () {
                            if (check1.checked && check2.checked) {
                                sub.removeAttribute("disabled");
                            }
                            else {
                                sub.setAttribute("disabled", "");
                            }
                        })
                        sub.addEventListener("click", function () {
                            let data = {
                                sub: tournament.id + "add"
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
                                        getParticipation();
                                    }))
                        })
                    }
                    else {
                        form.innerHTML = formDoubles;
                        let check1 = div.querySelector("#check1");
                        let check2 = div.querySelector("#check2");
                        let check3 = div.querySelector("#check3");
                        let sub = div.querySelector("#sub");
                        check1.addEventListener("change", function () {
                            if (check1.checked && check2.checked && check3.checked) {
                                sub.removeAttribute("disabled");
                            }
                            else {
                                sub.setAttribute("disabled", "");
                            }
                        })
                        check2.addEventListener("change", function () {
                            if (check1.checked && check2.checked && check3.checked) {
                                sub.removeAttribute("disabled");
                            }
                            else {
                                sub.setAttribute("disabled", "");
                            }
                        })
                        check3.addEventListener("change", function () {
                            if (check1.checked && check2.checked && check3.checked) {
                                sub.removeAttribute("disabled");
                            }
                            else {
                                sub.setAttribute("disabled", "");
                            }
                        })
                        sub.addEventListener("click", function () {
                            let teamname = div.querySelector("#teamname");
                            let teamemail = div.querySelector("#teamemail");
                            let teamphone = div.querySelector("#teamphone");
                            let data = {
                                sub: tournament.id + "add",
                                teamname: teamname.value,
                                teamemail: teamemail.value,
                                teamphone: teamphone.value
                            };
                            if (teamname.value && teamemail.value && teamphone.value) {
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
                                            getParticipation();
                                        }))
                            }
                        })
                    }
                    div.getElementsByClassName("name")[0].innerHTML = tournament.name;
                    div.getElementsByClassName("dates")[0].innerHTML = 'Ημερομηνίες διεξαγωγής: ' + tournament.dates;
                }
                getParticipation();
            })
    )
}

function getParticipation() {
    fetch("/tournaments/participation").then(
        (response) => response.json().then(
            (partJson) => {
                for (let part of partJson) {
                    let master = document.querySelector("#tour" + part.tournamentID);
                    let div = master.querySelector("#for");
                    div.innerHTML = 'Έχετε δηλώσει συμμετοχή στο τουρνουά';
                    div.setAttribute("class", "alert alert-success");
                    div.setAttribute("role", "alert");
                    let parent = master.querySelector("#parent");
                    parent.innerHTML = '';
                    //let sub = master.querySelector("#sub");
                    //sub.parentElement.removeChild(sub);
                }
            })
    )
}
