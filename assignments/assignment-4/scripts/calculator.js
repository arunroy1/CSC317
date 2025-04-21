// Grab references
const displayEl     = document.getElementById('display');
const calculationEl = document.getElementById('calculation');
let expression = '';

// Attach click listeners to every button
document.querySelectorAll('#calculator button').forEach(btn =>
  btn.addEventListener('click', () => handleInput(btn.value))
);

// Keyboard support
document.addEventListener('keydown', e => {
  const k = e.key;
  if (/\d/.test(k) || ['+','-','*','/','.','%'].includes(k)) {
    handleInput(k);
  } else if (k === 'Enter') {
    e.preventDefault();
    handleInput('=');
  } else if (k === 'Backspace') {
    handleInput('back');
  } else if (k === 'Escape') {
    handleInput('AC');
  }
});

function handleInput(value) {
  switch (value) {
    case 'AC':
      expression = '';
      render();
      break;
    case '+/-':
      if (expression) {
        expression = String(secureEval(expression) * -1);
        render();
      }
      break;
    case '%':
      if (expression) {
        expression = String(secureEval(expression) / 100);
        render();
      }
      break;
    case '=':
      calculate();
      break;
    case 'back':
      expression = expression.slice(0, -1);
      render();
      break;
    default:
      expression += value;
      render();
  }
}

function render() {
  displayEl.value     = expression;
  calculationEl.value = expression;
}

function calculate() {
  try {
    calculationEl.value = expression;
    const result = secureEval(expression);
    expression = String(result);
    render();
  } catch {
    displayEl.value = 'Error';
    expression = '';
  }
}

function secureEval(expr) {
  const safe = /^[0-9+\-*/%.() ]+$/;
  if (!safe.test(expr)) throw new Error('Invalid characters');
  // eslint-disable-next-line no-new-func
  return Function('"use strict";return(' + expr + ')')();
}