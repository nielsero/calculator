/* ====================== DOM ELEMENTS ========================== */
const calcDisplayIn = document.querySelector('.calc-display-input');
const calcDisplayOut = document.querySelector('.calc-display-output');
const calcButtons = document.querySelectorAll('.btn');

let displayTextIn = displayTextOut = '';
let a = b = operator = ''; // arguments for the operate function
let result;

calcButtons.forEach(function(button) {
    button.addEventListener('click', handleButtonClick);
});

/* ====================== DOM METHODS =========================== */
function handleButtonClick(e) {
    let dataKey = this.getAttribute('data-key');

    // checks if user clicked a digit
    if(!isNaN(dataKey)) {
        handleButtonClickDigit(dataKey);
    } else if(dataKey === '+'|| dataKey === '-' || dataKey === '*' || dataKey === '/') {
        handleButtonClickOperator(dataKey);
    } else if(dataKey === '=') {
        handleButtonClickEquals();
    } else if(dataKey === 'clr') {
        handleButtonClickClear();
    }
}

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
        if(a != '') {
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
            displayTextIn += dataKey;
            updateDisplay(calcDisplayIn, displayTextIn);
        }
    }
}

function handleButtonClickEquals() {
    if(b != '') {
        result = operate(Number(a), Number(b), pickOperation(operator));
        updateDisplay(calcDisplayOut, result);
        operator = '';
        prepareNextCalculation();
    }
}

// to set it back to initial conditions
function handleButtonClickClear() {
    a = b = operator = displayTextIn = displayTextOut = '';
    updateDisplay(calcDisplayIn, displayTextIn);
    updateDisplay(calcDisplayOut, displayTextOut);
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
    a = result;
    b = '';
}
/* ==================== LOGIC FUNCTIONS ========================= */
function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(a,b,operation) {
    return operation(a,b);
}

