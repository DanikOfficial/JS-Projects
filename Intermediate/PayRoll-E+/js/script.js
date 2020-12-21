// Data Structure Controller
const DataController = (() => {
  // Employee Function Constructor
  let Employee = (id, name, age, registrationDate) => {
    this.id = id;
    this.name = name;
    this.age = age;
    this.registrationDate = registrationDate;
  };

  console.log("Data Controller Running");
})();

// User Interface Controller
const UIController = (() => {
  console.log("UI Controller Running");
})();

// Global Controller
const Controller = ((dataCtrl, uiCtrl) => {
  console.log("Global Controller Running");

  document.querySelector(".item-1").addEventListener("click", () => {
    document
      .querySelector(".paychecks-section")
      .classList.add("show-paychecks-section");
  });

  document.querySelector(".close-modal").addEventListener("click", () => {
    document
      .querySelector(".paychecks-section")
      .classList.remove("show-paychecks-section");
  });
})(DataController, UIController);
