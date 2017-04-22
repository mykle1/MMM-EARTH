/* Magic Mirror
 * Module: MMM-EARTH
 *
 * By Mykle1 - Tutored by Cowboysdude - Rescued by Strawberry
 * 
 */
const NodeHelper = require('node_helper');
const request = require('request');
const moment = require('moment');


module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting module: " + this.name);
    },


    getEARTH: function(url) {
        request({
            url: "https://epic.gsfc.nasa.gov/api/natural/" + moment().format("YYYY-MM-DD"),
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                if (result.length > 0) {
                    this.sendSocketNotification('EARTH_RESULTS', result);
                } else {
                    this.getSTATIC();
                }
            }
        });
    },

    getSTATIC: function() {
        request({
            url: "https://epic.gsfc.nasa.gov/api/natural/date/2016-07-05",
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                this.sendSocketNotification('STATIC_RESULTS', result);
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_EARTH') {
            this.getEARTH(payload);
        }
    }
});