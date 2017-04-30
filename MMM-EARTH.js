/* Magic Mirror
 * Module: MMM-EARTH
 *
 * By Mykle1 - Tutored by Cowboysdude - Additions by Strawberry
 * 
 */
Module.register("MMM-EARTH", {

    // Module config defaults.
    defaults: {
        style: "Natural", // Natural, Enhanced, Lunar, naturalThumb, enhancedThumb
        updateInterval: 30 * 60 * 1000, // 30 minutes - Don't change!
        animationSpeed: 3000,
        initialLoadDelay: 1250,
        retryDelay: 2500,
        useHeader: false,
        header: "********Please set header txt in config.js***** see README",
        MaxWidth: "50%", // Should be the same as MaxHeight
        MaxHeight: "50%", // Should be the same as MaxWidth
        rotateInterval: 10 * 1000,

    },

    // Define required scripts.
    getScripts: function() {
        return ["moment.js"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        // Set locale.
        this.url = this.getUrl();
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
            // console.log(earthImg+".jpg");  // for checking

            var earthPhoto = document.createElement("div");
            var daily = earth.date.slice(0, 10).replace(/-/g, "/"); // <-- Strawberry


            if (this.config.style == "Natural") {
                earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/natural/' + daily + '/jpg/' + earthImg + '.jpg"  width="' + this.config.MaxWidth + '" height="' + this.config.MaxHeight + '">';
            } else if (this.config.style == "Enhanced") {
                earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/enhanced/' + daily + '/jpg/' + earthImg + '.jpg"  width="' + this.config.MaxWidth + '" height="' + this.config.MaxHeight + '">';
            } else if (this.config.style == "Lunar") {
                earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/natural/2016/07/05/jpg/' + earthImg + '.jpg"  width="' + this.config.MaxWidth + '" height="' + this.config.MaxHeight + '">';
            } else if (this.config.style == "naturalThumb") {
                earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/natural/' + daily + '/thumbs/' + earthImg + '.jpg"  width="' + this.config.MaxWidth + '" height="' + this.config.MaxHeight + '">';
            } else if (this.config.style == "enhancedThumb") {
                earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/enhanced/' + daily + '/thumbs/' + earthImg + '.jpg"  width="' + this.config.MaxWidth + '" height="' + this.config.MaxHeight + '">';
            }

        }
        wrapper.appendChild(earthPhoto);
        return wrapper;
    },

    getUrl: function() {
        var url = null;
        var style = this.config.style;


        if (style == "Natural") {
            url = "https://epic.gsfc.nasa.gov/api/natural";
        } else if (style == "Enhanced") {
            url = "https://epic.gsfc.nasa.gov/api/enhanced";
        } else if (style == "Lunar") {
            url = "https://epic.gsfc.nasa.gov/api/natural/date/2016-07-05";
        } else if (style == "naturalThumb") {
            url = "https://epic.gsfc.nasa.gov/api/natural";
        } else if (style == "enhancedThumb") {
            url = "https://epic.gsfc.nasa.gov/api/enhanced";
        } else {
            console.log("Error can't get EARTH url" + response.statusCode);
        }

        return url;
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
        this.sendSocketNotification('GET_EARTH', this.url);
    },


    socketNotificationReceived: function(notification, payload) {
        if (notification === "EARTH_RESULTS") {
            this.processEARTH(payload);

        }

        if (this.rotateInterval == null) {
            this.scheduleCarousel();
        }
        this.updateDom(this.config.fadeSpeed);

        this.updateDom(this.config.initialLoadDelay);
    },

});