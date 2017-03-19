/* Magic Mirror
 * Module: MMM-NASA
 *
 * By Mykle1  
 * 
 */
const NodeHelper = require('node_helper');
const request = require('request');


module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting module: " + this.name);
    },


    getNASA: function(url) {
        request({
            url: "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                this.sendSocketNotification('NASA_RESULTS', result);
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_NASA') {
            this.getNASA(payload);
        }
    }
}
