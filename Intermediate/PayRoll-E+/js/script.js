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

  

})(DataController, UIController);
