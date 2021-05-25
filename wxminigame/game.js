import "./scripts/libs/adapter/index.js";
import * as THREE from "./scripts/libs/three.js";
import * as fgui from "./scripts/libs/fairygui.js";
import Inventory from "./scripts/src/Inventory.js";
window.THREE = THREE;
window.fgui = fgui;

new Inventory();