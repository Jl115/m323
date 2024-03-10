const { initModel } = require("./model");

test("initModel", () => {
  expect(initModel.counter).toEqual(0);
});
