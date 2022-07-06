const buttons = document.querySelectorAll('button');

buttons.forEach(button => button.addEventListener('click', transition))

function transition(e) {
  console.log(e.target.parentElement.localName)
  if (e.target.parentElement.localName === 'button') {
    e.target.parentElement.classList.add('on');
  } else {
  e.target.classList.add('on');
  }
}
//add transition

function removeTransition (e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('on');
}

buttons.forEach(button => button.addEventListener('transitionend', removeTransition))
//remove transition effect