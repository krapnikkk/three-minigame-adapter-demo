import "./scripts/libs/adapter/index.js";
import * as THREE from "./scripts/libs/three.js";
import * as fgui from "./scripts/libs/fairygui.js";

// 全局注册
export const init = () => {
    window.THREE = THREE;
    window.fgui = fgui;
}
init();
