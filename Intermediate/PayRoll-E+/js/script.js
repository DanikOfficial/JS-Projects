// Data Structure Controller
let DataController = (() => {
  // Employee Function Constructor
  let Employee = (id, name, age) => {
    this.id = id;
    this.name = name;
    this.age = age;
  };

  console.log("Data Controller Working");
})();

// User Interface Controller
let UIController = (() => {
  console.log("UI Controller Working");
})();

// Global Controller
let Controller = ((dataCtrl, uiCtrl) => {
  console.log("Controller Working");

  document.querySelector(".close-button").addEventListener("click", () => {
    document.querySelector(".paychecks-section").classList.remove("show");
  });

  document.querySelector(".btn-new-employee").addEventListener("click", () => {
    document.querySelector(".employee-data").classList.add("show-creation");
  });

  document.querySelector(".btn-edit").addEventListener("click", () => {
    document.querySelector(".update-employee").classList.toggle("show-update");
  });
})(DataController, UIController);
