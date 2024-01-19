var stackarr = [];
var topp = -1;

function push(e) {
    topp++;
    stackarr[topp] = e;
}

function isOperand(x) {
    return (
        (x >= "a" && x <= "z") ||
        (x >= "A" && x <= "Z") ||
        (x >= "0" && x <= "9")
    );
}

function pop() {
    if (topp == -1) return 0;
    else {
        var popped_ele = stackarr[topp];
        topp--;
        return popped_ele;
    }
}

function operator(op) {
    if (
        op == "+" ||
        op == "-" ||
        op == "^" ||
        op == "*" ||
        op == "/" ||
        op == "(" ||
        op == ")"
    ) {
        return true;
    } else return false;
}

function precedency(pre) {
    if (pre == "@" || pre == "(" || pre == ")") {
        return 1;
    } else if (pre == "+" || pre == "-") {
        return 2;
    } else if (pre == "/" || pre == "*") {
        return 3;
    } else if (pre == "^") {
        return 4;
    } else return 0;
}

function infixToPrefix() {
    let infix = document.getElementById("inputValue").value;
    let operators = [];

    let operands = [];

    for (let i = 0; i < infix.length; i++) {
        if (infix[i] == "(") {
            operators.push(infix[i]);
        } else if (infix[i] == ")") {
            while (
                operators.length != 0 &&
                operators[operators.length - 1] != "("
            ) {
                let op1 = operands.pop();

                let op2 = operands.pop();

                let op = operators.pop();

                let tmp = op + op2 + op1;
                operands.push(tmp);
            }
            operators.pop();
        } else if (!operator(infix[i])) {
            operands.push(infix[i] + "");
        } else {
            while (
                operators.length &&
                precedency(infix[i]) <=
                    precedency(operators[operators.length - 1])
            ) {
                let op1 = operands.pop();

                let op2 = operands.pop();

                let op = operators.pop();

                let tmp = op + op2 + op1;
                operands.push(tmp);
            }

            operators.push(infix[i]);
        }
    }

    while (operators.length != 0) {
        let op1 = operands.pop();

        let op2 = operands.pop();

        let op = operators.pop();

        let tmp = op + op2 + op1;
        operands.push(tmp);
    }

    var st = operands[operands.length - 1];
    document.getElementById("text").innerHTML = st;
}

// ------------------------------------------------------------------------------------------------------------------------

function infixToPostfix() {
    let exp = document.getElementById("inputValue").value;

    var postfix = [];
    var temp = 0;
    push("@");

    for (var i = 0; i < exp.length; i++) {
        var el = exp[i];

        if (operator(el)) {
            if (el == ")") {
                while (stackarr[topp] != "(") {
                    postfix[temp++] = pop();
                }
                pop();
            } else if (el == "(") {
                push(el);
            } else if (precedency(el) > precedency(stackarr[topp])) {
                push(el);
            } else {
                while (
                    precedency(el) <= precedency(stackarr[topp]) &&
                    topp > -1
                ) {
                    postfix[temp++] = pop();
                }
                push(el);
            }
        } else {
            postfix[temp++] = el;
        }
    }

    while (stackarr[topp] != "@") {
        postfix[temp++] = pop();
    }

    var st = "";
    for (var i = 0; i < postfix.length; i++) st += postfix[i];
    document.getElementById("text").innerHTML = st;
}

function postfixToInfix() {
    let exp = document.getElementById("inputValue").value;
    let s = [];
    for (let i = 0; i < exp.length; i++) {
        if (isOperand(exp[i])) {
            s.push(exp[i]);
        } else {
            let op2 = s.pop();
            let op1 = s.pop();
            s.push("(" + op1 + exp[i] + op2 + ")");
        }
    }

    var st = s[0];
    document.getElementById("text").innerHTML = st;
}

function prefixToInfix() {
    let exp = document.getElementById("inputValue").value;
    let stack = [];
    let l = exp.length;

    for (let i = l - 1; i >= 0; i--) {
        let c = exp[i];

        if (operator(c)) {
            let op1 = stack[stack.length - 1];
            stack.pop();
            let op2 = stack[stack.length - 1];
            stack.pop();

            let temp = "(" + op1 + c + op2 + ")";
            stack.push(temp);
        } else {
            stack.push(c + "");
        }
    }
    var st = stack[stack.length - 1];
    document.getElementById("text").innerHTML = st;
}
// function postfixToPrifix() {
//     let exp = document.getElementById("inputValue").value;
//     let s = [];
//     for (let i = 0; i < exp.length; i++) {

