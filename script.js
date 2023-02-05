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

const buttons = Array.from(document.querySelectorAll(".number"));
let display_value = 0
buttons.forEach(btn => btn.addEventListener("click", () => {
    const display = document.querySelector(".display-text");

    if (display.textContent == "0"){
        display.textContent = btn.textContent;
    }else{
        display.textContent += btn.textContent;
    }
    display_value = display.textContent;
}))


