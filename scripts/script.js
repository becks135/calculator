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
    if (b == 0) {
        resultDisplay.textContent = "ERR - Div by 0"
        throw new Error("divide by zero");
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
    }
}

let equation = "";
let x = 0;
let op = '+';
let y = null;
let inputDisplay = document.querySelector(".input");
let resultDisplay = document.querySelector(".result");

function reset() {
    x = 0;
    op = '+';
    y = null;
    equation = "";

}

function isOperator(x) {
    switch (x) {
        case "+":
        case "-":
        case "x":
        case "÷":
        case "=":
            return true;
    }
    return false;
}

function buttonPushed(e) {
    let input = e.target.textContent;;

    if (input == "C") {
        reset();
        inputDisplay.textContent = "";
        resultDisplay.textContent = 0;
        return;
    }

    //calculate result

    if (isOperator(input)) {
        if (isOperator((equation.slice(-1)))) {
            equation = equation.slice(0, -1);
        }
        if (y != null) {
            try {
                x = operate(op, parseFloat(x), parseFloat(y));
            } catch {
                reset();
                return;
            }
        } else {
            equation = resultDisplay.textContent;
            x = parseFloat(equation);

        }
        op = input;
        y = null;
    } else {
        if (y === null) {
            y = input;
        } else {
            y += input;
        }
    }

    resultDisplay.textContent = formatResult(x);

    if (input != "=") {
        equation += input;
    } else {
        reset();

    }

    inputDisplay.textContent = equation;
}

function formatResult(x) {
    if (x > 9999999999) {
        return x.toExponential(2);
    } else {
        return Math.round(x * 100) / 100;
    }
}


let buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click", buttonPushed));