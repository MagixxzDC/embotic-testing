let btnEl = document.querySelector(".generate");
let serialEl = document.querySelector(".serial");
let discord = document.querySelector(".Discord");

btnEl.onclick = function (event) {
  event.target.parentNode.removeChild(event.target)
    const randomSerial  = "embotichubtest";
        serialEl.innerHTML = randomSerial;
};
