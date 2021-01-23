// Data Structure Controller
const DataController = (() => {
  // Employee Function Constructor
  let Employee = (id, name, career, registrationDate) => {
    this.id = id;
    this.name = name;
    this.registrationDate = registrationDate;
    this.career = career;
  };

  // Paycheck Function Constructor
  let Paycheck = (id, employeeId, month, status = "Not Paid") => {
    this.id = id;
    this.employeeId = employeeId;
    this.month = month;
    this.status = status;
  };

  let data = {
    emp: [],
    paychecks: [],
    careers: [
      { type: "Developer", value: 2500 },
      { type: "Tester", value: 2000 },
      { type: "Designer", value: 1500 },
    ],
    totalEmployes: 0,
  };

  // Adds new Employee and Returns his ID
  const addNewEmployee = (name, career, registrationDate) => {
    let id, date, salary;

    // Gets the last Employee and increments his id by 1
    if (data.emp.length === 0) {
      id = data.emp[data.emp.length - 1].id + 1;
    } else {
      id = 0;
    }

    // Adds new Paychecks
    const addPaychecks = (employeeId) => {};

    // Gets the date and splits using space
    date = new Date().toString().split(" ");

    // Formats the date. eg: day month year
    registrationDate = date[2] + " " + date[1] + " " + date[3];

    // Gets the career
    careerObj = data.careers.find((el) => el.type === career);

    const employee = new Employee();

    return id;
  };

  console.log("Data Controller Running");

  return {
    addEmployee: (name, salary) => {},
  };
})();

// User Interface Controller
const UIController = (() => {
  console.log("UI Controller Running");
})();

// Global Controller
const Controller = ((dataCtrl, uiCtrl) => {
  const setUpEventListeners = () => {
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
      .addEventListener("transitionend", () => {});
  };

  return {
    init: () => {
      setUpEventListeners();
      console.log("Application has Started...");
    },
  };
})(DataController, UIController);

Controller.init();
