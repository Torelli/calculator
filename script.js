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
const btnSubtract = document.querySelector('#subtract');
const btnAdd = document.querySelector('#add');
const btnEquals = document.querySelector('#equals');
const btnClear = document.querySelector('#clear');
const btnDelete = document.querySelector('#delete');
const display = document.querySelector("#display");

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
    let result;
    let mIndex = operations.indexOf("×");
    let multiplication = 0;
    if(operations[operations.length-1] != "") {
        while(mIndex >= 0) {
            multiplication = ((+operations[mIndex - 1]) * (+operations[mIndex + 1]));
            operations.splice(mIndex - 1, 3);
            operations.splice(mIndex - 1, 0, multiplication);
            mIndex = operations.indexOf("×");
            console.log(multiplication);
        }
        console.log(operations);
        
    }
    // let numbers = display.textContent.split(/[^0-9]/g);
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

btnEquals.addEventListener("click", () => {
    getResult();
});

container.addEventListener("click", () => {
    let contentArray = display.textContent.split("").filter(char => char.trim());
    if(contentArray.length >= 8 && contentArray.some(char => isNaN(char))){
        display.setAttribute("style","font-size: 30px");
    } else {
        display.setAttribute("style","font-size: 50px");
    }
    console.log(contentArray);
});