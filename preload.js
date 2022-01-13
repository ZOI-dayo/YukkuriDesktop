const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('modules', {
    request: require("request"),
    fs: require("fs"),
    path: require("path"),
    Buffer: Buffer,
    USER_PATH: process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"],
})

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})