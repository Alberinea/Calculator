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
let allowOperate = false;
let pause = false;
let dotExisted = display.innerText.includes('.');


function printNum() {
    if (!pause) {
        let num = this.innerText;
        let beforeDecimal = display.innerText.split('.')[0]
        display.innerText += num;
        display.innerText = parseFloat(display.innerText.replace(/,/g, '')).toLocaleString('en-US', {
            minimumFractionDigits: display.innerText.length - (beforeDecimal.length +1),
            maximumFractionDigits: 14,
        });
        if (funcUsing) {
            display.innerText = num;
            funcUsing = false;
            allowOperate = true;
        }
        if (operatorFinished) {
            operatorFinished = false;
            dotUsed = false;
            currentLog.innerText = '';
            display.innerText = '';
            display.innerText += num;
        }
        if (display.innerText.length < 12) display.style.cssText = 'font-size: 1.95rem;';
        if (display.innerText.length > 13 && display.innerText.length < 16) display.style.cssText = 'font-size: 1.5rem';
        if (display.innerText.length > 17) display.style.cssText = 'font-size: 1.3rem';
        if (display.innerText.length > 18) pause = true;
    }
}

function operate() {
    if (funcInit && !operatorFinished) {
        funcInit = false;
        operatorFinished = true;
        pause = false;
        let storage = parseFloat(display.innerText.replace(/,/g, ''));
        if (dotExisted) {
            dotUsed = false;
        }
        currentLog.innerText += '\xa0' + storage + ' =';
        if (currentLog.innerText.includes('+')) {
            let result = parseFloat(currentLog.innerText) + storage;
            display.innerText = result.toLocaleString();
        }
        if (currentLog.innerText.includes('−')) {
            let result = parseFloat(currentLog.innerText) - storage;
            display.innerText = result.toLocaleString();
        }
        if (currentLog.innerText.includes('×')) {
            let result = parseFloat(currentLog.innerText) * storage;
            display.innerText = result.toLocaleString();
        }
        if (currentLog.innerText.includes('÷')) {
            let result = parseFloat(currentLog.innerText) / storage;
            display.innerText = result.toLocaleString();
        }
        if (currentLog.innerText.includes('Mod')) {
            let result = parseFloat(currentLog.innerText) % storage;
            display.innerText = result.toLocaleString();
        }
        if (parseFloat(display.innerText) % 1 != 0) display.innerText = parseFloat(display.innerText).toFixed(5);
        if (display.innerText.length > 17)
            display.innerText = parseFloat(display.innerText.replace(/,/g, '')).toExponential(6);
        if (display.innerText.length > 13 && display.innerText.length < 16) display.style.cssText = 'font-size: 1.5rem';
        if (display.innerText.length > 17) display.style.cssText = 'font-size: 1.3rem';
    }
}

function add() {
    pause = false;
    if (allowOperate) {
        allowOperate = false;
        operate();
    }
    if (currentLog.innerText.includes('+')) operate();
    if (!funcInit) {
        operatorFinished = false;
        funcInit = true;
        funcUsing = true;
        dotUsed = false;
        currentLog.innerText = parseFloat(display.innerText.replace(/,/g, '')) + ' +';
    } else {
        currentLog.innerText = currentLog.innerText.slice(0, -2);
        currentLog.innerText += ' +';
    }
}

function subtract() {
    pause = false;
    if (allowOperate) {
        allowOperate = false;
        operate();
    }
    if (currentLog.innerText.includes('−')) operate();
    if (!funcInit) {
        operatorFinished = false;
        funcInit = true;
        funcUsing = true;
        dotUsed = false;
        currentLog.innerText = parseFloat(display.innerText.replace(/,/g, '')) + ' −';
    } else {
        currentLog.innerText = currentLog.innerText.slice(0, -2);
        currentLog.innerText += ' −';
    }
}

function multiply() {
    pause = false;
    if (allowOperate) {
        allowOperate = false;
        operate();
    }
    if (currentLog.innerText.includes('×')) operate();
    if (!funcInit) {
        operatorFinished = false;
        funcInit = true;
        funcUsing = true;
        dotUsed = false;
        currentLog.innerText = parseFloat(display.innerText.replace(/,/g, '')) + ' ×';
    } else {
        currentLog.innerText = currentLog.innerText.slice(0, -2);
        currentLog.innerText += ' ×';
    }
}

