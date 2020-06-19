let ul = document.querySelector("ul");
let table = document.querySelector("tbody");
let msgArea = document.getElementById("msgtext");
getMessages();

function getMessages() {
    table.innerHTML = '';
    fetch("/messages/all").then(
        (response) => response.json().then(
            (messagesJson) => {
                for (let message of messagesJson) {
                    let tr = document.createElement("tr");
                    table.appendChild(tr);
                    tr.setAttribute("class", "table-info");
                    tr.addEventListener("click", function(){
                        msgArea.value = message.message;
                        let trs = table.getElementsByTagName("tr");
                        for (let r of trs) {
                            r.setAttribute("class", "table-info");
                            let btn = r.getElementsByTagName("button")[0];
                            btn.setAttribute("disabled", "");
                        }
                        tr.getElementsByTagName("button")[0].removeAttribute("disabled");
                        tr.setAttribute("class", "table-selected");
                    });
                    for (let i = 0; i < 3; i++) {
                        let d = document.createElement("td");
                        tr.appendChild(d);
                    }
                    tds = tr.getElementsByTagName("td");
                    tds[0].innerHTML = message.name;
                    let a = document.createElement("a");
                    tds[1].appendChild(a);
                    a.setAttribute("href", "mailto:" + message.email);
                    a.innerText = message.email;
                    let button = document.createElement("button");
                    button.setAttribute("class", "btn btn-danger");
                    button.setAttribute("disabled", "");
                    button.innerText = 'Διαγραφή';
                    button.addEventListener("click", function (e) {
                        e.stopPropagation();
                        if (msgArea.value == message.message) {
                            msgArea.value = '';
                        }
                        let data = {
                            message: message.message,
                        };
                        fetch("/messages.html", {
                            method: "POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        }).then(
                            (resp) => resp.json().then(
                                (Jsonobj) => {
                                    getMessages();
                                }))
                    })
                    tds[2].appendChild(button);
                }
            })
    )
}