//         if (isOperand(exp[i])) {
//             s.push(exp[i]);
//         } else {
//             let op2 = s.pop();
//             let op1 = s.pop();
//             s.push("(" + op1 + exp[i] + op2 + ")");
//         }
//     }
//     // return s[0];

//     // document.getElementById("text").innerHTML = st;

//     let infix = s[0];
//     let operators = [];

//     let operands = [];

//     for (let i = 0; i < infix.length; i++) {
//         if (infix[i] == "(") {
//             operators.push(infix[i]);
//         } else if (infix[i] == ")") {
//             while (
//                 operators.length != 0 &&
//                 operators[operators.length - 1] != "("
//             ) {
//                 let op1 = operands.pop();

//                 let op2 = operands.pop();

//                 let op = operators.pop();

//                 let tmp = op + op2 + op1;
//                 operands.push(tmp);
//             }
//             operators.pop();
//         } else if (!operator(infix[i])) {
//             operands.push(infix[i] + "");
//         } else {
//             while (
//                 operators.length &&
//                 precedency(infix[i]) <=
//                     precedency(operators[operators.length - 1])
//             ) {
//                 let op1 = operands.pop();

//                 let op2 = operands.pop();

//                 let op = operators.pop();

//                 let tmp = op + op2 + op1;
//                 operands.push(tmp);
//             }

//             operators.push(infix[i]);
//         }
//     }

//     while (operators.length != 0) {
//         let op1 = operands.pop();

//         let op2 = operands.pop();

//         let op = operators.pop();

//         let tmp = op + op2 + op1;
//         operands.push(tmp);
//     }

//     var st = operands[operands.length - 1];
//     document.getElementById("text").innerHTML = st;
// }

function prifixToPostfix() {
    let exp = document.getElementById("inputValue").value;
    let stack = [];
    let l = exp.length;

    for (let i = l - 1; i >= 0; i--) {
        let c = exp[i];

        if (operator(c)) {
            let op1 = stack[stack.length - 1];
            stack.pop();
            let op2 = stack[stack.length - 1];
            stack.pop();

            let temp = "(" + op1 + c + op2 + ")";
            stack.push(temp);
        } else {
            stack.push(c + "");
        }
    }
    var st = stack[stack.length - 1];

    // ---------------------------------------------------------------------------
    let exp2 = st;

    var postfix = [];
    var temp = 0;
    push("@");

    for (var i = 0; i < exp2.length; i++) {
        var el = exp2[i];

        if (operator(el)) {
            if (el == ")") {
                while (stackarr[topp] != "(") {
                    postfix[temp++] = pop();
                }
                pop();
            } else if (el == "(") {
                push(el);
            } else if (precedency(el) > precedency(stackarr[topp])) {
                push(el);
            } else {
                while (
                    precedency(el) <= precedency(stackarr[topp]) &&
                    topp > -1
                ) {
                    postfix[temp++] = pop();
                }
                push(el);
            }
        } else {
            postfix[temp++] = el;
        }
    }

    while (stackarr[topp] != "@") {
        postfix[temp++] = pop();
    }

    var st = "";
    for (var i = 0; i < postfix.length; i++) st += postfix[i];
    document.getElementById("text").innerHTML = st;
}

function selectRadio(id) {
    var radioButton = document.getElementById(id);

    radioButton.checked = true;
}

window.onload = function () {
    selectRadio("infixToPostfixRadio");
};

function convert() {
    let operator = document.querySelector(
        'input[name="operator"]:checked'
    ).value;
    switch (operator) {
        case "infixToPostfix":
            infixToPostfix();
            break;
        case "postfixToInfix":
            postfixToInfix();
            break;
        case "prefixToInfix":
            prefixToInfix();
            break;

        case "infixToPrifix":
            infixToPrefix();

        case "postfixToPrifix":
            postfixToPrifix();

        case "prifixToPostfix":
            prifixToPostfix();
            break;
        default:
    }
}
