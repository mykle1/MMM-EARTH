/* Magic Mirror
 * Module: MMM-NASA
 *
 * By Mykle1
 * 
 */
Module.register("MMM-NASA", {

    // Module config defaults.
    defaults: {
        updateInterval: 120000,
        animationSpeed: 1000,
        initialLoadDelay: 30, // 0 seconds delay Well that's wrong LOL  leave ithaha  make it longer :)
        retryDelay: 2500, //if not data how long before retryok
        useHeader: false, //this is called a boolean [a boolean is either true or false and nothing else. Do not use quotes around a boolean]
        header: "********Please set header txt in config.js***** see instructions", // 
        MaxWidth: "40%",
        MaxHeight: "40%",
        
    },

    // Define required scripts.  The standard :)ok
    getScripts: function() {
        return ["moment.js"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        // Set locale.
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
