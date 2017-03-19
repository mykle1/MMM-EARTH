/* Magic Mirror
 * Module: MMM-NASA
 *
 * By Mykle1
 * 
 */
Module.register("MMM-NASA", {

    // Module config defaults.
    defaults: {
        updateInterval: 10 * 360000,
        animationSpeed: 1000,
        initialLoadDelay: 1000,
        retryDelay: 2500,
        useHeader: true,
        header: "********Please set header txt in config.js***** see instructions", // 
        MaxWidth: "40%",
        MaxHeight: "40%"
    },

    // Define required scripts.
    getScripts: function() {
        return ["moment.js"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        // Set locale.
        moment.locale(config.language);
        this.today = "";
        this.scheduleUpdate();
    },

    getDom: function() {

        var nasa = this.nasa;

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";

        if (!this.loaded) {
            wrapper.innerHTML = "Getting your picture...<img src='modules/MMM-NASA/loading/loading.gif' width='22' height='22'>"; //added some sizzle for you
            wrapper.className = "bright light xsmall";
            return wrapper;
        }
        if (this.config.useHeader === true) {
            var header = document.createElement("header");
            header.className = "xsmall bright";
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }

        var top = document.createElement("div");
        top.className = ("small bright");

        var nasaPhoto = document.createElement("div");
        var nasaIcon = document.createElement("img");
        nasaIcon.style.maxWidth = this.config.MaxWidth;
        nasaIcon.style.maxHeight = this.config.MaxHeight;
        nasaIcon.src = nasa.hdurl;
        nasaPhoto.appendChild(nasaIcon);
        top.appendChild(nasaPhoto);

        wrapper.appendChild(top);
        return wrapper;
    },

    processNASA: function(data) {
        this.today = data.Today;
        this.nasa = data;
        this.loaded = true;
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getNASA();
        }, this.config.updateInterval);

        this.getNASA(this.config.initialLoadDelay);
    },


    getNASA: function() {
        this.sendSocketNotification('GET_NASA');

    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "NASA_RESULTS") {
            this.processNASA(payload);
            this.updateDom(this.config.fadeSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },

});
