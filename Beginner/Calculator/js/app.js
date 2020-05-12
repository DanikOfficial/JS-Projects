/**
 *
 *  Variables
 *
 */

var before, after, result, operations_area;

operations_area = document.getElementById("operations-area").value;

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
    document.getElementById("operations-area").value = operations_area;
  }
});

document.getElementById("btn-8").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "8";
    document.getElementById("operations-area").value = operations_area;
  }
});

document.getElementById("btn-9").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "9";
    document.getElementById("operations-area").value = operations_area;
  }
});

document.getElementById("btn-4").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "4";
    document.getElementById("operations-area").value = operations_area;
  }
});

document.getElementById("btn-5").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "5";
    document.getElementById("operations-area").value = operations_area;
  }
});

document.getElementById("btn-6").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "6";
    document.getElementById("operations-area").value = operations_area;
  }
});

document.getElementById("btn-1").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "1";
    document.getElementById("operations-area").value = operations_area;
  }
});
document.getElementById("btn-2").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "2";
    document.getElementById("operations-area").value = operations_area;
  }
});
document.getElementById("btn-3").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "3";
    document.getElementById("operations-area").value = operations_area;
  }
});
document.getElementById("btn-0").addEventListener("click", () => {
  if (operationsAreaExceed(operations_area)) {
    alert("Error: Number Limit Exceeded");
  } else {
    operations_area += "0";
    document.getElementById("operations-area").value = operations_area;
  }
});

/**
 *
 * Operators Behavior
 *
 */

/**
 *
 *  Operations Area
 *
 */

document.querySelector(".btn-clear").addEventListener("click", function () {
  if (operations_area.length !== 0) {
    var text = operations_area.split("");
    console.log(text);
    text.pop();
    console.log(text);
    document.querySelector("");
  }
});

const operationsAreaExceed = (area) => {
  result = false;
  if (area.length > 15) {
    result = true;
  }
  return result;
};
