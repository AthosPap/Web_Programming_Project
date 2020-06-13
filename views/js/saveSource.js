function setStorage(){
    let index = window.location.href.indexOf('0/')
    let href = window.location.href.slice(index + 2);
    sessionStorage.setItem("goBackURL", href);
}