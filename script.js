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
let funcOn = false;
let funcUsing = false;
let delInitFlag = false; //prevent bug with del button on startup
let secondUsed = false;
let operatorFinished = false;

function printNum() {
    let num = this.innerText;
    let displayScreen = display.innerText.replace(/^0+/, '');
    let currentScreen = currentLog.innerText.replace(/^0+/, '');
    display.innerText = displayScreen;
    currentLog.innerText = currentScreen;
    display.innerText += num;
    if (!funcOn) {
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
}

function add() {
    if (!funcOn && !secondUsed) {
        funcOn = true;
        funcUsing = true;
        delInitFlag = true;
        secondUsed = true;
        currentLog.classList.remove('hide');
        currentLog.innerText += ' +\xa0';
    } else if (!funcOn && secondUsed) {
        operatorFinished = false;
        funcOn = true;
        funcUsing = true;
        delInitFlag = true;
        currentLog.classList.remove('hide');
        currentLog.innerText = display.innerText + ' +\xa0';
    }
}

function subtract() {
    if (!funcOn && !secondUsed) {
        funcOn = true;
        delInitFlag = true;
        secondUsed = true;
        currentLog.classList.remove('hide');
        currentLog.innerText += ' -\xa0';
        display.innerText = '';
    } else if (!funcOn && secondUsed) {
        funcOn = true;
        delInitFlag = true;
        currentLog.classList.remove('hide');
        currentLog.innerText = display.innerText + ' -\xa0';
        display.innerText = '';
    }
}

function multiply() {
    if (!funcOn) {
        funcOn = true;
        delInitFlag = true;
        currentLog.classList.remove('hide');
        currentLog.innerText += ' ×\xa0';
        display.innerText = '';
    }
}

function divide() {
    if (!funcOn) {
        funcOn = true;
        delInitFlag = true;
        currentLog.classList.remove('hide');
        currentLog.innerText += ' ÷\xa0';
        display.innerText = '';
    }
}

function operate() {
    if (funcOn && !operatorFinished) {
        funcOn = false;
        delInitFlag = true;
        operatorFinished = true;
        let storage = currentLog.innerText.replace('×', '*').replace('÷', '/') + display.innerText;
        let result = eval(storage);
        currentLog.innerText += display.innerText + ' =';
        display.innerText = result;
    }
}

function clear() {
    currentLog.innerText = '';
    display.innerText = '0';
    currentLog.classList.add('hide');
    funcOn = false;
}

function del() {
    funcUsing = true;
    if (!funcOn && !delInitFlag) {
        display.innerText = display.innerText.slice(0, -1);
        currentLog.innerText = currentLog.innerText.slice(0, -1);
    } else if (funcUsing) {
        display.innerText = display.innerText.slice(0, -1);
    } else if (!funcOn) {
        currentLog.innerText = '';
        currentLog.classList.add('hide');
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
