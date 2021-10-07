/* ====================== DOM ELEMENTS ========================== */
const calcDisplayIn = document.querySelector('.calc-display-input');
const calcDisplayOut = document.querySelector('.calc-display-output');
const calcButtons = document.querySelectorAll('.btn');

let displayTextIn = displayTextOut = '';
let a = b = operator = ''; // arguments for the operate function
let result;
let aHasDot = false, bHasDot = false; // to only allow one dot

calcButtons.forEach(function(button) {
    button.addEventListener('click', handleButtonClick);
});

/* ====================== DOM METHODS =========================== */
function handleButtonClick(e) {
    let dataKey = this.getAttribute('data-key');

    // checks if user clicked a digit or dot
    if(!isNaN(dataKey)) {
        handleButtonClickDigit(dataKey);
    } else if(dataKey === '+'|| dataKey === '-' || dataKey === '*' || dataKey === '/') {
        handleButtonClickOperator(dataKey);
    } else if(dataKey === '=') {
        handleButtonClickEquals();
    } else if(dataKey === 'clr') {
        handleButtonClickClear();
    } else if(dataKey === 'del') {
        handleButtonClickDelete();
    } else if(dataKey === '.') {
        handleButtonClickDot(dataKey);
    }
}

// handles digit
function handleButtonClickDigit(dataKey) {
    if(operator === '') {
        if(a === result) {
            displayTextIn = '';
            a = '';
        }
        a += dataKey;
        displayTextIn += dataKey;
        updateDisplay(calcDisplayIn, displayTextIn);
    } else if(operator != '') {
        b += dataKey;
        displayTextIn += dataKey;
        updateDisplay(calcDisplayIn, displayTextIn);
    } 
}

function handleButtonClickOperator(dataKey) {
    if(operator === '') {
        // checks if first input is not empty
        if(a != '' || a === 0) {
            operator = dataKey;
            displayTextIn += dataKey;
            updateDisplay(calcDisplayIn, displayTextIn);
        }
    } else {
        // checks if second input is not empty
        if(b != '') {
            result = operate(Number(a), Number(b), pickOperation(operator));
            updateDisplay(calcDisplayOut, result);
            prepareNextCalculation();
            operator = dataKey;
            displayTextIn = result; // to not make input display super long
            displayTextIn += dataKey;
            updateDisplay(calcDisplayIn, displayTextIn);
        }
    }
}

function handleButtonClickEquals() {
    if(b != '') {
        result = operate(Number(a), Number(b), pickOperation(operator));
        displayTextIn = result;
        updateDisplay(calcDisplayOut, result);
        operator = '';
        prepareNextCalculation();
    }
}

// to set it back to initial conditions
function handleButtonClickClear() {
    a = b = operator = displayTextIn = displayTextOut = '';
    aHasDot = bHasDot = false;
    updateDisplay(calcDisplayIn, displayTextIn);
    updateDisplay(calcDisplayOut, displayTextOut);
}

function handleButtonClickDelete() {
    let prevChar = displayTextIn.charAt(displayTextIn.length - 1);

    if(prevChar === '+'|| prevChar === '-' || prevChar === '*' || prevChar === '/') {
        operator = '';
    } else if(b === '') {
        a = a.slice(0, a.length - 1); // removes last element
        if(prevChar === '.') {
            aHasDot = false;
        }
    } else if(b != '') {
        b = b.slice(0, b.length - 1);
        if(prevChar === '.') {
            bHasDot = false;
        }
    }

    displayTextIn = displayTextIn.slice(0, displayTextIn.length - 1);
    updateDisplay(calcDisplayIn, displayTextIn);
}

function handleButtonClickDot(dataKey) {
    if(operator === '' && !aHasDot) {
        if(a === result) {
            displayTextIn = '';
            a = '';
        }
        a += dataKey;
        displayTextIn += dataKey;
        updateDisplay(calcDisplayIn, displayTextIn);
        aHasDot = true;
    } else if(operator != '' && !bHasDot) {
        b += dataKey;
        displayTextIn += dataKey;
        updateDisplay(calcDisplayIn, displayTextIn);
        bHasDot = true;
    } 
}

function pickOperation(operator) {
    switch(operator) {
        case '+': return add;
        case '-': return subtract;
        case '*': return multiply;
        case '/': return divide;
    }
}

function updateDisplay(display, text) {
    display.textContent = text;
}

function prepareNextCalculation() {
    if(isNaN(result)) {
        result = 0;
    }
    a = result;
    b = '';
    bHasDot = false;
}
/* ==================== LOGIC FUNCTIONS ========================= */
function add(a,b) {
    return parseFloat((a+b).toFixed(2));
}

function subtract(a,b) {
    return parseFloat((a-b).toFixed(2));
}

function multiply(a,b) {
    return parseFloat((a*b).toFixed(2));
}

function divide(a,b) {
    if(b!=0) {
        return parseFloat((a/b).toFixed(2)); // to round it
    } else {
        return "STOP dividing by 0";
    }
}

function operate(a,b,operation) {
    return operation(a,b);
}

