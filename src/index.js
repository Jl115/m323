import { app } from "./app";
import { initModel } from "./model";
import { view } from "./view";
import { update } from "./update";
const rootNode = document.getElementById("app");
app(initModel, update, view, rootNode);
