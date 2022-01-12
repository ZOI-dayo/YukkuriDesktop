import {aquesTalk1, kanji2Koe} from "./yukumo.js";

window.onload = () => {
    main();
}

async function main() {
    console.log("aaa");
    console.log("aaaaaaa: " + await kanji2Koe("米国"));
    console.log(await aquesTalk1("f1", 100, "アアー。"));
}