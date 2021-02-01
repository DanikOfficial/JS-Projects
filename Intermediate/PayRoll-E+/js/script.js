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

  // Deletes the Employee
  const deleteEmployee = (id) => {
    let index;

    // Finds the index of the employee id
    index = data.employees.findIndex((element) => element.id === id);

    data.employees.splice(index, 1);

    // Deletes the paychecks related to the employee
    deletePaychecks(id);
  };

  const updateEmployee = (id, name, career) => {
    let salary, employee;

    // Finds the employee
    employee = data.employees.find((element) => element.id === id);

    // Updates his data
    employee.name = name;
    employee.career = career;

    salary = data.career.find((element) => element.type === employee.career);

    // Updates paychecks related to the employee
    updateEmployeePaychecks(employee.id, employee.career, salary);

    return {
      name,
      career,
      salary: salary.value,
    };
  };

  const updateEmployeePaychecks = (id, newCareer, salary) => {
    data.paychecks.forEach((element) => {
      if (element.employeeId === id) {
        element.career = newCareer;
        element.value = salary;
      }
    });
  };

  // Deletes the paychecks related to the employee ID
  const deletePaychecks = (employeeId) => {
    data.paychecks = data.paychecks.filter(
      (element) => element.employeeId !== employeeId
    );
  };

  const getEmployeeAndPaychecks = (id) => {
    const employee = data.employees.find((element) => element.id === id);

    const paychecks = data.paychecks.filter(
      (element) => element.employeeId === id
    );

    const salary = data.careers.find(
      (element) => element.type === employee.career
    );

    return {
      employee,
      salary: salary.value,
      paychecks,
    };
  };

  return {
    addEmployee: (name, career) => {
      const employee = addNewEmployee(name, career);
      return employee;
    },
    deleteEmployee: (id) => {
      deleteEmployee(id);
    },
    getEmployees: () => {
      return data.employees;
    },
    getEmployeeAndPaychecks: (id) => {
      const data = getEmployeeAndPaychecks(id);
      return data;
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
    errorLabel: ".error-label-register",
    searchField: ".search-field",
    deleteConfirmation: ".delete-confirmation",
    paychecksSection: ".paychecks-section",
    empId: ".emp-id",
    empName: ".emp-name",
    empCareer: ".emp-career",
    empSalary: ".emp-salary",
    empRegDate: ".emp-reg-date",
    paychecksList: ".js--paychecks_list",
    closeBtn: ".close-modal",
    btnUpdate: ".btn-update-info",
    employeeUpdate: ".employee-update",
    employeeInformation: ".employee-information",
    employeeNameUpdate: ".employee-name__update",
    employeeCareerUpdate: ".career-type__update",
  };

  const addEmployee = (employee, employeesList, operation) => {
    if (operation === "new") {
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
    } else if (operation === "filter") {
      employeesList.insertAdjacentHTML(
        "afterbegin",
        `
      <div class="item" id="emp-${employee.id}">
    <span>${employee.name}</span>
    <button class="delete-employee">
      <ion-icon class="list-item-button" name="close-outline"></ion-icon>
    </button>
  </div>`
      );
    }
  };

  const addEmployeeItem = (employee) => {
    /*
    employeesList.insertAdjacentHTML(
      "afterbegin",
      `
    <div class="item new-item" id="emp-${employee.id}">
  <span>${employee.name}</span>
  <button class="delete-employee">
    <ion-icon class="list-item-button" name="close-outline"></ion-icon>
  </button>
</div>`
    );*/

    let employeesList = document.querySelector(DOMStrings.employeesList);

    addEmployee(employee, employeesList, "new");

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

    element.focus();
  };

  const deleteEmployeeItem = (id) => {
    let element = document.getElementById(id);
    element.remove();
  };

  const filterEmployees = (name, employees) => {
    const list = document.querySelector(DOMStrings.employeesList);

    list.innerHTML = "";

    employees.forEach((element) => {
      if (element.name.toUpperCase().indexOf(name.toUpperCase()) > -1) {
        addEmployee(element, list, "filter");
      }
    });

    const result = document.querySelectorAll(".item");

    console.log("result: " + result.length);

    if (result.length === 0) {
      list.innerHTML = `<div class="not-found">
      <ion-icon class="not-found-icon" name="newspaper-outline"></ion-icon>
      <p class="not-found-paragraph">
        There are no employees with this name!
      </p>
    </div>`;
    }
  };

  const formatSalary = (salary) => {
    let stringSalary = "" + salary;

    return stringSalary.length > 3
      ? stringSalary.substr(0, stringSalary.length - 3) +
          "," +
          stringSalary.substr(stringSalary.length - 3, stringSalary.length) +
          ".00$"
      : stringSalary + ".00$";
  };

  const showEmployee = (data) => {
    const paychecksList = document.querySelector(DOMStrings.paychecksList);

    document.querySelector(DOMStrings.empId).textContent = data.employee.id;
    document.querySelector(DOMStrings.empName).textContent = data.employee.name;
    document.querySelector(DOMStrings.empCareer).textContent =
      data.employee.career;
    document.querySelector(DOMStrings.empSalary).textContent = formatSalary(
      data.salary
    );
    document.querySelector(DOMStrings.empRegDate).textContent =
      data.employee.registrationDate;

    document
      .querySelector(DOMStrings.paychecksSection)
      .classList.add("show-paychecks-section");

    paychecksList.innerHTML = "";

    data.paychecks.forEach((element) => {
      paychecksList.insertAdjacentHTML(
        "beforeend",
        `<div class="paycheck" id="paycheck-${element.id}">
  <span class="month">${element.month}</span>
  ${
    element.status === "<span>Paid</span>"
      ? "Paid"
      : `<button class="btn-pay">
  <ion-icon class="icon" name="cash-outline"></ion-icon>
</button>`
  }
</div>`
      );
    });

    document.querySelector(
      DOMStrings.employeeNameUpdate
    ).value = document.querySelector(DOMStrings.empName).textContent;

    let careerOptions = Array.from(document.querySelectorAll(".update_career"));
    let career = document.querySelector(DOMStrings.empCareer).textContent;

    careerOptions.forEach((element) => {
      if (element.value !== career && element.hasAttribute("selected")) {
        element.removeAttribute("selected");
      } else if (element.value === career) {
        element.setAttribute("selected", "");
      }
    });
  };

  const displayUpdateBox = () => {
    document
      .querySelector(DOMStrings.employeeUpdate)
      .classList.add("show-employee-update");

    document
      .querySelector(DOMStrings.paychecksList)
      .classList.add("move-list-down");
    document
      .querySelector(DOMStrings.employeeInformation)
      .classList.add("scale-employee-information");
  };

  const closeModal = () => {
    document
      .querySelector(DOMStrings.paychecksSection)
      .classList.remove("show-paychecks-section");
  };

  return {
    getRegistrationInput: () => {
      return {
        name: document.querySelector(DOMStrings.employeeName).value.trim(),
        careerType: document.querySelector(DOMStrings.employeeCareer).value,
      };
    },
    addEmployeeItem: (employee) => {
      addEmployeeItem(employee);
    },
    deleteEmployeeItem: (id) => {
      deleteEmployeeItem(id);
    },
    filterEmployees: (name, employees) => {
      filterEmployees(name, employees);
    },
    showEmployee: (data) => {
      showEmployee(data);
    },
    closeModal: () => {
      closeModal();
    },
    clearFields: () => {
      document.querySelector(DOMStrings.employeeName).value = "";
    },
    displayUpdateBox: () => {
      displayUpdateBox();
    },
    getDOMStrings: () => {
      return DOMStrings;
    },
  };
})();

