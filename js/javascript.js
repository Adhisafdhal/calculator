const buttons = document.querySelectorAll('button');
const output = document.querySelector('.output');
const operands = document.querySelector('.input');
const sum = document.querySelector('.sum')
let currentValue = '';
let firstOperand = '';
let secondOperand = '';
let operator = '';
let result = '';
const maxOutputWidth = output.clientWidth;

buttons.forEach(button => button.addEventListener('click', input))

function transition(e) {
  if (e.target.parentElement.localName === 'button') {
    e.target.parentElement.classList.toggle('on');
  } else {
  e.target.classList.toggle('on');
  }
}
//add transition

function removeTransition (e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('on');
}

buttons.forEach(button => button.addEventListener('transitionend', removeTransition))
//remove transition effect

function changeFontSize() {
  if (output.clientWidth > maxOutputWidth) {
    output.style.fontSize = `1.55rem`;
  } 

  if (output.innerText.length < 12) {
    output.style.fontSize = '2rem';
  }
}
//This will change the font size too big too fit in its container

function input(e) {
  const target = e.target.innerText;
  const dataName = e.target.dataset.name;

  if (/[.0-9]/.test(target)) {
    if (output.innerText.length < 15) {
    output.innerText = output.innerText + target;
    currentValue += target;
    operands.innerText += `${target}`;
    };
  } else if (dataName === 'delete'|| e.target.parentElement.dataset.name === 'delete') {
    if (output.innerText.length > 0) {
      operands.innerText = operands.innerText.slice(0, -1);
      }
    output.innerText = output.innerText.slice(0, - 1);
    currentValue = currentValue.slice(0, -1);
  } else if (dataName === 'clear') {
    clear();
  } else if (dataName === 'plus' || dataName === 'subtract' || dataName == 'multiply' || dataName === 'divide') {
    if (operator === '') {
      operator = e.target.innerText;
    };

    if (firstOperand === '') {
      firstOperand = currentValue;
      output.innerText = '';
      currentValue = '';
  
    } else if (secondOperand === '') {
      secondOperand = currentValue;
      operate(firstOperand, secondOperand);
      firstOperand = result;
      sum.innerText = `= ${result}`;
      output.innerText = '';
      secondOperand = '';
      currentValue = '';
      sum.innerText = '';
      operator = e.target.innerText;
    }

    operands.innerText = firstOperand + operator + secondOperand;
  } else if (dataName === 'equal') {
    if (secondOperand === '') {
      secondOperand = currentValue;
      currentValue = '';
    }
    if (firstOperand !== '' && secondOperand !== '') {
      operate(firstOperand, secondOperand);
      operands.innerText = firstOperand + operator + secondOperand;
      firstOperand = result;
      sum.innerText = `= ${result}`;
      secondOperand = '';
      output.innerText = '';
      operator = '';
    }
  }

  if (output.innerText.length > 0) {
    buttons[0].innerText = 'C';
  } else {
    buttons[0].innerText = 'AC';
  }

  transition(e);
  changeFontSize();
}
//currentValue will safe the input of the number and will input the number to the firstOperand or secondOperand 
//if the user click the number button the screen will output the number button and input the number as operand.
//if the user haven't chose the operator input the first clicked operator else return/

function add(a, b) {
  result = a + b;
  operator = '+'
}

function subtract(a, b) {
  result = a - b;
  operator = '-';
}

function multiply(a, b) {
  result = a * b;
  operator = '×'
}

function divide(a, b) {
  result = a / b;
  operator = '÷'
}

function operate(a, b) {
  a = Number(a);
  b = Number(b);

  if (operator === '+') {
    add(a, b);
  } else if (operator === '-') {
    subtract(a, b);
  } else if (operator === '×') {
    multiply(a, b)
  } else if (operator === '÷') {
    divide(a, b);
  } else {
    return
  }
}
//This function will decide which mathematical operation will run according to the current operator

function clear() {
  output.innerText = '';
  operands.innerText = '';
  sum.innerText = '';
  firstOperand = '';
  secondOperand = '';
  currentValue = '';
}
//Reset all the value into empty string