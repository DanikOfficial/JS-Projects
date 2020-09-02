// Data Structure Controller
let DataController = (() => {
  // Employee Function Constructor
  let Employee = (id, name, age) => {
    this.id = id;
    this.name = name;
    this.age = age;
  };
})();

// User Interface Controller
let UIController = (() => {})();

// Global Controller
let Controller = ((dataCtrl, uiCtrl) => {})(DataController, UIController);
