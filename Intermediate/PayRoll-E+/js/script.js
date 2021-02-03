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

    salary = data.careers.find((element) => element.type === employee.career);

    // Updates paychecks related to the employee
    updateEmployeePaychecks(employee.id, employee.career, salary.value);

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

  const paySalary = (id) => {
    const paycheck = data.paychecks.find((element) => element.id === id);

    paycheck.status = "Paid";

    return paycheck.month;
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
    updateEmployee: (id, name, career) => {
      return updateEmployee(id, name, career);
    },
    getEmployees: () => {
      return data.employees;
    },
    paySalary: (id) => {
      return paySalary(id);
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
    cancelBtn: ".btn-cancel",
    deleteEmployeeBtn: ".btn-delete-employee",
    updateEmployeeBtn: ".btn-update",
    top: ".top",
    bottom: ".bottom",
    searchSection: ".search-section",
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

    let top = document.querySelector(DOMStrings.top);
    let bottom = document.querySelector(DOMStrings.bottom);
    let searchSection = document.querySelector(DOMStrings.searchSection);

    top.classList.add("scale-top");

    top.ontransitionend = () => {
      bottom.classList.add("scale-bottom");
      searchSection.classList.add("show-search-section");
    };
  };

  const deleteEmployeeItem = (id) => {
    let element = document.getElementById(id);
    element.remove();

    const items = document.querySelectorAll(".item");
    // Fixed empty state not showing automatically
    if (items.length === 0) {
      document.querySelector(DOMStrings.employeesList).innerHTML = "";

      let top = document.querySelector(DOMStrings.top);
      let bottom = document.querySelector(DOMStrings.bottom);
      let searchSection = document.querySelector(DOMStrings.searchSection);

      top.classList.remove("scale-top");

      top.ontransitionend = () => {
        bottom.classList.remove("scale-bottom");
        searchSection.classList.remove("show-search-section");
      };
    }
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

    if (result.length === 0) {
      list.innerHTML = `<div class="not-found">
      <h2 class="not-found-title">Oops, I didn't find them!</h2>
      <ion-icon class="not-found-icon" name="search-outline"></ion-icon>
      <p class="not-found-paragraph">
        Try to type their names with your eyes open. :)
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
    element.status === "Paid"
      ? `<span class="status">Paid</span>`
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

  const updateEmployee = (id, name, career, salary) => {
    document.querySelector(DOMStrings.empName).textContent = name;
    document.querySelector(DOMStrings.empCareer).textContent = career;
    document.querySelector(DOMStrings.empSalary).textContent = formatSalary(
      salary
    );
    document.querySelector("#emp-" + id + " span").textContent = name;

    document.querySelector(".alert").textContent = "Employee Updated!";
    document.querySelector(".alert").classList.add("show-alert");

    document.querySelector(".alert").ontransitionend = () => {
      document.querySelector(".alert").classList.remove("show-alert");
    };

    cancelUpdate();
  };

  const payItemSalary = (id, month) => {
    let element;

    element = document.getElementById(id);

    element.innerHTML = `
    <span class="month">${month}</span>
    <span class="status">Paid</span>
  `;

    document.querySelector(".alert").textContent = "Salary Paid!";
    document.querySelector(".alert").classList.add("show-alert");

    document.querySelector(".alert").ontransitionend = () => {
      document.querySelector(".alert").classList.remove("show-alert");
    };
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
    cancelUpdate();
    document
      .querySelector(DOMStrings.paychecksSection)
      .classList.remove("show-paychecks-section");
  };

  const cancelUpdate = () => {
    document
      .querySelector(DOMStrings.employeeUpdate)
      .classList.remove("show-employee-update");

    document
      .querySelector(DOMStrings.employeeInformation)
      .classList.remove("scale-employee-information");
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
    cancelUpdate: () => {
      cancelUpdate();
    },
    updateEmployee: (id, name, career, salary) => {
      updateEmployee(id, name, career, salary);
    },
    paySalary: (id, month) => {
      payItemSalary(id, month);
    },
    getUpdateInput: () => {
      return {
        id: document.querySelector(DOMStrings.empId).textContent,
        name: document
          .querySelector(DOMStrings.employeeNameUpdate)
          .value.trim(),
        career: document.querySelector(DOMStrings.employeeCareerUpdate).value,
      };
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
    let btnAdd, app, btnClose, btnDisplayUpdateBox, btnCancel;
    let deleteEmployeeBtn, updateEmployeeBtn, paychecksList;

    const DOM = UICtrl.getDOMStrings();

    app = document;

    btnAdd = document.querySelector(DOM.btnNewEmployee);

    employeeName = document.querySelector(DOM.employeeName);

    employeesList = document.querySelector(DOM.employeesList);

    careerType = document.querySelector(DOM.employeeCareer);

    searchField = document.querySelector(DOM.searchField);

    btnClose = document.querySelector(DOM.closeBtn);

    btnDisplayUpdateBox = document.querySelector(DOM.btnUpdate);

    btnCancel = document.querySelector(DOM.cancelBtn);

    deleteEmployeeBtn = document.querySelector(DOM.deleteEmployeeBtn);

    updateEmployeeBtn = document.querySelector(DOM.updateEmployeeBtn);

    paychecksList = document.querySelector(DOM.paychecksList);

    btnAdd.addEventListener("click", ctrlAddEmployee);

    btnDisplayUpdateBox.addEventListener("click", ctrlDisplayUpdateBox);

    btnClose.addEventListener("click", ctrlCloseModal);

    btnCancel.addEventListener("click", ctrlCancelUpdate);

    deleteEmployeeBtn.addEventListener("click", ctrlDeleteEmployee);

    updateEmployeeBtn.addEventListener("click", ctrlUpdateEmployee);

    app.addEventListener("keypress", (event) => {
      if (event.keyCode === 13 || event.which === 13) ctrlAddEmployee();
    });

    employeesList.addEventListener("click", ctrlDisplayOrDeleteEmployee);

    paychecksList.addEventListener("click", ctrlPaySalary);

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

  const ctrlUpdateEmployee = () => {
    const data = UICtrl.getUpdateInput();

    //1. Update the data in data structure
    const employee = DataCtrl.updateEmployee(
      parseInt(data.id),
      data.name,
      data.career
    );

    //2. Update the data in UI
    UICtrl.updateEmployee(
      data.id,
      employee.name,
      employee.career,
      employee.salary
    );
  };

  const ctrlDisplayOrDeleteEmployee = (event) => {
    let id, employeeID, list;
    list = event.target.classList.toString();
    id = event.target.id;

    // Displays the paycheck
    if (list.includes("item") && id.includes("emp")) {
      employeeID = parseInt(id.split("-")[1]);

      //Get the Employee and his paychecks
      const result = DataCtrl.getEmployeeAndPaychecks(employeeID);

      //Show the Employee and his data
      UICtrl.showEmployee(result);
    }

    // Delete the clicked employee
    if (list.includes("delete")) {
      let element, deleteNotification;

      let bool = confirm("Are you sure you want to delete this employee?");

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

  const ctrlDeleteEmployee = () => {
    let id, employeeID, element, bool, deleteNotification;

    bool = confirm("Are you sure you want to delete this employee?");

    if (bool) {
      id =
        "emp-" +
        document.querySelector(UICtrl.getDOMStrings().empId).textContent;

      employeeID = parseInt(
        document.querySelector(UICtrl.getDOMStrings().empId).textContent
      );

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

        // Closes the modal
        ctrlCloseModal();

        //Resets the employees list
        ctrlFilterEmployee();
      };
    }
  };

  const ctrlPaySalary = (event) => {
    let id, paycheckID, month;
    const action = event.target.parentNode.classList.toString();

    if (action === "btn-pay") {
      id = event.target.parentNode.parentNode.id;

      paycheckID = parseInt(id.split("-")[1]);

      //Update paycheck in data structure
      month = DataCtrl.paySalary(paycheckID);

      //Update paycheck in the UI
      UICtrl.paySalary(id, month);
    }
  };

  const ctrlFilterEmployee = () => {
    let input = document.querySelector(UICtrl.getDOMStrings().searchField);

    UICtrl.filterEmployees(input.value.trim(), DataCtrl.getEmployees());
  };

  const ctrlCancelUpdate = () => {
    UICtrl.cancelUpdate();
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
