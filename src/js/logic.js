import {aquesTalk, kanji2Koe} from "./yukumo.js";

window.onload = () => {
    main();
}

async function main() {
    document.getElementById("record").onclick = () => download();
}

async function download() {
    const fs = window.modules.fs;
    const path = window.modules.path;

    const voice_data = {};
    {
        const voice_select_element = document.getElementById("voice_select");
        const select_data = voice_select_element.options[voice_select_element.selectedIndex].value.split("_");

        voice_data["version"] = select_data[0];
        voice_data["type"] = select_data[1];
        voice_data["boyomi"] = true;

        const speed_element = document.getElementById("speed");
        voice_data["speed"] = speed_element.value;

        const text_element = document.getElementById("text");
        voice_data["koe_text"] = await kanji2Koe(voice_data["boyomi"], text_element.value);
    }
    const audio_data = await aquesTalk(
        voice_data["version"],
        voice_data["type"],
        voice_data["boyomi"],
        voice_data["speed"],
        voice_data["koe_text"]
    );

    try {
        fs.writeFileSync( path.join(window.modules.USER_PATH, 'Desktop/koe.wav'), audio_data, 'binary');
    } catch (err) {
        console.error(err);
    }
}