var devices = require('./devices.json');

var devices_arr = [];

function transToArr(root) {
    root.forEach(function(node) {
        devices_arr.push(node);
        if(node.hasOwnProperty('nodes')) {
            transToArr(node.nodes);
        }
    });
}

transToArr(devices);

exports.getTree = function() {
    return devices;
}

exports.getDeviceInfo = function(deviceId) {
    var id = parseInt(deviceId);
    var i;
    for(i = 0; i < devices_arr.length; i++) {
        var node = devices_arr[i];
        if(node.id === id) {
            if(node.hasOwnProperty('attrs')) {
                return node.attrs;
            } else {
                return [];
            }
        }
    }
    return [];
}

