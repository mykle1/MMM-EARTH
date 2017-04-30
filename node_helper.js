/* Magic Mirror
 * Module: MMM-EARTH
 *
 * By Mykle1 - Tutored by Cowboysdude - Additions by Strawberry
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
        console.log(url);
        request({
            url: url,
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                if (result.length > 0) {
                    this.sendSocketNotification('EARTH_RESULTS', result);
                }
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_EARTH') {
            this.getEARTH(payload);
        }
    }
});