const { view } = require("./view");
const { MSGS } = require("./update");

test("Dispatch function is not called when buttons are not clicked", () => {
  const dispatch = jest.fn();
  view(dispatch, 0);
  expect(dispatch).not.toHaveBeenCalled();
});

test("Button click handlers are functions", () => {
  const myView = view(() => {}, 0);
  expect(typeof myView.children[1].children[0].properties.onclick).toBe("function");
  expect(typeof myView.children[1].children[1].properties.onclick).toBe("function");
});

test("Button click handlers are different functions", () => {
  const myView = view(() => {}, 0);
  expect(myView.children[1].children[0].properties.onclick).not.toBe(myView.children[1].children[1].properties.onclick);
});

test("View returns the same structure for the same model", () => {
  const dispatch = () => {};
  const model = 5;
  const myView1 = view(dispatch, model);
  const myView2 = view(dispatch, model);
  expect(myView1).toEqual(myView2);
});

test("View returns different structure for different models", () => {
  const dispatch = () => {};
  const model1 = 5;
  const model2 = 10;
  const myView1 = view(dispatch, model1);
  const myView2 = view(dispatch, model2);
  expect(myView1).not.toEqual(myView2);
});
