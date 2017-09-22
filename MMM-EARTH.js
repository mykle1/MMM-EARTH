/* Magic Mirror
 * Module: MMM-EARTH
 *
 * By Mykle1 - Tutored by Cowboysdude - Additions by Strawberry
 * 
 */
Module.register("MMM-EARTH", {

    // Module config defaults.
    defaults: {
        mode: "Natural", // Natural, Enhanced, Lunar, naturalThumb, enhancedThumb
        updateInterval: 30 * 60 * 1000, // 30 minutes - Don't change!
        animationSpeed: 3000,
        initialLoadDelay: 1250,
        retryDelay: 2500,
        useHeader: false,
        header: "********Please set header txt in config.js***** see README",
        MaxWidth: "50%", // Should be the same as MaxHeight
        MaxHeight: "50%", // Should be the same as MaxWidth
        rotateInterval: 10 * 1000,
        
         MonthsArray: {
            "Jan": "01",
            "Feb": "02",
            "Mar": "03",
            "Apr": "04",
            "May": "05",
            "Jun": "06",
            "Jul": "07",
            "Aug": "08",
            "Sep": "09",
            "Oct": "10",
            "Nov": "11",
            "Dec": "12"
        }

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

        var earthKeys = Object.keys(this.earth);
        if (earthKeys.length > 0) {
            if (this.activeItem >= earthKeys.length) {
                this.activeItem = 0;
            }
            var earth = this.earth[earthKeys[this.activeItem]];

            var earthImg = earth.image;
            // console.log(earthImg+".jpg");  // for checking

            var earthPhoto = document.createElement("div");
           
            var date = earth.date;
            var slicer = earth.date.slice(0,11);
            var parts = slicer.split("-");
            var daily = parts[2]+"/"+this.config.MonthsArray[parts[1]]+"/"+parts[0];
           
            if (this.config.mode == "Natural") {
                earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/natural/' + daily + '/jpg/' + earthImg + '.jpg"  width="' + this.config.MaxWidth + '" height="' + this.config.MaxHeight + '">';
            } else if (this.config.mode == "Enhanced") {
                earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/enhanced/' + daily + '/jpg/' + earthImg + '.jpg"  width="' + this.config.MaxWidth + '" height="' + this.config.MaxHeight + '">';
            } else if (this.config.mode == "Lunar") {
                earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/natural/2016/07/05/jpg/' + earthImg + '.jpg"  width="' + this.config.MaxWidth + '" height="' + this.config.MaxHeight + '">';
            } else if (this.config.mode == "naturalThumb") {
                earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/natural/' + daily + '/thumbs/' + earthImg + '.jpg"  width="' + this.config.MaxWidth + '" height="' + this.config.MaxHeight + '">';
            } else if (this.config.mode == "enhancedThumb") {
                earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/enhanced/' + daily + '/thumbs/' + earthImg + '.jpg"  width="' + this.config.MaxWidth + '" height="' + this.config.MaxHeight + '">';
            }

        }
        wrapper.appendChild(earthPhoto);
        return wrapper;
    },

    getUrl: function() {
        var url = null;
        var mode = this.config.mode;


        if (mode == "Natural") {
            url = "https://epic.gsfc.nasa.gov/api/natural";
        } else if (mode == "Enhanced") {
            url = "https://epic.gsfc.nasa.gov/api/enhanced";
        } else if (mode == "Lunar") {
            url = "https://epic.gsfc.nasa.gov/api/natural/date/2016-07-05";
        } else if (mode == "naturalThumb") {
            url = "https://epic.gsfc.nasa.gov/api/natural";
        } else if (mode == "enhancedThumb") {
            url = "https://epic.gsfc.nasa.gov/api/enhanced";
        } else {
            console.log("Error can't get EARTH url" + response.statusCode);
        }

        return url;
    },

    processEARTH: function(data) {
        this.today = data.Today;
        this.earth = data;
console.log(this.earth);
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
