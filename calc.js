let operatorExists = false;
let firstNum = false;
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
        x = doOperation(x, y);
        input.value = x;
        y = '';
        currentOperator = null;
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
// not working at the moment because currentoperator assigned = it will never be null
// --> need to use previousoperator here.
    operands[i].addEventListener('click', function() {   
        currentOperator = operandValue;            
        let temp = input.value;
        if (previousOperator === null && x === '' && y === ''){         //if nothing defined, check input value, if not '', x = input value
            if (temp != '0'){
                x = input.value;
                //console.log(`x is now ${x}`);
            }
        }
        else if (previousOperator != null && x != '' && temp != '0') {           //if x present
            y = input.value;
            x = doOperation(x, y);
            y = '';
            input.value = x;
            previousOperator = null;
        }
        /*else if (previousOperator != null && x != '' && y === ''){           //if y = '', y = input.value; --> shouldnt be possible, since there is an operator if x is defined
            if (temp != ''){
                y = input.value;
            }
        }*/
        previousOperator = currentOperator;
        console.log(`current op is: "${currentOperator}" x is ${x}`);
        operatorExists = true;
        firstNum = true;
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
    console.log(`x: ${x} y: ${y} operatorExists: ${operatorExists}`);
    input.value = '0';
}

function concatAndPrint(newNum) {       //get the current input text - concatenate it, and then replace the value
    if (firstNum === true){
        clearInput();
        firstNum = false;
    }
    let oldInput = input.value;
    console.log(`${oldInput}`)
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
function doOperation(x, y){
    let temp = input.value;
    if (temp === '0' && x === '' && y === ''){      //if x&y undefined, return
        return;
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
    return x;
}


//math functions
function add(x, y){
    x = x + y;
    console.log(`attempted add`)
    return x;
}

function subtract(x, y) {
    x = x - y;
    console.log(`attempted subtract ${x} - ${y}`)
    return x;
}

function multiply(x, y) {
    x = x * y;
    console.log(`attempted mult`)
    return x;
}

function divide(x, y){
    if (y === 0) return 'Cannot divide by 0';
    x = x / y;
    console.log(`attempted div`)
    return x;` `
}