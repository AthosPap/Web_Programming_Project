let flag = true;
let scroll = document.getElementsByClassName("hide")[0];
scroll.style.visibility = "hidden";
window.onscroll = function (ev) {
    if (window.pageYOffset <= 200) {
        if (flag == true) {
            scroll.style.visibility = "hidden";
            flag = false;
        }
    }
    else if (window.pageYOffset >= 2500) {
        if (flag == true) {
            scroll.style.visibility = "hidden";
            flag = false;
        }
    }
    else {
        if (flag == false && window.innerWidth > 760) {
            scroll.style.visibility = "visible";
            flag = true;
        }
    }
};