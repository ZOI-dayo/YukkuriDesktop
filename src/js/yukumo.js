export async function kanji2Koe(boyomi, kanji_text) {
    const request = window.modules.request;

    // 辞書

    const options = {
        url: `https://www.yukumo.net/api/v2/aqk2k/koe.txt?boyomi=${boyomi}&kanji=${encodeURI(kanji_text)}`,
        method: 'GET'
    }

    return await new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            // console.log(error);
            // console.log(response);
            // console.log(body);
            if(error !== null) reject(error);
            else if(response.statusCode === 200) resolve(body);
            else reject(response);
        })
    });
}

export async function aquesTalk(version, type, boyomi, speed, koe_text) {
    const request = window.modules.request;

    // 辞書

    const options = {
        url: `https://www.yukumo.net/api/v2/${version}/koe.wav?type=${type}&effect=none&boyomi=${boyomi}&speed=${speed}&volume=100&koe=${encodeURI(koe_text)}`,
        method: 'GET',
        encoding: null
    }

    return await new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if(error !== null) reject(error);
            else if(response.statusCode === 200) resolve(body);
            else reject(response);
        })
    });
}