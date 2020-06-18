let selectFacility = document.querySelector("#facility");
let image = document.querySelector("#facilityImage");
let selectDate = document.querySelector("#date");
let warning = document.querySelector(".warning");
const tableHTML = `
<table class="table">
    <thead>
        <tr class="table-secondary">
            <th scope="col">Ώρα</th>
            <th></th>
        </tr>
    </thead>
    <tbody class="times">
        <tr class="table-success">
            <th scope="row">09:00</th>
            <td><button class="btn btn-primary ml-5">Κράτηση</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">10:00</th>
            <td><button class="btn btn-primary ml-5">Κράτηση</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">11:00</th>
            <td><button class="btn btn-primary ml-5">Κράτηση</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">12:00</th>
            <td><button class="btn btn-primary ml-5">Κράτηση</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">13:00</th>
            <td><button class="btn btn-primary ml-5">Κράτηση</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">14:00</th>
            <td><button class="btn btn-primary ml-5">Κράτηση</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">15:00</th>
            <td><button class="btn btn-primary ml-5">Κράτηση</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">16:00</th>
            <td><button class="btn btn-primary ml-5">Κράτηση</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">17:00</th>
            <td><button class="btn btn-primary ml-5">Κράτηση</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">18:00</th>
            <td><button class="btn btn-primary ml-5">Κράτηση</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">19:00</th>
            <td><button class="btn btn-primary ml-5">Κράτηση</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">20:00</th>
            <td><button class="btn btn-primary ml-5">Κράτηση</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">21:00</th>
            <td><button class="btn btn-primary ml-5">Κράτηση</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">22:00</th>
            <td><button class="btn btn-primary ml-5">Κράτηση</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">23:00</th>
            <td><button class="btn btn-primary ml-5">Κράτηση</button></td>
        </tr>
    </tbody>
</table>
`;

function updateImage() {
    let selected = selectFacility.options[selectFacility.selectedIndex].value;
    switch (selected) {
        case '1':
            image.setAttribute("src", "court-1.jpg");
            break;
        case '2':
            image.setAttribute("src", "court-2.jpg");
            break;
        case '3':
            image.setAttribute("src", "court-3.jpg");
            break;
        case '4':
            image.setAttribute("src", "court-4_cropped.jfif");
            break;
    }
    clearWarning();
}

function clearWarning() {
    warning.innerHTML = '';
    getReservations();
}

function getReservations() {
    let facility = selectFacility.value;
    let date = selectDate.value;
    if (date) {
        fetch("/courts/" + date + "," + facility).then(
            (response) => response.json().then(
                (timesJson) => {
                    console.log("times = ", timesJson);
                    let div = document.querySelector("#reserv");
                    div.innerHTML = tableHTML;
                    let rows = document.querySelector(".times").getElementsByTagName("tr");
                    for (let r of rows) {
                        let lastTD = r.getElementsByTagName("td")[0];
                        lastTD.childNodes[0].addEventListener("click", () => {
                            let num = parseInt((r.getElementsByTagName("th")[0].innerHTML).slice(0, 2)) - 9;
                            warning.innerHTML = '';
                            let data = {
                                facility: selectFacility.options[selectFacility.selectedIndex].value,
                                date: selectDate.value,
                                time: r.getElementsByTagName("th")[0].innerHTML,
                                submit: "Κράτηση"
                            };
                            console.log(data.time, data.submit);
                            fetch("/courts.html", {
                                method: "POST",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data)
                            }).then(
                                (resp) => resp.json().then(
                                    (Jsonobj) => {
                                        if (Jsonobj.resp != "ok") {
                                            warning.style.marginTop = (50 + 60 * num).toString() + "px";
                                            if (Jsonobj.resp == "too many") {
                                                warning.innerHTML = `
                                                <div class="alert alert-warning" role="alert">
                                                    <p>Το μέγιστο όριο κρατήσεων για την ίδια μέρα είναι 4</p>
                                                </div>`;
                                            }
                                            else if (Jsonobj.resp == "multiple") {
                                                warning.innerHTML = `
                                                <div class="alert alert-warning" role="alert">
                                                    <p>Έχετε ήδη κάποια κράτηση την ίδια ώρα σε άλλη εγκατάσταση</p>
                                                </div>`;
                                            }
                                        }
                                        getReservations();
                                    }))
                        })
                    }
                    for (let item of timesJson) {
                        for (let row of rows) {
                            if (row.getElementsByTagName("th")[0].innerHTML == item.time) {
                                let tds = row.getElementsByTagName("td");
                                row.setAttribute("class", "table-danger");
                                let butOld = tds[0].childNodes[0];
                                butOld.parentElement.removeChild(butOld);
                                if (item.username == 1) {
                                    row.setAttribute("class", "table-primary");
                                    let but = document.createElement("button");
                                    row.getElementsByTagName("td")[0].appendChild(but);
                                    but.textContent = "Αφαίρεση κράτησης";
                                    but.setAttribute("class", "btn btn-danger ml-5");
                                    but.addEventListener("click", () => {
                                        warning.innerHTML = '';
                                        let data = {
                                            facility: selectFacility.options[selectFacility.selectedIndex].value,
                                            date: selectDate.value,
                                            time: row.getElementsByTagName("th")[0].innerHTML,
                                            submit: "Αφαίρεση κράτησης",
                                        };
                                        console.log("remove");
                                        fetch("/courts.html", {
                                            method: "POST",
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(data)
                                        }).then(
                                            (resp) => resp.json().then(
                                                (Jsonobj) => {
                                                    getReservations();
                                                }))
                                    })
                                }
                            }
                        }
                    }
                })
        )
    }
}

