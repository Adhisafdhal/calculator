const buttons = document.querySelectorAll('button');
const output = document.querySelector('.output');
const operands = document.querySelector('.short');
const secondOperands = document.querySelector('.long');
const sum = document.querySelector('.sum')
output.style.fontSize = '2rem';
let currentFont = output.style.fontSize.slice(0, 1);
let currentValue = '';
let firstOperand = '';
let secondOperand = '';
let operator = '';
let result = 0;
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
    if (currentFont > 1) {
    output.style.fontSize = `${currentFont -= 0.3}` + 'rem'; 
    }
  }
  
  if (output.innerText.length < 12) {
    if (currentFont < 2) {
    output.style.fontSize = `${currentFont += 0.3}` + 'rem';
    }
  }
}
//This will change the font size too big too fit in its container

function input(e) {
  const target = e.target.innerText;
  const dataName = e.target.dataset.name;

  function separateInput() {
    if (operator !== '' && firstOperand.toString().length > 8) {
      secondOperands.innerText += `${target}`;
    } else {
      operands.innerText += `${target}`
    }
  }

  if (/[0-9]/.test(target)) {
    if (output.innerText.length < 15) {
    if (firstOperand === result && operator === '') {
      clear();
    } else {
      output.innerText = output.innerText + target;
      currentValue += target;
      separateInput();
      }
    }
  } else if (dataName === 'dot') {
    if (currentValue.includes('.') === false) {
      output.innerText = output.innerText + target
      currentValue += target;
      separateInput();
    } 
  } else if (dataName === 'delete'|| e.target.parentElement.dataset.name === 'delete') {
    if (currentValue > 0) {
      if (firstOperand.toString().length > 8 && operator !== '') {
        secondOperands.innerText = secondOperands.innerText.slice(0, -1);
      } else {
        operands.innerText = operands.innerText.slice(0, -1);
      }
    }
    output.innerText = output.innerText.slice(0, - 1);
    currentValue = currentValue.slice(0, -1);
    //Delete and display current value
  } else if (dataName === 'clear') {
    clear();
  } else if (dataName === 'plus' || dataName === 'subtract' || dataName == 'multiply' || dataName === 'divide') {

    if (operator === '') {
      operator = e.target.innerText;
    }

    if (firstOperand === '') {
      firstOperand = currentValue;
      output.innerText = '';
      currentValue = '';
  
    } else if (secondOperand === '' && currentValue !== '') {
      secondOperand = currentValue;
      calculate();
      operator = e.target.innerText;
    }
    showCalculation();
  } else if (dataName === 'equal') {
    if (secondOperand === '' && operator !== '') {
    secondOperand = currentValue;
    }

    if (firstOperand !== '' && secondOperand !== '') {
      showCalculation();
      calculate();
      operator = '';
    }
  }

  if (output.innerText.length > 0 || operands.innerText.length > 0) {
    buttons[0].innerText = 'C';
  } else {
    buttons[0].innerText = 'AC';
  }

  transition(e);
  changeFontSize();
 
  if (result.toString().length >= 20) {
    sum.style.fontSize = '1rem'
  } else if (result.toString().length > 15) {
    sum.style.fontSize = '1.2rem';
  } else {
    sum.style.fontSize = '1.5rem';
  }
  //make sum fontSize responsive
}
//currentValue will safe the input of the number and will input the number to the firstOperand or secondOperand 
//if the user click the number button the screen will output the number button and input the number as operand.
//if the user haven't chose the operator input the first clicked operator else return/

function add(a, b) {
    
  result = a + b;
  result = Math.round(result * 10000) / 10000;
  if (result.toString().includes('e')) {
    result = result.toPrecision(1 + 4);
    result = result / 1;
  }
}

function subtract(a, b) {
  result = a - b;
  result = Math.round(result * 10000) / 10000;
  if (result.toString().includes('e')) {
    result = result.toPrecision(1 + 4);
    result = result / 1;
  }
}

function multiply(a, b) {
  result = a * b;
  result = Math.round(result * 10000) / 10000;
  if (result.toString().includes('e')) {
    result = result.toPrecision(1 + 4);
    result = result / 1;
  }
}

function divide(a, b) {
  result = a / b;
  result = Math.round(result * 10000) / 10000;
  if (result.toString().includes('e')) {
    result = result.toPrecision(1 + 4);
    result = result / 1;
  }
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
  output.style.fontSize = '2rem';
  buttons[0].innerText = 'AC';
  output.innerText = '';
  operands.innerText = '';
  sum.innerText = '';
  firstOperand = '';
  secondOperand = '';
  currentValue = '';
  operator = '';
  secondOperands.innerText = '';
}
//Reset all the value into empty string

function calculate () {
  operate(firstOperand, secondOperand);
  firstOperand = result;
  sum.innerText = `= ${result}`;
  output.innerText = '';
  secondOperand = '';
  currentValue = '';
}
//calculate the input and output it on screen

function showCalculation () {
  if (firstOperand.length > 8 || secondOperand.length > 8) {
    operands.innerText = firstOperand + operator;
    secondOperands.innerText = secondOperand;
  } else {
    operands.innerText = firstOperand + operator + secondOperand;
    secondOperands.innerText = '';
  }  
}
//output the current calculation

