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
  document.querySelector(".item").addEventListener("click", () => {
    document.querySelector(".paychecks-section").classList.toggle("show");
  });

  document.querySelector(".close-button").addEventListener("click", () => {
    document.querySelector(".paychecks-section").classList.toggle("show");
  });

  document.querySelector(".btn-new-employee").addEventListener("click", () => {
    document.querySelector(".employee-data").classList.add("show-creation");
    document
      .querySelector(".search-section")
      .classList.add("slide-down-search");
  });

  document.querySelector(".btn-cancel").addEventListener("click", () => {
    document.querySelector(".employee-data").classList.remove("show-creation");
    document
      .querySelector(".employee-data")
      .classList.remove("slide-down-creation");
    document
      .querySelector(".search-section")
      .classList.remove("slide-down-search");
    document.querySelector(".search-section").classList.remove("slide-again");
    document.querySelector(".error-label-register").style.display = "none";
  });

  document.querySelector(".btn-edit").addEventListener("click", () => {
    document.querySelector(".update-employee").classList.toggle("show-update");
  });

  document.querySelector(".career-type").addEventListener("click", () => {
    let name = document.querySelector(".employee-name").value;

    if (name === "") {
      document.querySelector(".employee-name").focus();
      document.querySelector(".error-label-register").style.display = "block";
      document
        .querySelector(".employee-data")
        .classList.add("slide-down-creation");
      document
        .querySelector(".search-section")
        .classList.add("slide-down-search");
      document.querySelector(".search-section").classList.add("slide-again");
    }
  });

  document.querySelector(".employee-name").addEventListener("keydown", () => {
    document.querySelector(".error-label-register").style.display = "none";
    document
      .querySelector(".employee-data")
      .classList.remove("slide-down-creation");
    document
      .querySelector(".search-section")
      .classList.remove("slide-down-search");
    document
      .querySelector(".search-section")
      .classList.add("slide-down-search");
    document.querySelector(".search-section").classList.remove("slide-again");
  });

  document.querySelector(".btn-add").addEventListener("click", () => {
    let name = document.querySelector(".employee-name").value;

    if (name === "") {
      document.querySelector(".employee-name").focus();
      document.querySelector(".error-label-register").style.display = "block";
      document
        .querySelector(".employee-data")
        .classList.add("slide-down-creation");
      document
        .querySelector(".search-section")
        .classList.add("slide-down-search");
      document.querySelector(".search-section").classList.add("slide-again");
    }
  });
})(DataController, UIController);
