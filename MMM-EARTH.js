/* Magic Mirror
 * Module: MMM-EARTH
 *
 * By Mykle1
 * 
 */
Module.register("MMM-EARTH", {

    // Module config defaults.
    defaults: {
    	fadeSpeed: 0,
    	updateInterval: 30 * 60 * 1000, // 30 minutes
        animationSpeed: 0,
        initialLoadDelay: 0,  
        retryDelay: 2500, 
        useHeader: false, 
        header: "********Please set header txt in config.js***** see instructions",
        MaxWidth: "50%",
        MaxHeight: "50%",
        rotateInterval: 5 * 1000,
        
    },

    // Define required scripts.  The standard :)ok
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
            wrapper.innerHTML = "Getting your picture...<img src='modules/MMM-EARTH/loading/loading.gif' width='22' height='22'>"; //added some sizzle for you
            wrapper.className = "bright light xsmall";
            return wrapper;
        }
        if (this.config.useHeader === true) {
            var header = document.createElement("header");
            header.className = "xsmall bright";
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }
        
        var hkeys = Object.keys(this.earth);
			if(hkeys.length > 0){
           	if(this.activeItem >= hkeys.length){
				this.activeItem = 0;
			}
         var earth = this.earth[hkeys[this.activeItem]];
        
			var earthImg = earth.image;
	console.log(earthImg+".png");

        var earthPhoto = document.createElement("div");
        var daily = moment().subtract(1, "days").format('YYYY/MM/DD');
        earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/natural/'+daily+'/jpg/'+earthImg+'.jpg"  width="'+this.config.MaxWidth+'" height="'+this.config.MaxHeight+'">';
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
         console.log("Showing Earth for today");
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

    socketNotificationReceived: function(notification, payload) {
        if (notification === "EARTH_RESULTS") {
            this.processEARTH(payload);
            if(this.rotateInterval == null){
                 this.scheduleCarousel();
             }
            this.updateDom(this.config.fadeSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },

});
