let firstNum = false;
let currentOperator = null;
let previousOperator = null;
let point = false;
let x = '';
let y = '';
const input = document.querySelector('.calcInput')
const numbers = document.querySelectorAll(".number");
const operands = document.querySelectorAll('.operand');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const dot = document.querySelector('#dot');

input.value = '0';

//clear event listener
clear.addEventListener('click', function(){
    reset();
});

dot.addEventListener('click', function(){
    if (point === false){    
        concatAndPrint('.');
        point = true;
    }
});

//EQUALS event listener
//if x and y are numbers, do the operation, display the result, set operator to null and operandclicked to false
equals.addEventListener('click', function(){
    let temp = input.value;
    if (currentOperator === null){       // no operator
        return;
    }
    if (currentOperator != null && x != '' && y === '' && temp === '0') { 
        y = x;
    }
    else if (currentOperator != null && x != '' && y === '' && temp != '0'){
        y = input.value;
        x = doOperation(x, y, currentOperator);
        input.value = x;
        y = '';
        currentOperator = null;
        previousOperator = null;
        firstNum = true;
    }
})


//NUMBER  event listeners
for (i = 0, len = numbers.length; i < len; i++){
    let buttonValue = numbers[i].value;
    numbers[i].addEventListener('click', function() {
        concatAndPrint(buttonValue);
    });
}


//OPERAND  event listeners
for (i = 0, len = operands.length; i < len; i++){
    let operandValue = operands[i].value;
    operands[i].addEventListener('click', function() {   
        currentOperator = operandValue;            
        let temp = input.value;
        if (previousOperator === null && x === '' && y === '' && temp != '0'){              //if nothing defined, check input value, if not '', x = input value
            x = input.value;
            console.log("x assigned was run")
        }
        else if (previousOperator != null && x != '' && y === '' && temp != '0') {           //if x & operator exist, and input not empty, let y = input then calculate
            y = input.value;
            x = doOperation(x, y, previousOperator);
            y = '';
            input.value = x;
            console.log(`dooperation was run with previous operator ${previousOperator}`);
            previousOperator = null;
        }
        previousOperator = currentOperator;
        console.log(`current op is: "${currentOperator}" x is ${x}`);
        console.log(`previous op is: "${previousOperator}" x is ${x}`);
        firstNum = true;
    });
}


//functions begin here
function reset(){
    x = '';
    y = '';
    input.value = '0';
    currentOperator = null;
    previousOperator = null;
    point = false;
}


function clearInput() {
    console.log(`x: ${x} y: ${y}`);
    input.value = '0';
}

function concatAndPrint(newNum) {       //get the current input text - concatenate it, and then replace the value
    if (firstNum === true){
        clearInput();
        firstNum = false;
    }
    let oldInput = input.value;
    if (oldInput === '0'){
        input.value = '';
    }
    oldInput = input.value;
    let newInput = oldInput.concat(newNum);
    input.value = newInput;
}
function getInput(){
    if (x === ''){
        x = input.value;
    }
}


//when 
//      = is pressed
//      operator is pressed IF x & y are defined
function doOperation(x, y, operator){
    let temp = input.value;
    if (temp === '0' && x === '' && y === ''){      //if x&y undefined, return
        return;
    }

    x = Number(x);
    y = Number(y);
    if (operator === '+'){
        x = add(x, y);
    }
    else if (operator === '-'){
        x = subtract(x, y);
    }
    else if (operator === '*'){
        x = multiply(x, y);
    }
    else if (operator === '/'){
        x = divide(x, y)
    }
    return x;
}


//math functions
function add(x, y){
    console.log(`attempting add ${x} - ${y}`)
    x = x + y;
    console.log(`answer: ${x}`)
    return x;
}

function subtract(x, y) {
    console.log(`attempting subtract ${x} - ${y}`)
    x = x - y;
    console.log(`answer: ${x}`)
    return x;
}

function multiply(x, y) {
    console.log(`attempting mul ${x} - ${y}`)
    x = x * y;
    console.log(`answer: ${x}`)
    return x;
}

function divide(x, y){
    if (y === 0) {
        alert("Stop trying to divide by 0")
        return;
    }
    console.log(`attempting divv ${x} - ${y}`)
    x = x / y;
    console.log(`answer: ${x}`)
    return x;` `
}