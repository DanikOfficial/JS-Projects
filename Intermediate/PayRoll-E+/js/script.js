// Data Structure Controller
const DataController = (() => {
  // Data Structure
  let data = {
    employees: [],
    paychecks: [],
    careers: [
      { type: "Developer", value: 2500 },
      { type: "Tester", value: 2000 },
      { type: "Designer", value: 1500 },
    ],
    totalEmployes: 0,
  };

  // Employee Function Constructor
  let Employee = (id, name, career, registrationDate) => {
    this.id = id;
    this.name = name;
    this.registrationDate = registrationDate;
    this.career = career;
  };

  // Paycheck Function Constructor
  let Paycheck = (id, employeeId, month, value, status = "Not Paid") => {
    this.id = id;
    this.employeeId = employeeId;
    this.month = month;
    this.status = status;
    this.value = value;
  };

  // Adds new Employee and Returns his ID
  const addNewEmployee = (name, career) => {
    let id, date, registrationDate;

    // Gets the last Employee and increments his id by 1
    if (data.employees.length === 0) {
      id = data.employees[data.employees.length - 1].id + 1;
    } else {
      id = 0;
    }

    // Gets the current date
    date = new Date().toString().split(" ");

    // Formats the date. eg: day month year
    registrationDate = date[2] + " " + date[1] + " " + date[3];

    // Gets the career and salary value
    careerObj = data.careers.find((el) => el.type === career);

    // Creates new employee using Function Constructor
    const employee = new Employee(id, name, careerObj.type, registrationDate);

    // Adds the employee to the data structure
    data.employees.push(employee);

    // Adds the paychecks
    addPaychecks(id, careerObj.value);

    return id;
  };

  // Adds paychecks to newly created employee
  const addPaychecks = (employeeId, value) => {
    let date, id, month;

    date = new Date();

    // Adds a paycheck for each month
    for (let i = 0; i < 12; i++) {
      // Generates an id for each paycheck
      if (data.paychecks.length === 0) {
        id = data.paychecks[data.paychecks.length - 1].id + 1;
      } else {
        id = 0;
      }

      // Sets the currently month to the date object
      date.setMonth(i);

      // Gets the month String
      month = date.toString().split(" ")[1];

      // Creates new paycheck object
      const paycheck = new Paycheck(id, employeeId, month, value);

      // Adds the paycheck to the data structure
      data.paychecks.push(paycheck);
    }
  };

  console.log("Data Controller Running");

  return {
    addEmployee: (name, career) => {},
    testing: () => {
      console.log(data);
    },
  };
})();

// UI Controller
const UIController = (() => {
  const DOMStrings = {
    btnNewEmployee: ".btn-add",
    EmployeeName: ".employee-name",
    EmployeeCareer: ".career-type",
  };

  return {
    getNewEmployeeInput: () => {
      return {
        name: document.querySelector(DomStrings.EmployeeName).value,
        careerType: document.querySelector(DomStrings.EmployeeCareer).value,
      };
    },
    getDOMStrings: () => {
      return DOMStrings;
    },
  };
})();

// Global Controller
const Controller = ((dataCtrl, uiCtrl) => {
  const setUpEventListeners = () => {
    const DOM = uiCtrl.getDOMStrings();

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

  const ctrlAddEmployee = () => {
    //1. Get the Employee Data from UI
    //2. Send the Data to the Data Controller
    //3. Display the Data in the UI
  };

  const ctrlUpdateEmployee = () => {};

  const ctrlDeleteEmployee = () => {};

  return {
    init: () => {
      setUpEventListeners();
      console.log("Application has Started...");
    },
  };
})(DataController, UIController);

Controller.init();
