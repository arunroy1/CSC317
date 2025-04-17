// assignment-4/scripts/calculator.js
(() => {
    const display = document.getElementById('display');
    const buttons = document.querySelector('.calculator-buttons');
  
    // State
    let displayValue = '0';
    let firstOperand = null;
    let waitingForSecondOperand = false;
    let operator = null;
  
    // Update the on‑screen display
    function updateDisplay() {
      display.textContent = displayValue;
    }
  
    // Handle digit input (0–9)
    function inputDigit(digit) {
      if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
      } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
      }
    }
  
    // Handle decimal point
    function inputDecimal(dot) {
      if (waitingForSecondOperand) {
        displayValue = '0.';
        waitingForSecondOperand = false;
        return;
      }
      if (!displayValue.includes(dot)) {
        displayValue += dot;
      }
    }
  
    // Perform one of the four basic operations
    function performCalculation(op, a, b) {
      switch (op) {
        case 'add':      return a + b;
        case 'subtract': return a - b;
        case 'multiply': return a * b;
        case 'divide':   return b === 0 ? 'Error' : a / b;
        default:         return b;
      }
    }
  
    // Round to avoid floating‑point artifacts
    function roundResult(value) {
      return Math.round(value * 1e12) / 1e12;
    }
  
    // Process operator buttons (+, −, ×, ÷)
    function handleOperator(nextOperator) {
      const inputValue = parseFloat(displayValue);
  
      // If operator pressed twice, just update it
      if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
      }
  
      if (firstOperand == null) {
        firstOperand = inputValue;
      } else if (operator) {
        const result = performCalculation(operator, firstOperand, inputValue);
        displayValue = result === 'Error' 
          ? result 
          : String(roundResult(result));
        firstOperand = result === 'Error' ? null : result;
      }
  
      waitingForSecondOperand = true;
      operator = nextOperator;
    }
  
    // Clear everything
    function resetCalculator() {
      displayValue = '0';
      firstOperand = null;
      waitingForSecondOperand = false;
      operator = null;
    }
  
    // Percentage key
    function handlePercent() {
      const value = parseFloat(displayValue);
      displayValue = String(value / 100);
    }
  
    // Toggle +/−
    function handleToggleSign() {
      const value = parseFloat(displayValue);
      displayValue = String(value * -1);
    }
  
    // Click‐handler via event delegation
    buttons.addEventListener('click', event => {
      const btn = event.target;
      if (!btn.matches('button')) return;
  
      // Number (and decimal)
      if (btn.classList.contains('number')) {
        if (btn.dataset.number === '.') {
          inputDecimal('.');
        } else {
          inputDigit(btn.dataset.number);
        }
        updateDisplay();
        return;
      }
  
      // Utility & operators
      const action = btn.dataset.action;
      switch (action) {
        case 'clear':
          resetCalculator();
          updateDisplay();
          break;
        case 'percent':
          handlePercent();
          updateDisplay();
          break;
        case 'toggle-sign':
          handleToggleSign();
          updateDisplay();
          break;
        case 'equals':
          handleOperator(operator);
          updateDisplay();
          operator = null;
          break;
        default:
          // +, −, ×, ÷
          if (btn.classList.contains('operator')) {
            handleOperator(action);
            updateDisplay();
          }
      }
    });
  
    // Keyboard support
    window.addEventListener('keydown', event => {
      const { key } = event;
  
      // Digits
      if (/\d/.test(key)) {
        inputDigit(key);
        updateDisplay();
        return;
      }
      // Decimal
      if (key === '.') {
        inputDecimal('.');
        updateDisplay();
        return;
      }
      // Operators
      const map = { '+':'add', '-':'subtract', '*':'multiply', '/':'divide' };
      if (map[key]) {
        handleOperator(map[key]);
        updateDisplay();
        return;
      }
      // Equals
      if (key === 'Enter' || key === '=') {
        handleOperator(operator);
        updateDisplay();
        operator = null;
        return;
      }
      // Percent
      if (key === '%') {
        handlePercent();
        updateDisplay();
        return;
      }
      // Clear (Backspace/Delete)
      if (key === 'Backspace' || key === 'Delete') {
        resetCalculator();
        updateDisplay();
      }
    });
  
    // Initialize
    updateDisplay();
  })();  