const buttons = document.querySelectorAll('.num');
const computing = document.querySelector('.current');
const display = document.querySelector('.display');
const addButton = document.querySelector('#add');
const subtractButton = document.querySelector('#subtract');
const multiplyButton = document.querySelector('#multiply');
const divideButton = document.querySelector('#divide');
const operateButton = document.querySelector('#operate');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');
const plusminusButton = document.querySelector('#plusminus');
const reminderButton = document.querySelector('#reminder');
let funcOn = false;
let started = false;
let delDisplayResultScreen = false

function printNum() {
    let num = this.innerText;
    let displayScreen = display.innerText.replace(/^0+/, '');
    let currentScreen = computing.innerText.replace(/^0+/, '');
    display.innerText = displayScreen;
    computing.innerText = currentScreen;
    display.innerText += num;
    if (!funcOn) {
        computing.innerText += num;
    }
    if (delDisplayResultScreen) {
        display.innerText = num
        delDisplayResultScreen = false
    }
}

function add() {
    if (!funcOn) {
        funcOn = true;
        started = true
        computing.classList.remove('hide');
        computing.innerText += ' +\xa0';
        display.innerText = '';
    }
}

function subtract() {
    if (!funcOn) {
        funcOn = true;
        started = true;
        computing.classList.remove('hide');
        computing.innerText += ' -\xa0';
        display.innerText = '';
    }
}

function multiply() {
    if (!funcOn) {
        funcOn = true;
        started = true;
        computing.classList.remove('hide');
        computing.innerText += ' ×\xa0';
        display.innerText = '';
    }
}

function divide() {
    if (!funcOn) {
        funcOn = true;
        started = true;
        computing.classList.remove('hide');
        computing.innerText += ' ÷\xa0';
        display.innerText = '';
    }
}

function operate() {
    if (funcOn) {
        funcOn = false;
        started = true;
        let storage = computing.innerText.replace('×', '*').replace('÷', '/') + display.innerText;
        let result = eval(storage);
        computing.innerText += display.innerText + ' =';
        display.innerText = result;
    }
}

function clear() {
    computing.innerText = '';
    display.innerText = '0';
    computing.classList.add('hide');
    funcOn = false;
}

function del() {
    if (!funcOn) {
        computing.innerText = '';
        computing.classList.add('hide');
        delDisplayResultScreen = true
    } 
    if ((!funcOn) && (!started)) {
        display.innerText = display.innerText.slice(0, -1);
        computing.innerText = computing.innerText.slice(0, -1);
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
