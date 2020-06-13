let selectFacility = document.querySelector("#facility");
let selectDate = document.querySelector("#date");
const table = `
<table class="table">
    <thead>
        <tr class="table-secondary">
            <th scope="col" class="px-3">Ώρα</th>
            <th scope="col" class="px-3">Όνομα</th>
            <th scope="col" class="px-3">Επώνυμο</th>
            <th scope="col" class="px-3">Όνομα χρήστη</th>
            <th scope="col" class="px-3">Τηλέφωνο</th>
            <th scope="col" class="px-3">Email</th>
            <th></th>
        </tr>
    </thead>
    <tbody class="times">
        <tr class="table-success">
            <th scope="row">09:00</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button class="btn btn-primary">Προσθήκη</button></td>
        </tr>
            <tr class="table-success">
            <th scope="row">10:00</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button class="btn btn-primary">Προσθήκη</button></td>
        </tr>
            <tr class="table-success">
            <th scope="row">11:00</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button class="btn btn-primary">Προσθήκη</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">12:00</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button class="btn btn-primary">Προσθήκη</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">13:00</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button class="btn btn-primary">Προσθήκη</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">14:00</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button class="btn btn-primary">Προσθήκη</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">15:00</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button class="btn btn-primary">Προσθήκη</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">16:00</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button class="btn btn-primary">Προσθήκη</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">17:00</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button class="btn btn-primary">Προσθήκη</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">18:00</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button class="btn btn-primary">Προσθήκη</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">19:00</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button class="btn btn-primary">Προσθήκη</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">20:00</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button class="btn btn-primary">Προσθήκη</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">21:00</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button class="btn btn-primary">Προσθήκη</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">22:00</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button class="btn btn-primary">Προσθήκη</button></td>
        </tr>
        <tr class="table-success">
            <th scope="row">23:00</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button class="btn btn-primary">Προσθήκη</button></td>
        </tr>
    </tbody>
</table>
`;

function getReservations() {
    let facility = selectFacility.value;
    let date = selectDate.value;
    if (date) {
        fetch("/courts/admin/" + date + "," + facility).then(
            (response) => response.json().then(
                (timesJson) => {
                    console.log("times = ", timesJson);
                    let div = document.querySelector("#reserv");
                    div.innerHTML = table;
                    let rows = document.querySelector(".times").getElementsByTagName("tr");
                    for (let r of rows) {
                        let lastTD = r.getElementsByTagName("td")[5];
                        lastTD.childNodes[0].addEventListener("click", () => {
                            lastTD.removeChild(lastTD.childNodes[0]);
                            let b1 = document.createElement("button");
                            let b2 = document.createElement("button");
                            b1.setAttribute("class", "btn btn-primary mr-3");
                            b2.setAttribute("class", "btn btn-primary");
                            b1.innerText = 'Χρήστης';
                            b2.innerText = 'Μη χρήστης';
                            lastTD.appendChild(b1);
                            lastTD.appendChild(b2);
                            b1.addEventListener("click", function () {
                                lastTD.removeChild(b1);
                                lastTD.removeChild(b2);
                                let input = document.createElement("input");
                                input.setAttribute("type", "text");
                                input.setAttribute("placeholder", "Όνομα χρήστη");
                                input.setAttribute("class", "form-control");
                                input.setAttribute("size", "10");
                                input.addEventListener("keypress", function (e) {
                                    if (e.key === 'Enter' && this.value) {
                                        let data = {
                                            facility: selectFacility.options[selectFacility.selectedIndex].value,
                                            date: selectDate.value,
                                            time: r.getElementsByTagName("th")[0].innerHTML,
                                            submit: "Κράτηση",
                                            username: this.value
                                        };
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
                                                    console.log("done");
                                                    getReservations();
                                                }))
                                    }
                                })
                                lastTD.appendChild(input);
                            })
                            b2.addEventListener("click", function () {
                                lastTD.removeChild(b1);
                                lastTD.removeChild(b2);
                                let input1 = document.createElement("input");
                                let input2 = document.createElement("input");
                                let inputs = [input1, input2];
                                input1.setAttribute("placeholder", "Επώνυμο");
                                input2.setAttribute("placeholder", "Τηλέφωνο");
                                input2.style.marginTop = '8px';
                                for (let inp of inputs) {
                                    lastTD.appendChild(inp);
                                    inp.setAttribute("type", "text");
                                    inp.setAttribute("class", "form-control");
                                    inp.setAttribute("size", "10");
                                    inp.addEventListener("keypress", function (e) {
                                        if (e.key === 'Enter' && input1.value && input2.value) {
                                            let data = {
                                                facility: selectFacility.options[selectFacility.selectedIndex].value,
                                                date: selectDate.value,
                                                time: r.getElementsByTagName("th")[0].innerHTML,
                                                submit: "Κράτηση",
                                                surname: input1.value,
                                                phone: input2.value
                                            };
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
                                                        console.log("done");
                                                        getReservations();
                                                    }))
                                        }
                                    })
                                }
                            })
                        })
                    }
                    for (let item of timesJson) {
                        for (let row of rows) {
                            if (row.getElementsByTagName("th")[0].innerHTML == item.time) {
                                let tds = row.getElementsByTagName("td");
                                row.setAttribute("class", "table-danger");
                                tds[1].innerHTML = item.surname;
                                tds[3].innerHTML = item.phone;
                                if (item.username) {
                                    tds[0].innerHTML = item.name;
                                    tds[2].innerHTML = item.username;
                                    tds[4].innerHTML = item.email;
                                }
                                let butOld = tds[5].childNodes[0];
                                butOld.parentElement.removeChild(butOld);
                                let but = document.createElement("button");
                                row.getElementsByTagName("td")[5].appendChild(but);
                                but.textContent = "Αφαίρεση";
                                but.setAttribute("class", "btn btn-danger");
                                but.addEventListener("click", () => {
                                    let data = {
                                        facility: selectFacility.options[selectFacility.selectedIndex].value,
                                        date: selectDate.value,
                                        time: row.getElementsByTagName("th")[0].innerHTML,
                                        submit: "Αφαίρεση κράτησης",
                                    };
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
                                                console.log("done");
                                                getReservations();
                                            }))
                                })
                            }
                        }
                    }
                })
        )
    }
}


