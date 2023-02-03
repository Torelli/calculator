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

function displayResult(value) {
    clearDisplay();
    display.textContent = value;
}

function displayContent(value) {
    display.textContent += value;
}

function clearDisplay () {
    display.textContent = "";
}

function displayOperators(value) {
    {
        let contentArray = display.textContent.split("");
        let i = contentArray.length - 1;
        if(!isNaN(contentArray[i])) displayContent(value);
    }
}

function getResult () {
    let operations = display.textContent.split(" ");
    let result = 0;
    let mIndex = -1;
    let dIndex = -1;
    let modIndex = -1;
    let addIndex = -1;
    let subIndex = -1;
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
            if(+operations[dIndex + 1] == 0) {
                modulus = NaN;
            } else {
                modulus = ((+operations[modIndex - 1]) % (+operations[modIndex + 1]));
            }
            operations.splice(dIndex - 1, 3, modulus);
            modIndex = operations.indexOf("%");
        }
        addIndex = operations.indexOf("+");
        while(addIndex >= 0) {
            result = +operations[addIndex - 1] + +operations[addIndex + 1];
            operations.splice(addIndex - 1, 3, result);
            addIndex = operations.indexOf("+");
        }
        subIndex = operations.indexOf("-");
        while(subIndex >= 0) {
            result = +operations[subIndex - 1] - +operations[subIndex + 1];
            operations.splice(subIndex - 1, 3, result);
            subIndex = operations.indexOf("-");
        }
       
       return Math.round(((+operations[0]) + Number.EPSILON) * 100) / 100; 
    }
}

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
    if(!(display.textContent.split("").some(char => char === "."))) displayContent(e.target.textContent);
});

btnClear.addEventListener("click", clearDisplay);

btnDelete.addEventListener("click", () => {
    let contentArray = [];
    if(display.textContent != "") {
        contentArray = display.textContent.split("");
        if(display.textContent[display.textContent.length - 1] == " ") {
            contentArray.splice(contentArray.length - 2, 3);
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
    let contentArray = display.textContent.split("").filter(char => char.trim());
    if(display.textContent.split(" ").length > 1){
        realTimeDisplay.textContent = getResult();
    } else {
        realTimeDisplay.textContent = "";
    }
    if(contentArray.length >= 8 && contentArray.some(char => isNaN(char))){
        display.setAttribute("style","font-size: 30px");
    } else {
        display.setAttribute("style","font-size: 50px");
    }
});