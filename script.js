const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const btn4 = document.querySelector('#btn4');
const btn5 = document.querySelector('#btn5');
const btn6 = document.querySelector('#btn6');
const btn7 = document.querySelector('#btn7');
const btn8 = document.querySelector('#btn8');
const btn9 = document.querySelector('#btn9');
const btn0 = document.querySelector('#btn0');
const btnDot = document.querySelector('#dot');
const btnClear = document.querySelector('#clear');
const btnDelete = document.querySelector('#delete');
const display = document.querySelector("#display");

btn1.addEventListener("click", (e) => display.textContent += e.target.textContent);

btn2.addEventListener("click", (e) => display.textContent += e.target.textContent);

btn3.addEventListener("click", (e) => display.textContent += e.target.textContent);

btn4.addEventListener("click", (e) => display.textContent += e.target.textContent);

btn5.addEventListener("click", (e) => display.textContent += e.target.textContent);

btn6.addEventListener("click", (e) => display.textContent += e.target.textContent);

btn7.addEventListener("click", (e) => display.textContent += e.target.textContent);

btn8.addEventListener("click", (e) => display.textContent += e.target.textContent);

btn9.addEventListener("click", (e) => display.textContent += e.target.textContent);

btn0.addEventListener("click", (e) => display.textContent += e.target.textContent);

btnDot.addEventListener("click", (e) => {
    if(!(display.textContent.split("").some(char => char === "."))) display.textContent += e.target.textContent;
});

btnClear.addEventListener("click", () => display.textContent = "");

btnDelete.addEventListener("click", () => {
    let displayContent = [];
    if(display.textContent != "") {
        displayContent = display.textContent.split("");
        displayContent.pop();
        display.textContent = displayContent.join("");
    }
});