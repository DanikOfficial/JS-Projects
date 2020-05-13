/**
 *
 *  Variables
 *
 */

var before, after, result, operations_area, operators;

before = 0;

operations_area = document.getElementById("operations-area").value;
operationsAreaDOM = document.getElementById("operations-area");

/**
 *
 * Numbers behavior
 *
 */

document.getElementById("btn-7").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "7";
    operationsAreaDOM.value = operations_area;
  }
});

document.getElementById("btn-8").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "8";
    operationsAreaDOM.value = operations_area;
  }
});

document.getElementById("btn-9").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "9";
    operationsAreaDOM.value = operations_area;
  }
});

document.getElementById("btn-4").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "4";
    operationsAreaDOM.value = operations_area;
  }
});

document.getElementById("btn-5").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "5";
    operationsAreaDOM.value = operations_area;
  }
});

document.getElementById("btn-6").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "6";
    operationsAreaDOM.value = operations_area;
  }
});

document.getElementById("btn-1").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "1";
    operationsAreaDOM.value = operations_area;
  }
});
document.getElementById("btn-2").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "2";
    operationsAreaDOM.value = operations_area;
  }
});
document.getElementById("btn-3").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "3";
    operationsAreaDOM.value = operations_area;
  }
});
document.getElementById("btn-0").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "0";
    operationsAreaDOM.value = operations_area;
  }
});

/**

 * Operators Behavior
 */

document.querySelector(".btn-subtract").addEventListener("click", () => {
  calculate("-");
});

document.querySelector(".btn-add").addEventListener("click", function () {
  calculate("+");
});

document.querySelector(".btn-multiply").addEventListener("click", () => {
  calculate("*");
});

document.querySelector(".btn-divide").addEventListener("click", () => {
  calculate("/");
});

/**
 *
 *  Operations Area
 *
 */

document.querySelector(".btn-clear").addEventListener("click", function () {
  if (operations_area.length !== 0) {
    var updated = "";
    var text = operations_area.split("");
    text.pop();
    for (let i = 0; i < text.length; i++) {
      updated += text[i];
    }
    operations_area = updated;
    operationsAreaDOM.value = operations_area;
  }
});

document.querySelector(".btn-clear-all").addEventListener("click", function () {
  operations_area = "";
  operationsAreaDOM.value = operations_area;
  before = 0;
  after = 0;
});

document.querySelector(".btn-result").addEventListener("click", function () {
  var result = 0;
  if (operations_area) {
    after = parseInt(operations_area);
  } else {
    after = 0;
  }

  switch (operator) {
    case "-":
      result = before - after;
      operationsAreaDOM.value = result;
      before = 0;
      after = 0;
      operator = "";
      break;

    case "+":
      result = before + after;
      operationsAreaDOM.value = result;
      before = 0;
      after = 0;
      operator = "";
      break;

    case "*":
      result = before * after;
      operationsAreaDOM.value = result;
      before = 0;
      after = 0;
      operator = "";
      break;

    case "/":
      result = before / after;
      operationsAreaDOM.value = result;
      before = 0;
      after = 0;
      operator = "";
      break;

    default:
      alert("Error: No Operation Selected");
  }
});

const operationsAreaExceed = (area) => {
  result = false;
  if (area.length > 15) {
    result = true;
  }
  return result;
};

function calculate(operation) {
  if (operations_area) {
    if (before !== 0) {
      switch (operation) {
        case "-":
          operator = "-";
          before -= operations_area;
          break;

        case "+":
          operator = "+";
          before += parseInt(operations_area);
          break;

        case "*":
          operator = "*";
          before *= operations_area;
          break;

        case "/":
          operator = "/";
          before /= operations_area;
          break;

        default:
          alert("Error, unknown operator");
      }
      operations_area = "";
      operationsAreaDOM.value = before;
    } else {
      operator = operation;
      before = parseInt(operations_area);
      operations_area = "";
      operationsAreaDOM.value = "";
    }
  }
}
