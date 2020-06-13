let check1 = document.querySelector("#check1");
let check2 = document.querySelector("#check2");
let check3 = document.querySelector("#check3");
let check4 = document.querySelector("#check4");
let check5 = document.querySelector("#check5");
let sub1 = document.querySelector("#sub1");
let sub2 = document.querySelector("#sub2");
getParticipation();

function button1() {
    if (check1.checked && check2.checked) {
        sub1.removeAttribute("disabled");
    }
    else {
        sub1.setAttribute("disabled", "");
    }
}

function button2() {
    if (check3.checked && check4.checked && check5.checked) {
        sub2.removeAttribute("disabled");
    }
    else {
        sub2.setAttribute("disabled", "");
    }
}

function getParticipation() {
    fetch("/tournaments/participation").then(
        (response) => response.json().then(
            (partJson) => {
                console.log("json = ", partJson);
                for (let part of partJson) {
                    if (part.tournamentID == 1) {
                        sub1.parentElement.removeChild(sub1);
                        let div = document.querySelector("#for1");
                        div.innerHTML = 'Έχετε δηλώσει συμμετοχή στο τουρνουά';
                        div.setAttribute("class", "alert alert-success");
                        div.setAttribute("role", "alert");
                    }
                    if (part.tournamentID == 2){
                        sub2.parentElement.removeChild(sub2);
                        let div = document.querySelector("#for2");
                        div.innerHTML = 'Έχετε δηλώσει συμμετοχή στο τουρνουά';
                        div.setAttribute("class", "alert alert-success");
                        div.setAttribute("role", "alert");
                    }
                }
            })
    )
}
