let operatorExists = false;
let currentOperator = null;
let previousOperator = null;
const input = document.querySelector('.calcInput')
const numbers = document.querySelectorAll(".number");
const operands = document.querySelectorAll('.operand');
const equals = document.querySelector('.equals');
let x = '';
let y = '';

input.value = '0';
//adding all the event listeners
//EQUALS event listener

//if x and y are numbers, do the operation, display the result, set operator to null and operandclicked to false
equals.addEventListener('click', function(){
    if (currentOperator == null && x != ''){       // no operator
        return;
    }
    if (currentOperator != null && x != '' && y === '') { 
        y = x;
    }




    if (currentOperator != null && x != '' && y == '')

    x = Number(x);
    y = Number(y);
    doOperation(x, y);
})

/*
3 things necessary for equals to work:
    x, y, operator
        if y is missing, x = y avoids errors
        if x present, no operator, x unchanged
        if x/y not present, operator present, answer is 0
        if all present, do the operation

when equals pressed --> checks if there is an operator
if operator exists, 
*/

//NUMBER  event listeners
for (i = 0, len = numbers.length; i < len; i++){
    let buttonValue = numbers[i].value;
    numbers[i].addEventListener('click', function() {
        concatAndPrint(buttonValue);
    });
}


//OPERAND  event listeners
for (i = 0, len = operands.length; i < len; i++){
    currentOperator = operands[i].value;
// not working at the moment because currentoperator assigned = it will never be null
// --> need to use previousoperator here.
    operands[i].addEventListener('click', function() {    
        if (currentOperator === null && x === '' && y === ''){
            x = input.value;
            console.log("attempted to assign inputvalue to x");
        }
        if (currentOperator != null && y != '' && x != '') {
            doOperation(x, y);
            console.log("attempted do operation")
        }
        if (currentOperator === null){
            x = input.value;
            operatorExists = true;
        }
    clearInput();
    });
}

/*
1) get input for first number
    -concatenate each additional number
2) get operand
    - when operand clicked, 
    IF x & y != ''
        do the operation
        x is answer
        y set to ''
            input.value set to x --> cannot do this at the moment, because function is reading the input and using that as value
    ELIF input != ''
        store x = input 
        clear input
    get/replace current operand

*/


//functions begin here
function clearInput() {
    /*if (currentOperator != null)
    if (x == '' || x == null){
        x = Number(input.value)
    }
    else if (x != '' || x != null){
        y = Number(input.value);
    }
    /*if (currentOperator == null && input.value !== '') {
        x = Number(input.value);
    }
    if (currentOperator != null) {
        y = input.value;
    }*/
    console.log(`x: ${x} y: ${y} operatorExists: ${operatorExists}`);
    input.value = '';
}

function concatAndPrint(newNum) {       //get the current input text - concatenate it, and then replace the value
    if (operatorExists == true){
        clearInput();
        operatorExists == false;
    }
    let oldInput = input.value;
    if (oldInput === '0'){
        input.value = '';
    }
    oldInput = input.value;
    let newInput = oldInput.concat(newNum);
    input.value = newInput;
}


function doOperation(x, y){
    if (x === '' && y === ''){
        input.value = 0;
        return;
    }
    if (x != '' && y === ''){
        y = x;
    }

    x = Number(x);
    y = Number(y);
    if (currentOperator === '+'){
        x = add(x, y);
    }
    else if (currentOperator === '-'){
        x = subtract(x, y);
    }
    else if (currentOperator === '*'){
        x = multiply(x, y);
    }
    else if (currentOperator === '/'){
        x = divide(x, y)
    }
    x = toString(x);
    input.value = x;
    y = '';
}

function add(x, y){
    x = x + y;
    input.value = x;
    return x;
}

function subtract(x, y) {
    x = x - y;
    return x;
}

function multiply(x, y) {
    x = x * y;
    return x;
}

function divide(x, y){
    if (y === 0) return 'Cannot divide by 0';
    x = x / y;
    return x;` `
}