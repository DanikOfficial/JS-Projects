const formatSalary = (salary) => {
  let stringSalary = "" + salary;
};

let salary = 1500;
let stringSalary = "" + salary;

let s =
  stringSalary.length > 3
    ? stringSalary.substr(0, stringSalary.length - 3) +
      "," +
      stringSalary.substr(stringSalary.length - 3, stringSalary.length) +
      ".00"
    : stringSalary + ".00";

console.log(s);
