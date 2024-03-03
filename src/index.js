// imports
import hh from "hyperscript-helpers";
import { h, diff, patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";

// allows using html tags as functions in javascript
const { div, button, p, h1, input } = hh(h);

// A combination of Tailwind classes which represent a (more or less nice) button style
const btnStyle =
  "bg-blue-500 text-white font-bold py-2 h-11 w-11 rounded transition-transform hover:-translate-y-1 hover:translate-x-1";

// Messages which can be used to update the model
const MSGS = {
  SAVE_MEAL: "SAVE_MEAL",
  DELETE_MEAL: "DELETE_MEAL",
};

// View function which represents the UI as HTML-tag functions
function view(dispatch, model) {
  return div({ className: "flex flex-col gap-4 items-center" }, [
    h1({ className: "text-2xl " }, `My Counter`),
    div({ className: "flex flex-row gap-8" }, [
      div({ className: "flex flex-col gap-3" }, [
        h1({ className: "text-2xl " }, `Meal ?`),
        input({
          type: "text",
          placeholder: "Enter Meal",
        }),
      ]),
      div({ className: "flex flex-col gap-3" }, [
        h1({ className: "text-2xl " }, `Calories?`),
        input({
          type: "number",
          placeholder: "Enter calories",
        }),
      ]),
      button(
        {
          className: btnStyle,
          onclick: () => {
            const mealInput = document.querySelector("input[type='text']");
            const caloriesInput = document.querySelector(
              "input[type='number']"
            );

            const mealName = mealInput.value;
            const amountCalories = caloriesInput.value;

            dispatch(MSGS.SAVE_MEAL, mealName, amountCalories);
          },
        },
        "Save"
      ),
    ]),
    div(
      {
        className: "overflow-y-scroll max-w-2xl w-screen",
        style: "height: 40em;",
      },
      [
        div(
          {
            className: "grid grid-cols-8 border-solid border-2 border-sky-50",
          },
          [
            // Meal and calorie headers
            div(
              {
                className:
                  "flex col-span-4 items-center justify-center border-solid border-2 border-sky-50",
              },
              h1({}, "Meal")
            ),
            div(
              {
                className:
                  "flex items-center col-span-4 justify-center border-solid border-2 border-sky-50",
              },
              h1({}, "Calories")
            ),
            // Loop through meals with a delete button
            ...model.map((item, index) => [
              div(
                {
                  className:
                    "flex col-span-4 items-center justify-center border-solid border-2 border-sky-50",
                },
                item.meal
              ),

              div(
                {
                  className:
                    "flex col-span-3 items-center justify-center border-solid border-2 border-sky-50",
                },
                `${item.calories}kcl`
              ),
              button(
                {
                  className:
                    "col-span-1 bg-red-500 text-white font-bold py-2 h-11  rounded transition-transform hover:-translate-y-1 hover:translate-x-1 m-1",
                  onclick: () => dispatch(MSGS.DELETE_MEAL, index),
                },
                "remove"
              ),
            ]),
            // Total calories
            div(
              {
                className:
                  "flex items-center justify-center border-solid border-2 border-sky-50 col-span-8",
                style: "",
              },
              h1({}, `Total Calories: ${getTotal(model)} `)
            ),
          ]
        ),
      ]
    ),
  ]);
}

// Update function which takes a message and a model and returns a new/updated model
function update(msg, model, mealName, amountCalories, index) {
  switch (msg) {
    case MSGS.SAVE_MEAL:
      return [...model, updatedMeal(mealName, amountCalories)];
    case MSGS.DELETE_MEAL:
      const updatedModel = [...model];
      updatedModel.splice(index, 1);
      return updatedModel;
    default:
      return model;
  }
}

// Function to increase the counter value by 1
function updatedMeal(mealName, amountCalories) {
  return { meal: mealName, calories: amountCalories };
}


// Function for Get the Amount
function getTotal(model) {
  const totalCalories = model.reduce(
    (total, meal) => total + parseInt(meal.calories, 10),
    0
  );
  return `${totalCalories.toFixed(0)}kcl`;
}

// ⚠️ Impure code below (not avoidable but controllable)
function app(initMeal, update, view, node) {
  let model = initMeal;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(msg, mealName, amountCalories, index) {
    model = update(msg, model, mealName, amountCalories, index);
    console.log(model);

    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

// The initial model when the app starts
const initMeal = [];

// The root node of the app (the div with id="app" in index.html)
const rootNode = document.getElementById("app");

// Start the app
app(initMeal, update, view, rootNode);
