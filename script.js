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
        dotUsed = false;
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
        operatorFinished = true;
        if (dotExisted) {
            dotUsed = false;
        }
        let storage = currentLog.innerText.replace('×', '*').replace('÷', '/') + display.innerText;
        let result = eval(storage);
        currentLog.innerText += '\xa0' + display.innerText + ' =';
        display.innerText = result;
    }
}

function add() {
    if (currentLog.innerText.includes('+')) {
        operate();
    }
    if (!funcInit) {
        operatorFinished = false;
        funcInit = true;
        funcUsing = true;
        dotUsed = false;
        currentLog.classList.remove('hide');
        currentLog.innerText = parseFloat(display.innerText) + ' +';
    } else {
        currentLog.innerText = currentLog.innerText.slice(0, -2);
        currentLog.innerText += ' +';
    }
}

function subtract() {
    if (currentLog.innerText.includes('-')) {
        operate();
    }
    if (!funcInit) {
        operatorFinished = false;
        funcInit = true;
        funcUsing = true;
        dotUsed = false;
        currentLog.classList.remove('hide');
        currentLog.innerText = parseFloat(display.innerText) + ' -';
    } else {
        currentLog.innerText = currentLog.innerText.slice(0, -2);
        currentLog.innerText += ' -';
    }
}

function multiply() {
    if (currentLog.innerText.includes('×')) {
        operate();
    }
    if (!funcInit) {
        operatorFinished = false;
        funcInit = true;
        funcUsing = true;
        dotUsed = false;
        currentLog.classList.remove('hide');
        currentLog.innerText = parseFloat(display.innerText) + ' ×';
    } else {
        currentLog.innerText = currentLog.innerText.slice(0, -2);
        currentLog.innerText += ' ×';
    }
}

function divide() {
    if (currentLog.innerText.includes('÷')) {
        operate();
    }
    if (!funcInit) {
        operatorFinished = false;
        funcInit = true;
        funcUsing = true;
        dotUsed = false;
        currentLog.classList.remove('hide');
        currentLog.innerText = parseFloat(display.innerText) + ' ÷';
    } else {
        currentLog.innerText = currentLog.innerText.slice(0, -2);
        currentLog.innerText += ' ÷';
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
    if (parseInt(display.innerText) < 10 && !display.innerText.includes('.')) {
        display.innerText = '00';
    }
    if (!operatorFinished) {
        display.innerText = display.innerText.slice(0, -1);
    } else if (operatorFinished) {
        currentLog.innerText = ''
    }
    if (!dotExisted) {
        dotUsed = false;
    }
}

function dot() {
    if (operatorFinished) {
        dotUsed = true;
    }
    if (dotExisted) {
        dotUsed = true;
    } else if (!dotUsed && !funcUsing) {
        display.innerText += '.';
        dotUsed = true;
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

