/* Magic Mirror
 * Module: MMM-EARTH
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


        getEARTH: function(url) {
			console.log("getData1");
        request({
            url: "https://epic.gsfc.nasa.gov/api/natural",
            method: 'GET'
        }, (error, response, body) => {
			console.log("getData3");
            if (!error && response.statusCode == 200) {
				console.log("getData4");
                var result = JSON.parse(body);
				console.log("getData5");
                this.sendSocketNotification('EARTH_RESULTS', result);
				console.log("getData5");
            } else if(response.statusCode == 404) {
				console.log("getData6");
                this.getStaticData();
				console.log("getData7");
            }
        });
    },
    
    getStaticData: function(){
		console.log("getData9");
        request({
            url: "https://epic.gsfc.nasa.gov/api/natural/date/2016-07-05/jpg/",
            method: 'GET'
        }, (error, response, body) => {
			console.log("getData11");
            if (!error && response.statusCode == 200) {
				console.log("getData12");
                var result = JSON.parse(body);
				console.log("getData13");
                this.sendSocketNotification('STATIC_RESULTS', result);
				console.log("getData14");
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
		console.log("getData15");
        if (notification === 'GET_EARTH') {
			console.log("getData16");
            this.getEARTH(payload);
			console.log("getData17");
        }
    },
	
	socketNotificationReceived: function(notification, payload) {
		console.log("getData18");
        if (notification === 'GET_STATIC') {
			console.log("getData19");
            this.getSTATIC(payload);
			console.log("getData20");
        }
    }
	
});
