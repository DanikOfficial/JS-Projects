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
  let Employee = function (id, name, career, registrationDate) {
    this.id = id;
    this.name = name;
    this.registrationDate = registrationDate;
    this.career = career;
  };

  // Paycheck Function Constructor
  let Paycheck = function (id, employeeId, month, value, status = "Not Paid") {
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
    if (data.employees.length !== 0) {
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

    return {
      id,
      name,
    };
  };

  // Adds paychecks to newly created employee
  const addPaychecks = (employeeId, value) => {
    let date, id, month;

    date = new Date();

    // Adds a paycheck for each month
    for (let i = 0; i < 12; i++) {
      // Generates an id for each paycheck
      if (data.paychecks.length !== 0) {
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
    addEmployee: (name, career) => {
      // Adds employee and returns his id and name
      const employee = addNewEmployee(name, career);

      return employee;
    },
    testing: () => {
      console.log(data);
    },
  };
})();

// UI Controller
const UIController = (() => {
  const DOMStrings = {
    btnNewEmployee: ".btn-add",
    employeeName: ".employee-name",
    employeeCareer: ".career-type",
    employeesList: ".js--employees_list",
  };

  return {
    getRegistrationInput: () => {
      return {
        name: document.querySelector(DOMStrings.employeeName).value.trim(),
        careerType: document.querySelector(DOMStrings.employeeCareer).value,
      };
    },
    addEmployeeItem: (employee) => {
      let employeesList = document.querySelector(DOMStrings.employeesList);

      employeesList.insertAdjacentHTML(
        "afterbegin",
        `
      <div class="item new-item" id="emp-${employee.id}">
    <span>${employee.name}</span>
    <button class="delete-employee">
      <ion-icon class="list-item-button" name="close-outline"></ion-icon>
    </button>
  </div>`
      );

      const element = document.querySelector(`#emp-${employee.id}`);

      element.onanimationend = () => {
        if (element.classList.contains("new-item"))
          element.classList.remove("new-item");
      };

      // Sets default attribute
      let el = document.querySelector(".default");

      if (el.hasAttribute("selected")) {
        el.removeAttribute("selected");
        el.setAttribute("selected", "");
      } else {
        el.setAttribute("selected", "");
      }
    },
    clearFields: () => {
      console.log("Inside Clear Fields");
      console.log(document.querySelector(DOMStrings.employeeName).value);
      document.querySelector(DOMStrings.employeeName).value = "";
    },
    getDOMStrings: () => {
      return DOMStrings;
    },
  };
})();

// Global Controller
const Controller = ((DataCtrl, UICtrl) => {
  const setUpEventListeners = () => {
    const DOM = UICtrl.getDOMStrings();

    document
      .querySelector(DOM.btnNewEmployee)
      .addEventListener("click", ctrlAddEmployee);

    document.addEventListener("keypress", (event) => {
      if (event.keyCode === 13 || event.which === 13) ctrlAddEmployee();
    });
  };

  const ctrlAddEmployee = () => {
    // Get the Employee Data from UI
    const input = UICtrl.getRegistrationInput();

    if (validateFields(input)) {
      // Send the Data to the Data Controller
      const employee = DataCtrl.addEmployee(input.name, input.careerType);

      // Display the Data in the UI
      UICtrl.addEmployeeItem(employee);

      // Clear Fields
      UICtrl.clearFields();
    }
  };

  const ctrlUpdateEmployee = () => {};

  const ctrlDeleteEmployee = () => {};

  const validateFields = (input) => {
    let response = false;

    if (input.name !== "" && !input.careerType.includes("Choose"))
      response = true;

    return response;
  };

  return {
    init: () => {
      setUpEventListeners();
      console.log("Application has Started...");
    },
  };
})(DataController, UIController);

Controller.init();
