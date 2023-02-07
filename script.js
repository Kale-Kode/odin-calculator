function add(a, b){
    return a+b;
}

function subtract(a, b){
    return a-b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    return a/b;
}

function operate(op, a, b){
    if (op === "+"){
        return add(a,b);
    }else if (op === "-"){
        return subtract(a,b);
    }else if (op === "/"){
        return divide(a,b);
    }else{
        return multiply(a,b);
    }
}

//initialise vars
const display = document.querySelector(".display-text");
let display_value = 0;
let operator = "";
let newNumber = false;
let decimal = false;
let queue = [];

//get all the numbers from the document
const buttons = Array.from(document.querySelectorAll(".number"));
//add a click event listener to each one
buttons.forEach(btn => btn.addEventListener("click", () => {
    //if a new number is being entered replace the current display with that number
    if (display.textContent == "0" || newNumber){
        display.textContent = btn.textContent;
        newNumber = false;
    
    }
    else if (decimal){
        display.textContent += `.${btn.textContent}`;
        decimal = false;
    }
    //otherwise append the new number onto the end of the exisitng displayed number
    else{
        display.textContent += btn.textContent;
    }
}));

//get 4 operators from document
const operators = Array.from(document.querySelectorAll(".operator"));
//loop over each operator and adding a click event listener 
operators.forEach(op => op.addEventListener("click", () => {
    //on click, update the display and push the calculation to the queue
    display_value = parseInt(display.textContent);
    operator = op.textContent;
    queue.push([parseInt(display_value), operator]);
    //indicates a new number is about to be enetred
    newNumber = true;
}));

//when equals is clicked do the following
const equals = document.querySelector(".equals");
equals.addEventListener("click", () => {
    //if there has only been one calculation, simply update the display with the answer
    if (queue.length == 1){
        display.textContent = operate(operator, display_value, parseFloat(display.textContent));
    //otherwise, if there has been many caluclations, loop through all calculations in the queue
    }else{
        let tot = queue.reduce((total, current, i) => { 
            let prev = queue[i-1];
            //if we are on the first calculation, use the values in the queue
            if (i == 1){
                return x = operate(prev[1], prev[0], current[0])
            //BUT once we move on to the next calculations, we use the running TOTAL in the calculation
            }else if(i > 1 && i < queue.length-1){
                return x = operate(prev[1], total, current[0])
            }
        }, 0)
        //update the display with the final calculation of the last item in the queue
        display.textContent = operate(queue[queue.length-1][1], tot, parseFloat(display.textContent));
    }
    //reset the queue, and indicate that the next input is a brand new number
    queue = [];
    newNumber = true;
});

const decimal_point = document.querySelector(".decimal-point");
decimal_point.addEventListener("click", () => {
    console.log(parseFloat(display.textContent).toFixed(1));
    //display.textContent = parseFloat(display.textContent).toFixed(1).replace(/\.0+$/, '');
    decimal = true;
})

const del = document.querySelector(".delete");
del.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1);
});

const c = document.querySelector(".c");
c.addEventListener("click", () => {
    display.textContent = "0";
    queue = [];
})

const ce = document.querySelector(".ce");
ce.addEventListener("click", () => {
    display.textContent = "0";
})

const sign = document.querySelector(".sign");
sign.addEventListener("click", () => {
    display.textContent = parseInt(display.textContent) * -1;
})