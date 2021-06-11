const buttons = document.querySelectorAll('.num');
const current = document.querySelector('.current');
const display = document.querySelector('.display');
const addButton = document.querySelector('#add');
const subtractButton = document.querySelector('#subtract');
const multiplyButton = document.querySelector('#multiply');
const divideButton = document.querySelector('#divide');
const operateButton = document.querySelector('#operate');
let funcOn = false;

function printNum() {
    let num = this.innerText;
    let displayScreen = display.innerText.replace(/^0+/, '');
    let currentScreen = current.innerText.replace(/^0+/, '');
    display.innerText = displayScreen;
    current.innerText = currentScreen;
    display.innerText += num;
    current.innerText += num;
}

function add() {
    if (!funcOn) {
        funcOn = true;
        current.innerText += ' +\xa0';
        display.innerText = '';
    }
}

function subtract() {
    if (!funcOn) {
        funcOn = true;
        current.innerText += ' -\xa0';
        display.innerText = '';
    }
}

function multiply() {
    if (!funcOn) {
        funcOn = true;
        current.innerText += ' ×\xa0';
        display.innerText = '';
    }
}

function divide() {
    if (!funcOn) {
        funcOn = true;
        current.innerText += ' ÷\xa0';
        display.innerText = '';
    }
}

function operate() {
    if (!funcOn) {
        funcOn = true;
        let result = eval(current.innerText);
        current.innerText += ' =';
        display.innerText = result;
    }
}

buttons.forEach((button) => button.addEventListener('click', printNum));
addButton.addEventListener('click', add);
subtractButton.addEventListener('click', subtract)
multiplyButton.addEventListener('click', multiply)
divideButton.addEventListener('click', divide)
operateButton.addEventListener('click', operate);
