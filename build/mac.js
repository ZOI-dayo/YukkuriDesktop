const builder = require('electron-builder');

builder.build({
    config: {
        'appId': 'net.zoizoi.yukkuri_desktop',
        'mac': {
            'target': 'zip',
        }
    }
});