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

  document.querySelector(".btn-update-info").addEventListener("click", () => {
    document
      .querySelector(".employee-update")
      .classList.add("show-employee-update");
    document.querySelector(".paychecks-list").classList.add("move-list-down");
    document
      .querySelector(".employee-information")
      .classList.add("scale-employee-information");
  });

  document.querySelector(".btn-cancel").addEventListener("click", () => {
    document
      .querySelector(".employee-update")
      .classList.remove("show-employee-update");

      document
          .querySelector(".employee-information")
          .classList.remove("scale-employee-information");
      });

    document
      .querySelector(".employee-information")
      .addEventListener("transitionend", () => {
        
  });
})(DataController, UIController);
