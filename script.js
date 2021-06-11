const buttons = document.querySelectorAll('.num');
const current = document.querySelector('.current');
const display = document.querySelector('.display');

function printNum() {
    let num = this.innerText;
    let displayScreen = display.innerText.replace(/^0+/, '');
    let currentScreen = current.innerText.replace(/^0+/, '');
    display.innerText = displayScreen;
    current.innerText = currentScreen;
    display.innerText += num;
    current.innerText += num;
}

buttons.forEach((button) => button.addEventListener('click', printNum));

function add(num1, num2) {
    return num1 + num2;
}
