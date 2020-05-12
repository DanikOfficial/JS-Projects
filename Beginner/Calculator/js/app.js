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
 *
 * Operators Behavior
 *
 */

document.querySelector(".btn-subtract").addEventListener("click", () => {
  operator = "-";
  isNaN(parseInt(operations_area)) ? (before = 0) : (before = parseInt(operations_area));
  
  if (isNaN(parseInt()))
});

document.querySelector(".btn-add").addEventListener("click", () => {
  operations_area === "" ? (before = 0) : (before = parseInt(operations_area));
  console.log(before);

  operator = "+";
  operationsAreaDOM.value = "";
});

document.querySelector(".btn-multiply").addEventListener("click", () => {
  operations_area === "" ? (before = 0) : (before = parseInt(operations_area));
  console.log(before);

  operator = "X";
  operationsAreaDOM.value = "";
});

document.querySelector(".btn-divide").addEventListener("click", () => {
  operations_area === "" ? (before = 0) : (before = parseInt(operations_area));
  console.log(before);

  operator = "/";
  operationsAreaDOM.value = "";
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

const operationsAreaExceed = (area) => {
  result = false;
  if (area.length > 15) {
    result = true;
  }
  return result;
};

const clearOperationsArea = () => {
  operationsAreaDOM.value = "";
};
