const studentGrades = [
  { name: "Joe", grade: 88 },
  { name: "Jen", grade: 94 },
  { name: "Steph", grade: 77 },
  { name: "Allen", grade: 60 },
  { name: "Gina", grade: 54 },
];
const getFeedback = (grade) => {
switch (grade) {
  case grade >= 90:
    return 'a';
  case grade >= 80:
    return 'b';
  case grade >= 70:
    return 'c';
  case grade >= 60:
    return 'd';
  default:
    return 'f';
};
}
const genFeedback = (grade) => (student) => {
  const feedbackGrade = getFeedback(grade);
  return `Nice Job ${student.name}, you got an ${feedbackGrade}`;
};

const studentFeedback = studentGrades.map((student) => {
  const feedbackGenerator = genFeedback(student.grade);
  return feedbackGenerator(student);
});

console.log(studentFeedback);

const R = require('./rambda.min.js'); 
const strings = ["apple", "banana", "orange"];
const addPrefix = R.curry((prefix, str) => prefix + str);
const prefix = "Fruit: ";
const stringsWithPrefix = strings.map(addPrefix(prefix));
console.log(stringsWithPrefix);

let arrayLength = 0;
// impure Array
function impureArrayLength(arr) {
  arrayLength = arr.length;
  return arrayLength;
}
const myArray = [1, 2, 3, 4, 5];
console.log(impureArrayLength(myArray));
console.log(arrayLength); 

// pure array
function pureArrayLength(arr) {
  return arr.length;
}
console.log(pureArrayLength(myArray));








