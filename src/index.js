// imports
import hh from "hyperscript-helpers";
import { h, diff, patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";
import axios from "axios";
// environment variables
const { API_KEY } = require("./environment");

// allows using html tags as functions in javascript
const { div, button, p, h1, input, label, img } = hh(h);

// A combination of Tailwind classes which represent a (more or less nice) button style
const btnStyle =
  "bg-blue-500 text-white font-bold py-2 h-11 w-11 rounded transition-transform hover:-translate-y-1 hover:translate-x-1";

// Messages which can be used to update the model
const MSGS = {
  SAVE_MEAL: "SAVE_MEAL",
  DELETE_WEATHER: "DELETE_WEATHER",
};

// View function which represents the UI as HTML-tag functions
async function view(dispatch, model) {
  const search = div({ className: "flex " }, [
    label(
      { for: "input1", type: "text", className: "flex items-center" },
      "Location"
    ),
    input({ className: "ml-2 shadow-md border w-96 mr-5", id: "input1" }),
    button(
      {
        className: btnStyle,
        onclick: async () => {
          const location = document.getElementById("input1").value;
          // const weatherData = await fetchData(location);
          dispatch({
            type: MSGS.SAVE_MEAL,
            payload: {
              location: location,
            },
          });
        },
      },
      "Add"
    ),
  ]);

  try {
    if (
      model.weather === null ||
      !model.weather ||
      model.weather.length === 0 ||
      model.weather === undefined
    ) {
      return search;
    } else
      return div({ className: "flex flex-col gap-4 items-center" }, [
        h1({ className: "text-2xl" }, `Weather`),
        search,
        div({ className: "flex w-full flex-col " }, [
          ...model.weather.map((item) => [
            div({ className: "flex w-full" }, [
              div(
                {
                  className:
                    "flex w-full items-center justify-center border-solid border-2 border-sky-50",
                },
                item.location
              ),
              div(
                {
                  className:
                    "flex w-full items-center justify-center border-solid border-2 border-sky-50",
                },
                `Temp: ${item.temp}❍`
              ),
              div(
                {
                  className:
                    "flex w-full items-center justify-center border-solid border-2 border-sky-50",
                },
                `High: ${item.high}`
              ),
              div(
                {
                  className:
                    "flex w-6/12 items-center justify-center border-solid border-2 border-sky-50",
                },
                `${item.low}`
              ),
              div(
                {
                  className:
                    "flex w-full items-center justify-center border-solid border-2 border-sky-50",
                },
                img({
                  src: `http://openweathermap.org/img/wn/${item.icon}@2x.png`,
                  className: "w-6/12",
                })
              ),
              button(
                {
                  className:
                    " w-6/12 bg-red-500 text-white font-bold py-2 h-11   rounded transition-transform hover:-translate-y-1 hover:translate-x-1 m-1",
                  onclick: () =>
                    dispatch({ type: MSGS.DELETE_WEATHER, payload: item }),
                },
                "remove"
              ),
            ]),
          ]),
        ]),
      ]);
  } catch (error) {
    window.location.reload();
  }
}

// Update function which takes a message and a model and returns a new/updated model
async function update(msg, model) {
  switch (msg.type) {
    case MSGS.SAVE_MEAL:
      let weatherPayload = msg.payload.location;
      let obj = await fetchData(weatherPayload);
      if (obj === undefined) {
        return;
      } else {
        const objectPayload = {
          id: obj.id,
          location: obj.location,
          temp: obj.temp,
          high: obj.high,
          low: obj.low,
          icon: obj.icon,
        };
        // Check for duplicates based on ID
        const isDuplicate = model.weather.some((item) => item.id === obj.id);
        if (!isDuplicate) {
          // Add new item only if it's not a duplicate
          const updatedLocation = model.weather.concat(
            updatedMeal(objectPayload)
          );
          return { ...model, weather: updatedLocation };
        } else {
          alert("Location already exists");
          return model;
        }
      }

    case MSGS.DELETE_WEATHER:
      const filteredweather = model.weather.filter(
        (item) => item.id !== msg.payload.id
      );
      return { ...model, weather: filteredweather };

    default:
      return model;
  }
}

// Function to increase the counter value by 1
function updatedMeal(payload) {
  console.log("\x1b[33m%s\x1b[0m", " --------------------", payload);
  return {
    id: payload.id,
    location: payload.location,
    temp: payload.temp,
    high: payload.high,
    low: payload.low,
    icon: payload.icon,
  };
}

// ⚠️ Impure code below (not avoidable but controllable)
async function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = await view(dispatch, model);
  let rootNode = await createElement(currentView);
  await node.appendChild(rootNode);
  async function dispatch(msg) {
    console.log("\x1b[33m%s\x1b[0m", " --------------------", msg.payload);

    model = await update(
      msg,
      model,
      msg.payload.id,
      msg.payload.location,
      msg.payload.temp,
      msg.payload.high,
      msg.payload.low,
      msg.payload.icon
    );
    console.log(model);

    const updatedView = await view(dispatch, model);
    const patches = await diff(currentView, updatedView);
    rootNode = await patch(rootNode, patches);
    currentView = updatedView;
  }
}
const initData = await fetchData("Bern");

// The initial model when the app starts
const initModel = {
  weather: [initData],
};

// The root node of the app (the div with id="app" in index.html)
const rootNode = document.getElementById("app");

// Start the app
await app(initModel, update, view, rootNode);
async function fetchData(location) {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&lang=de&units=metric&APPID=${API_KEY}`
    );

    if (response.status === 200) {
      const data = response.data;
      // Check for id before returning
      if (data.id) {
        return {
          id: data.id,
          location: data.name,
          temp: data.main.temp,
          high: data.main.temp_max,
          low: data.main.temp_min,
          icon: data.weather[data.weather.length - 1].icon,
        };
      } else {
        // Handle the case where `id` is missing in the response
        console.error("Response data does not contain an id property");
        return alert("Location not found");
      }
    }
  } catch (error) {
    // Handle other errors here
    return alert("Location not found ");
  }
}
