const buttons = document.querySelectorAll('.num');
const currentLog = document.querySelector('.current');
const display = document.querySelector('.display');
const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');
const multiplyButton = document.getElementById('multiply');
const divideButton = document.getElementById('divide');
const operateButton = document.getElementById('operate');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const plusminusButton = document.getElementById('plusminus');
const reminderButton = document.getElementById('reminder');
const dotButton = document.getElementById('dot');
let funcInit = false;
let funcUsing = false;
let delInitFlag = false; //prevent bug with del button on startup
let operatorFinished = false;
let dotUsed = false;
let dotExisted = display.innerText.includes('.');

function printNum() {
    let num = this.innerText;
    let displayScreen = display.innerText.replace(/^0/, '');
    let currentScreen = currentLog.innerText.replace(/^00/, '');
    display.innerText = displayScreen;
    currentLog.innerText = currentScreen;
    display.innerText += num;
    if (!funcInit) {
        currentLog.innerText += num;
    }
    if (funcUsing) {
        display.innerText = num;
        funcUsing = false;
    }
    if (operatorFinished) {
        operatorFinished = false;
        currentLog.classList.add('hide');
        currentLog.innerText = '';
        display.innerText = '';
        display.innerText += num;
    }
    if (display.innerText == '00') {
        display.innerText = '0';
    }
}

function operate() {
    if (funcInit && !operatorFinished) {
        funcInit = false;
        delInitFlag = true;
        operatorFinished = true;
        if (dotExisted) {
            dotUsed = false;
        }
        let storage = currentLog.innerText.replace('×', '*').replace('÷', '/') + display.innerText;
        let result = eval(storage);
        currentLog.innerText += display.innerText + ' =';
        display.innerText = result;
    }
}

function add() {
    if (currentLog.innerText.includes('+')) {
        operate()
    }
    if (!funcInit) {
        operatorFinished = false;
        funcInit = true;
        funcUsing = true;
        delInitFlag = true;
        dotUsed = false;
        currentLog.classList.remove('hide');
        currentLog.innerText = display.innerText + ' +\xa0';
    } else {
        currentLog.innerText = currentLog.innerText.slice(0, -2);
        currentLog.innerText += ' +\xa0';
    }
}

function subtract() {
    if (!funcInit) {
        operatorFinished = false;
        funcInit = true;
        funcUsing = true;
        delInitFlag = true;
        dotUsed = false;
        currentLog.classList.remove('hide');
        currentLog.innerText = display.innerText - ' +\xa0';
    } else {
        currentLog.innerText = currentLog.innerText.slice(0, -2);
        currentLog.innerText += ' -\xa0';
    }
}

function multiply() {
    if (!funcInit) {
        funcInit = true;
        delInitFlag = true;
        currentLog.classList.remove('hide');
        currentLog.innerText += ' ×\xa0';
        display.innerText = '';
    }
}

function divide() {
    if (!funcInit) {
        funcInit = true;
        delInitFlag = true;
        currentLog.classList.remove('hide');
        currentLog.innerText += ' ÷\xa0';
        display.innerText = '';
    }
}

function clear() {
    currentLog.innerText = '';
    display.innerText = '0';
    currentLog.classList.add('hide');
    funcInit = false;
    dotUsed = false;
}

function del() {
    funcUsing = true;
    if (!dotExisted) {
        dotUsed = false;
    }
    if (parseInt(display.innerText) < 10 && dotExisted) {
        display.innerText = '00';
    }
    if (!funcInit && !delInitFlag) {
        display.innerText = display.innerText.slice(0, -1);
        currentLog.innerText = currentLog.innerText.slice(0, -1);
    } else if (funcUsing) {
        display.innerText = display.innerText.slice(0, -1);
    } else if (!funcInit) {
        currentLog.innerText = '';
        currentLog.classList.add('hide');
    }
}

function dot() {
    if (dotExisted) {
        dotUsed = true;
    } else if (!dotUsed && !funcUsing) {
        dotUsed = true;
        display.innerText += '.';
        operatorFinished = false;
    }
}

buttons.forEach((button) => button.addEventListener('click', printNum));
addButton.addEventListener('click', add);
subtractButton.addEventListener('click', subtract);
multiplyButton.addEventListener('click', multiply);
divideButton.addEventListener('click', divide);
operateButton.addEventListener('click', operate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', del);
dotButton.addEventListener('click', dot);
