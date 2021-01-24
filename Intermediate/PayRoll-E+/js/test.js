let careers = [
  { type: "Developer", value: 2500 },
  { type: "Deve", value: 2000 },
  { type: "Designer", value: 1500 },
];

let careerObj = careers.find((el) => el.type === "Developer");

let date = new Date();

for (let i = 0; i < 12; i++) {
  date.setMonth(i);
  console.log(date.toString().split(" ")[1]);
}

// console.log("Type: " + careerObj.type, "Value: " + careerObj.value);