// Global Controller
const Controller = ((DataCtrl, UICtrl) => {
  // Sets ups all event listeners
  const setUpEventListeners = () => {
    let employeesList, careerType, searchField, employeeName;
    let btnAdd, app, btnClose, btnDisplayUpdateBox;

    const DOM = UICtrl.getDOMStrings();

    app = document;

    btnAdd = document.querySelector(DOM.btnNewEmployee);

    employeeName = document.querySelector(DOM.employeeName);

    employeesList = document.querySelector(DOM.employeesList);

    careerType = document.querySelector(DOM.employeeCareer);

    searchField = document.querySelector(DOM.searchField);

    btnClose = document.querySelector(DOM.closeBtn);

    btnDisplayUpdateBox = document.querySelector(DOM.btnUpdate);

    btnAdd.addEventListener("click", ctrlAddEmployee);

    btnDisplayUpdateBox.addEventListener("click", ctrlDisplayUpdateBox);

    btnClose.addEventListener("click", ctrlCloseModal);

    app.addEventListener("keypress", (event) => {
      if (event.keyCode === 13 || event.which === 13) ctrlAddEmployee();
    });

    employeesList.addEventListener("click", ctrlDisplayOrDeleteEmployee);

    careerType.addEventListener("click", () => {
      if (employeeName.value.trim() === "") {
        document
          .querySelector(DOM.errorLabel)
          .classList.add("show-error-register");
        document.querySelector(DOM.employeeName).focus();
      }
    });

    searchField.addEventListener("keyup", ctrlFilterEmployee);

    employeeName.addEventListener("keyup", () => {
      if (employeeName.value.trim() !== "") {
        document
          .querySelector(DOM.errorLabel)
          .classList.remove("show-error-register");
      }
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

  const ctrlDisplayOrDeleteEmployee = (event) => {
    let id, employeeID, list;
    list = event.target.classList.toString();

    // Displays the paycheck
    if (list.includes("item")) {
      id = event.target.id;

      employeeID = parseInt(id.split("-")[1]);

      //Get the Employee and his paychecks
      const result = DataCtrl.getEmployeeAndPaychecks(employeeID);

      //Show the Employee and his data
      UICtrl.showEmployee(result);
    }

    // Delete the clicked employee
    if (list.includes("delete")) {
      let element, deleteNotification;

      let bool = confirm("Are you sure you want to remove this employee?");

      if (bool) {
        id = event.target.parentNode.id;

        employeeID = parseInt(id.split("-")[1]);

        element = document.getElementById(id);

        element.classList.add("remove");

        deleteNotification = document.querySelector(
          UICtrl.getDOMStrings().deleteConfirmation
        );

        deleteNotification.classList.add("show-delete-confirmation");

        element.onanimationend = () => {
          // Deletes the employee in the DataStructure
          DataCtrl.deleteEmployee(employeeID);

          //Deletes the employee from the UI
          UICtrl.deleteEmployeeItem(id);

          deleteNotification.classList.remove("show-delete-confirmation");
        };
      }
    }
  };

  const ctrlFilterEmployee = () => {
    let input = document.querySelector(UICtrl.getDOMStrings().searchField);

    UICtrl.filterEmployees(input.value.trim(), DataCtrl.getEmployees());
  };

  const ctrlDisplayUpdateBox = () => {
    UICtrl.displayUpdateBox();
  };

  const ctrlCloseModal = () => {
    UICtrl.closeModal();
  };

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
