let btnEl = document.querySelector(".generate");
let serialEl = document.querySelector(".serial");
let discord = document.querySelector(".Discord");

btnEl.onclick = function (event) {
  event.target.parentNode.removeChild(event.target)
    const characters  = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let charsCount = 30;
  let randomSerial = "";

    for (let i = 0; i < charsCount; i++) {
        randomSerial += characters[Math.floor(Math.random() * characters.length)];
    }
        serialEl.innerHTML = randomSerial;
};