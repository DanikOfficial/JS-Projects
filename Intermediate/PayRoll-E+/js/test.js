let careers = [
  { type: "Developer", value: 2500 },
  { type: "Deve", value: 2000 },
  { type: "Designer", value: 1500 },
];

let careerObj = careers.find((el) => el.type === "Developer");

console.log("Type: " + careerObj.type, "Value: " + careerObj.value);
