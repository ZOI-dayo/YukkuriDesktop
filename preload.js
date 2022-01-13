const { contextBridge } = require('electron');
const ElectronStore = require('electron-store');
const store = new ElectronStore();

contextBridge.exposeInMainWorld('modules', {
    request: require("request"),
    fs: require("fs"),
    path: require("path"),
});

contextBridge.exposeInMainWorld('envs', {
    USER_PATH: process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"],
});

contextBridge.exposeInMainWorld('config', {
    set: (key, value) => {return store.set(key, value);},
    get: (key) => {return store.get(key) ?? {};},
});

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})