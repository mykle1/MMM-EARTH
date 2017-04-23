/* Magic Mirror
 * Module: MMM-EARTH
 * Credit: NASA's Earth Polychromatic Imaging Camera (EPIC) team.
 * 
 * By Mykle1 - Tutored by Cowboysdude - Rescued by Strawberry 3.141
 */
Module.register("MMM-EARTH", {

    // Module config defaults.
    defaults: {
        updateInterval: 30 * 60 * 1000, // 30 minutes
        animationSpeed: 3000,
        initialLoadDelay: 1250,
        retryDelay: 2500,
        useHeader: false,
        header: "********Please set header txt in config.js***** see README",
        MaxWidth: "50%",
        MaxHeight: "50%",
        rotateInterval: 10 * 1000,

    },

    // Define required scripts. - The standard
    getScripts: function() {
        return ["moment.js"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        // Set locale.
        this.today = "";
        this.earth = {};
        this.activeItem = 0;
        this.rotateInterval = null;
        this.scheduleUpdate();
    },

    getDom: function() {

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";

        if (!this.loaded) {
            wrapper.innerHTML = "Hello, Mother Earth...<img src='modules/MMM-EARTH/loading/loading.gif' width='22' height='22'>";
            wrapper.className = "bright light small";
            return wrapper;
        }
        if (this.config.useHeader === true) {
            var header = document.createElement("header");
            header.className = "xsmall bright";
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }

        var hkeys = Object.keys(this.earth);
        if (hkeys.length > 0) {
            if (this.activeItem >= hkeys.length) {
                this.activeItem = 0;
            }
            var earth = this.earth[hkeys[this.activeItem]];

            var earthImg = earth.image;
            //  console.log(earthImg+".jpg");  // for checking later if necessary

            var earthPhoto = document.createElement("div");
            var daily = earth.date.slice(0, 10).replace(/-/g, "/"); // <-- Amazing Strawberry fix
            earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/natural/' + daily + '/jpg/' + earthImg + '.jpg"  width="' + this.config.MaxWidth + '" height="' + this.config.MaxHeight + '">';
        }
        wrapper.appendChild(earthPhoto);


        return wrapper;
    },



    processEARTH: function(data) {
        this.today = data.Today;
        this.earth = data;
        this.loaded = true;
    },

    scheduleCarousel: function() {
        console.log("Showing Mother Earth for today");
        this.rotateInterval = setInterval(() => {
            this.activeItem++;
            this.updateDom(this.config.animationSpeed);
        }, this.config.rotateInterval);
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getEARTH();
        }, this.config.updateInterval);
        this.getEARTH(this.config.initialLoadDelay);
        var self = this;
    },


    getEARTH: function() {
        this.sendSocketNotification('GET_EARTH');

    },

    getSTATIC: function() {
        this.sendSocketNotification('GET_STATIC');

    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "EARTH_RESULTS") {
            this.processEARTH(payload);
            if (this.rotateInterval == null) {
                this.scheduleCarousel();
            }
            this.updateDom(this.config.fadeSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },

});
