const html = document.querySelector("html");
const themeButton = document.querySelector("#theme-btn");
const container = document.querySelector('.calculator-container');
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
const btnMultiply = document.querySelector('#multiply');
const btnDivide = document.querySelector('#divide');
const btnModulus = document.querySelector('#modulus');
const btnSubtract = document.querySelector('#subtract');
const btnAdd = document.querySelector('#add');
const btnEquals = document.querySelector('#equals');
const btnClear = document.querySelector('#clear');
const btnDelete = document.querySelector('#delete');
const btnPosNeg = document.querySelector('#pos-neg');
const display = document.querySelector('#display');
const realTimeDisplay = document.querySelector('#realtime-display');

let fontSize = 35;
let charLimit = 3;
let lastContent = 0;

function adjustFontSize() {
    let contentArray = display.textContent.replaceAll(" ","").split("");
    let diff = 12 * (charLimit - contentArray.length);
    if(contentArray.length >= 5) {
        if(lastContent < contentArray.length) {
            fontSize -= 5;
        } else if(contentArray.length < 7){
            fontSize = 20;
        }
    } else {
        fontSize = 35 + diff;
    }
    if (fontSize < 15) fontSize = 15;
    if (fontSize > 35) fontSize = 35;
    if(document.body.offsetWidth >= 992) {
        display.setAttribute("style",`font-size: ${fontSize * 0.2}rem`);
    } else {
        display.setAttribute("style",`font-size: ${fontSize}vw`);
    }
    lastContent = contentArray.length;
}

function displayRealtimeResult() {
    let displayContent = display.textContent.split(" ").filter(i => i !== "");
    if(displayContent.length > 2 && !isNaN(+displayContent[displayContent.length - 1])){
        realTimeDisplay.textContent = `= ${getResult(displayContent)}`;
    } else {
        realTimeDisplay.textContent = "";
    }
}

function displayResult(value) {
    clearDisplay();
    display.textContent = value;
}

function displayContent(value) {
    if(display.textContent.split("").filter(char => char.trim()).length < 24){
        display.textContent += value;
    }
}

function clearDisplay () {
    display.textContent = "";
}

function displayOperators(value) {
    {
        let contentArray = display.textContent.split("");
        let i = contentArray.length - 1;
        if(!isNaN(contentArray[i]) && contentArray[i] != " ") displayContent(value);
        if(contentArray.length > 0 && contentArray[i] == " ") {
            contentArray.splice(i - 2, 3, value);
            display.textContent = contentArray.join("");
        }
    }
}

function getResult (value = display.textContent.split(" ")) {
    let operations = value;
    let result = 0;
    let mIndex = -1;
    let dIndex = -1;
    let modIndex = -1;
    let multiplication = 0;
    let division = 0;
    let modulus = 0;
    if(operations[operations.length-1] != "") {
        dIndex = operations.indexOf("÷");
        while(dIndex >= 0) {
            if (+operations[dIndex + 1] == 0) {
                division = NaN;
            } else {
                division = Math.round(((+operations[dIndex - 1]) / (+operations[dIndex + 1]) + Number.EPSILON) * 100) / 100;
            }
            operations.splice(dIndex - 1, 3, division);
            dIndex = operations.indexOf("÷");
        }
        mIndex = operations.indexOf("×");
        while(mIndex >= 0) {
            multiplication = ((+operations[mIndex - 1]) * (+operations[mIndex + 1]));
            operations.splice(mIndex - 1, 3, multiplication);
            mIndex = operations.indexOf("×");
        }
        modIndex = operations.indexOf("%");
        while(modIndex >= 0) {
            if(+operations[modIndex + 1] == 0) {
                modulus = NaN;
            } else {
                modulus = +operations[modIndex - 1] % +operations[modIndex + 1];
            }
            operations.splice(modIndex - 1, 3, modulus);
            modIndex = operations.indexOf("%");
        }
        while(operations.length > 1) {
            if(operations[1] === "+") {
                result = +operations[0] + +operations[2];
                operations.splice(0, 3, result);
            } else {
                result = +operations[0] - +operations[2];
                operations.splice(0, 3, result);
            }
        }
       return Math.round(((+operations[0]) + Number.EPSILON) * 100) / 100; 
    }
}

themeButton.addEventListener('click', () => {
    if(html.getAttribute("data-theme") === "dark"){
        html.setAttribute('data-theme','light');
        themeButton.setAttribute("data-tooltip", "Turn on dark mode");
    } else {
        html.setAttribute('data-theme','dark');
        themeButton.setAttribute("data-tooltip", "Turn off dark mode");
    }
});

btn1.addEventListener("click", (e) => displayContent(e.target.textContent));

btn2.addEventListener("click", (e) => displayContent(e.target.textContent));

btn3.addEventListener("click", (e) => displayContent(e.target.textContent));

btn4.addEventListener("click", (e) => displayContent(e.target.textContent));

btn5.addEventListener("click", (e) => displayContent(e.target.textContent));

btn6.addEventListener("click", (e) => displayContent(e.target.textContent));

btn7.addEventListener("click", (e) => displayContent(e.target.textContent));

btn8.addEventListener("click", (e) => displayContent(e.target.textContent));

btn9.addEventListener("click", (e) => displayContent(e.target.textContent));

btn0.addEventListener("click", (e) => displayContent(e.target.textContent));

btnDot.addEventListener("click", (e) => {
    let contentArray = display.textContent.split(" ");
    if(!(contentArray[contentArray.length - 1].split("").some(char => char === "."))) displayContent(e.target.textContent);
});

btnClear.addEventListener("click", clearDisplay);

btnDelete.addEventListener("click", () => {
    let contentArray = [];
    if(display.textContent != "") {
        contentArray = display.textContent.split("");
        if(display.textContent[display.textContent.length - 1] == " ") {
            contentArray.splice(contentArray.length - 3, 3);
        } else {
            contentArray.pop();
        }
        display.textContent = contentArray.join("");
    }
});

btnMultiply.addEventListener("click", (e) => displayOperators(` ${e.target.textContent} `));

btnDivide.addEventListener("click", (e) => displayOperators(` ${e.target.textContent} `));

btnSubtract.addEventListener("click", (e) => displayOperators(` ${e.target.textContent} `));

btnAdd.addEventListener("click", (e) => displayOperators(` ${e.target.textContent} `));

btnModulus.addEventListener("click", (e) => displayOperators(` ${e.target.textContent} `));

btnEquals.addEventListener("click", () => {
    displayResult(getResult());
});

btnPosNeg.addEventListener("click", () => {
    let contentArray = display.textContent.split(" ");
    if((contentArray.length === 1)) display.textContent = (+contentArray[0]) * -1;
});

container.addEventListener("click", () => {
    displayRealtimeResult();
    adjustFontSize();
    // let contentArray = display.textContent.split("").filter(char => char.trim());
});