function divide() {
    pause = false;
    if (allowOperate) {
        allowOperate = false;
        operate();
    }
    if (currentLog.innerText.includes('÷')) operate();
    if (!funcInit) {
        operatorFinished = false;
        funcInit = true;
        funcUsing = true;
        dotUsed = false;
        currentLog.innerText = parseFloat(display.innerText.replace(/,/g, '')) + ' ÷';
    } else {
        currentLog.innerText = currentLog.innerText.slice(0, -2);
        currentLog.innerText += ' ÷';
    }
}

function reminder() {
    pause = false;
    if (allowOperate) {
        allowOperate = false;
        operate();
    }
    if (currentLog.innerText.includes('Mod')) operate();
    if (!funcInit) {
        operatorFinished = false;
        funcInit = true;
        funcUsing = true;
        dotUsed = false;
        currentLog.innerText = parseFloat(display.innerText.replace(/,/g, '')) + ' Mod';
    } else {
        currentLog.innerText = currentLog.innerText.slice(0, -2);
        currentLog.innerText += ' Mod';
    }
}

function convertAbs() {
    if (!operatorFinished) {
        if (parseFloat(display.innerText) > 0) {
            display.innerText = -Math.abs(parseFloat(display.innerText.replace(/,/g, '')));
            display.innerText = parseFloat(display.innerText.replace(/,/g, '')).toLocaleString();
        } else {
            display.innerText = Math.abs(parseFloat(display.innerText.replace(/,/g, '')));
            display.innerText = parseFloat(display.innerText.replace(/,/g, '')).toLocaleString();
        }
    }
}

function clear() {
    pause = false;
    currentLog.innerText = '';
    display.innerText = '0';
    funcInit = false;
    dotUsed = false;
    display.style.cssText = 'font-size: 1.95rem;';
}

function del() {
    pause = false;
    if (!operatorFinished) {
        if (parseInt(display.innerText) < 10 && !display.innerText.includes('.')) {
            display.innerText = '0';
        }
        if (!dotExisted) dotUsed = false;
        display.innerText = display.innerText.slice(0, -1);
        if (display.innerText.length < 12) display.style.cssText = 'font-size: 1.95rem;';
        if (display.innerText.length > 13 && display.innerText.length < 16) display.style.cssText = 'font-size: 1.5rem';
        if (display.innerText.length > 17) display.style.cssText = 'font-size: 1.3rem';
    } else if (operatorFinished) {
        currentLog.innerText = '';
    }
}

function dot() {
    if (display.innerText.includes('0')) dotUsed = false;
    if (pause) dotUsed = true;
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
        keyboard.classList.add('numActive');
        setTimeout(() => keyboard.classList.remove('numActive'), 100);
        printNum();
    }
    if (keyboard.innerText === '+') {
        keyboard.classList.add('numActive');
        setTimeout(() => keyboard.classList.remove('numActive'), 100);
        add();
    }
    if (keyboard.innerText === '−') {
        keyboard.classList.add('numActive');
        setTimeout(() => keyboard.classList.remove('numActive'), 100);
        subtract();
    }
    if (keyboard.innerText === '×') {
        keyboard.classList.add('numActive');
        setTimeout(() => keyboard.classList.remove('numActive'), 100);
        multiply();
    }
    if (keyboard.innerText === '÷') {
        keyboard.classList.add('numActive');
        setTimeout(() => keyboard.classList.remove('numActive'), 100);
        divide();
    }
    if (keyboard.innerText === 'mod') {
        keyboard.classList.add('numActive');
        setTimeout(() => keyboard.classList.remove('numActive'), 100);
        reminder();
    }
    if (keyboard.innerText === '+/-') {
        keyboard.classList.add('numActive');
        setTimeout(() => keyboard.classList.remove('numActive'), 100);
        convertAbs();
    }
    if (keyboard.innerText === '=') {
        keyboard.classList.add('calActive');
        setTimeout(() => keyboard.classList.remove('calActive'), 100);
        operate();
    }
    if (keyboard.innerText === 'C') {
        keyboard.classList.add('delActive');
        setTimeout(() => keyboard.classList.remove('delActive'), 100);
        clear();
    }
    if (keyboard.innerText === 'DEL') {
        keyboard.classList.add('delActive');
        setTimeout(() => keyboard.classList.remove('delActive'), 100);
        del();
    }
    if (keyboard.innerText === '.') {
        keyboard.classList.add('numActive');
        setTimeout(() => keyboard.classList.remove('numActive'), 100);
        dot();
    }
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
