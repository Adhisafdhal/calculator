const buttons = document.querySelectorAll('button');
const output = document.querySelector('.output');
const maxOutputWidth = output.clientWidth;

buttons.forEach(button => button.addEventListener('click', input))

console.log(buttons[0].innerText)

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
  if (output.clientWidth >= maxOutputWidth) {
    output.style.fontSize = `1.55rem`;
  } 

  if (output.innerText.length < 12) {
    output.style.fontSize = '2rem';
  }
}

function input(e) {
  const target = e.target.innerText;

  if (/[.0-9]/.test(target)) {
    if (output.innerText.length < 15) {
    output.innerText = output.innerText + target;
    };
  } else if (e.target.dataset.name || e.target.parentElement.dataset.name === 'delete') {
    output.innerText = output.innerText.slice(0, - 1);
  } else if (e.target.dataset.name === 'clear') {
    output.innerText = '';
  }

  if (output.innerText.length > 0) {
    buttons[0].innerText = 'C';
  } else {
    buttons[0].innerText = 'AC';
  }

  transition(e);
  changeFontSize();
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b) {
  if (e.target.dataset.name === 'add') {
    add(a, b);
  } else if (e.target.dataset.name === 'subtract') {
    subtract(a, b);
  } else if (e.target.dataset.name === 'multiply') {
    multiply(a, b)
  } else if (e.target.dataset.name === 'divide') {
    divide(a, b);
  } else {
    return
  }
}