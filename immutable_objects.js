const AGE = 1;
const OBJECT = {
  head: "brown",
  body: "White",
  fot: "Yellow"
};

const updatedObject = {
  ...OBJECT,
  age: AGE
};

console.log(updatedObject);

const newObject = {
  ...updatedObject,
  age: updatedObject.age + 23
}
console.log(newObject);

const { age, ...removedObject } = newObject;
console.log(removedObject);



