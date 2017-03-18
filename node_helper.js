/* Magic Mirror
    * Module: MMM-NASA
    *
    * By Mykle1  
    * 
    */
const NodeHelper = require('node_helper');
const request = require('request');
const moment = require('moment');

module.exports = NodeHelper.create({

    start: function() {
    	console.log("Starting module: " + this.name);
    },


    getNASA: function(url) {
    	var nowDate = moment().format('YYYY-MM-DD');
        request({
            url: ("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"),
            method: 'GET'
        }, (error, response, body) => {
      console.log(body);
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(JSON.stringify(body));
                this.sendSocketNotification('NASA_RESULTS', result);
            }
        });
    },
    


    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_NASA') {
                this.getNASA(payload);
            }
       }

});
