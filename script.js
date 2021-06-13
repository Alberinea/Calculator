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
    if (!funcInit) currentLog.innerText += num;
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
        currentLog.innerText += '\xa0' + display.innerText + ' =';
        if (currentLog.innerText.includes('+'))
            display.innerText = parseFloat(currentLog.innerText) + parseFloat(display.innerText);
        if (currentLog.innerText.includes('-'))
            display.innerText = parseFloat(currentLog.innerText) - parseFloat(display.innerText);
        if (currentLog.innerText.includes('×'))
            display.innerText = parseFloat(currentLog.innerText) * parseFloat(display.innerText);
        if (currentLog.innerText.includes('÷'))
            display.innerText = parseFloat(currentLog.innerText) / parseFloat(display.innerText);
        if (currentLog.innerText.includes('Mod'))
            display.innerText = parseFloat(currentLog.innerText) % parseFloat(display.innerText);
    }
}

function add() {
    if (currentLog.innerText.includes('+')) operate();
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
    if (currentLog.innerText.includes('-')) operate();
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
    if (currentLog.innerText.includes('×')) operate();
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
    if (currentLog.innerText.includes('÷')) operate();
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

function reminder() {
    if (currentLog.innerText.includes('Mod')) operate();
    if (!funcInit) {
        operatorFinished = false;
        funcInit = true;
        funcUsing = true;
        dotUsed = false;
        currentLog.classList.remove('hide');
        currentLog.innerText = parseFloat(display.innerText) + ' Mod';
    } else {
        currentLog.innerText = currentLog.innerText.slice(0, -2);
        currentLog.innerText += ' Mod';
    }
}

function convertAbs() {
    if (!operatorFinished) {
        if (parseFloat(display.innerText) > 0) {
            display.innerText = -Math.abs(parseFloat(display.innerText));
        } else {
            display.innerText = Math.abs(parseFloat(display.innerText));
        }
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
    if (!operatorFinished) {
        if (parseInt(display.innerText) < 10 && !display.innerText.includes('.')) {
            display.innerText = '00';
        }
        if (!dotExisted) dotUsed = false;
        display.innerText = display.innerText.slice(0, -1);
    } else if (operatorFinished) {
        currentLog.innerText = '';
    }
}

function dot() {
    if (operatorFinished) dotUsed = true;
    if (dotExisted) dotUsed = true;
    else if (!dotUsed && !funcUsing) {
        display.innerText += '.';
        dotUsed = true;
    }
}

function addKeyboard(e) {
    const keyboard = document.querySelector(`button[data-key="${e.key}"]`);
    if (!keyboard) return;
    if (parseInt(keyboard.innerText) < 10) {
        this.innerText = keyboard.innerText;
        printNum();
    }
    if (keyboard.innerText === '+') add();
    if (keyboard.innerText === '−') subtract();
    if (keyboard.innerText === '×') multiply();
    if (keyboard.innerText === '÷') divide();
    if (keyboard.innerText === '+/-') convertAbs();
    if (keyboard.innerText === '=') operate();
    if (keyboard.innerText === 'C') clear();
    if (keyboard.innerText === 'DEL') del();
    if (keyboard.innerText === '.') dot();
}

buttons.forEach((button) => button.addEventListener('click', printNum));
addButton.addEventListener('click', add);
subtractButton.addEventListener('click', subtract);
multiplyButton.addEventListener('click', multiply);
divideButton.addEventListener('click', divide);
reminderButton.addEventListener('click', reminder);
plusminusButton.addEventListener('click', convertAbs);
operateButton.addEventListener('click', operate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', del);
dotButton.addEventListener('click', dot);
window.addEventListener('keydown', addKeyboard);
