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
  const parentTarget = e.target.parentElement.dataset.name;
  const dtName = e.target.dataset.name;

  clearError();

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
  } else if (dtName === 'dot') {
    if (currentValue.includes('.') === false) {
      output.innerText = output.innerText + target
      currentValue += target;
      separateInput();
    } 
  } else if (dtName === 'delete' || parentTarget=== 'delete') {
    if (currentValue.toString().length > 0) {
      if (firstOperand.toString().length > 8 && operator !== '') {
        secondOperands.innerText = secondOperands.innerText.slice(0, -1);
      } else {
        operands.innerText = operands.innerText.slice(0, -1);
      }
      console.log(firstOperand.toString().length)
    }
    output.innerText = output.innerText.slice(0, - 1);
    currentValue = currentValue.slice(0, -1);
    //Delete and display current value
  } else if (dtName === 'clear') {
    clear();
  } else if (dtName === 'plus' || dtName === 'min' || dtName == 'times' || dtName === 'dvd' || dtName === 'pwr') {
    if (operator === '' ) {
      operator = e.target.innerText;
    }
    if (currentValue === '') {
      operator === '';
    }

    if (firstOperand === '') {
      firstOperand = currentValue;
      output.innerText = '';
      currentValue = '';
      showCalculation();
    } else if (secondOperand === '' && currentValue !== '') {
      secondOperand = currentValue;
      calculate();
      operator = e.target.innerText;
      showCalculation();
    } else {
      showCalculation();
    }
    
    clearError();
  } else if (dtName === 'equal') {
    if (secondOperand === '' && operator !== '') {
    secondOperand = currentValue;
    }
    console.log(operator, firstOperand, secondOperand);
    if (firstOperand !== '' && secondOperand !== '') {
      showCalculation();
      calculate();
      operator = '';
    }
  } else if (dtName === 'percentage') {
    if (currentValue !== '') {
    firstOperand = currentValue;
    secondOperand = 100;
    operator = '%';
    showCalculation();
    calculate();
    operator = '';
    } else {
    clearError();
    }
  } else {
    return;
  }

  transition(e);
  changeFontSize();
  toggleClear();
 
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
  if (b === 0) {
    result = 'ERROR';
  } else {
    result = a / b;
    result = Math.round(result * 10000) / 10000;
    if (result.toString().includes('e')) {
      result = result.toPrecision(1 + 4);
      result = result / 1;
  }
}
}

function toExponent(a, b) {
  result = a ** b;
  result = Math.round(result * 10000) / 10000;
  if (result.toString().includes('e')) {
    result = result.toPrecision(1 + 4);
    result = result / 1;
  }
}

function toPercentage(a, b) {
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
  } else if (operator === '^') {
    toExponent(a,b);
  } else if (operator === '%') {
    toPercentage(a, b);
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
  result = 0;
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
  if (result === 'ERROR') {
    operands.innerText = '';
  } else if (firstOperand.length > 8 || secondOperand.length > 8) {
    operands.innerText = firstOperand + operator;
    secondOperands.innerText = secondOperand;
  } else {
    operands.innerText = firstOperand + operator + secondOperand;
    secondOperands.innerText = '';
  }  
}
//output the current calculation
function toggleClear() {
  if (output.innerText.length > 0 || operands.innerText.length > 0) {
    buttons[0].innerText = 'C';
  } else {
  buttons[0].innerText = 'AC';
  }
}

function clearError () {
  if (sum.innerText.includes('ERROR')) {
    clear();
  }
  
  if (firstOperand === '' && operator !== '') {
    clear();
  }
}
