import {aquesTalk, kanji2Koe} from "./yukumo.js";

let currentPreset = "";

window.onload = async () => {
    await main();
}

async function main() {
    document.getElementById("record").onclick = () => download();
    document.getElementById("preset_add").onclick = () => addPreset();
    reloadPresets()
}

async function getVoiceData() {
    const voice_data = {};
    {
        const voice_select_element = document.getElementById("voice_select");
        const select_data = voice_select_element.options[voice_select_element.selectedIndex].value.split("_");

        voice_data["version"] = select_data[0];
        voice_data["type"] = select_data[1];
        voice_data["boyomi"] = true;

        const speed_element = document.getElementById("speed");
        voice_data["speed"] = speed_element.value;
    }
    return voice_data;
}

async function download() {
    const fs = window.modules.fs;
    const path = window.modules.path;

    const voice_data = await getVoiceData();
    {
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
        fs.writeFileSync(path.join(window.envs.USER_PATH, 'Desktop/koe.wav'), audio_data, 'binary');
    } catch (err) {
        console.error(err);
    }
}

async function addPreset() {
    const name = document.getElementById("name_edit_input").value;
    if (name === "") return;

    const voice_data = await getVoiceData();
    const current_presets = window.config.get("presets");
    current_presets[name] = voice_data;
    window.config.set("presets", current_presets);

    reloadPresets();
}

function reloadPresets() {
    const presets = document.getElementById("presets_area");
    presets.innerHTML = "";

    const current_presets = window.config.get("presets");
    for (const name in current_presets) {
        const voice_data = current_presets[name];
        // console.log(voice_data);
        presets.innerHTML += `
<div class="preset" id="preset_id_${name}">
  <div class="preset_name">${name}</div>
  <div class="preset_detail">${voice_data["type"]}, s:${voice_data["speed"]}, b:${voice_data["boyomi"]}</div>
</div>
`;
    }

    for (let element of document.getElementById("presets_area").children) {
        const name = element.id.slice(10);
        element.onclick = () => changePreset(name);
    }
}

function changePreset(name) {
    for (let element of document.getElementsByClassName("preset_selecting")) {
        element.classList.remove("preset_selecting");
    }
    document.getElementById(`preset_id_${name}`).classList.add("preset_selecting");

    const presets = window.config.get("presets");
    const voice_data = presets[name];
    {
        document.getElementById("name_edit_input").value = name;
        const voice_select_element = document.getElementById("voice_select");
        voice_select_element.value = voice_data["version"] + "_" + voice_data["type"];
        // voice_data["boyomi"] = true;
        const speed_element = document.getElementById("speed");
        speed_element.value = voice_data["speed"];
    }
}