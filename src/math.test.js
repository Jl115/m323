const { addition, subtraction, multiply, division } = require("./math");
test("addition", () => {
  expect(addition(1, 2)).toBe(3);
});
test("subtraction", () => {
  expect(subtraction(1, 2)).toBe(-1);
});
test("multiply", () => {
  expect(multiply(1, 2)).toBe(2);
});
test("division", () => {
  expect(division(1, 2)).toBe(0.5);
});