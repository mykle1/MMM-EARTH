/* Magic Mirror
 * Module: MMM-NASA
 *
 * By Mykle1
 * 
 */
Module.register("MMM-NASA", {

    // Module config defaults.
    defaults: {
    	fadeSpeed: 0,
    	updateInterval: 1800000,
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
        this.nasa = {};
        this.activeItem = 0;
        this.rotateInterval = null;
        this.scheduleUpdate();
    },

    getDom: function() {
    	
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
        
        var hkeys = Object.keys(this.nasa);
			if(hkeys.length > 0){
           	if(this.activeItem >= hkeys.length){
				this.activeItem = 0;
			}
         var nasa = this.nasa[hkeys[this.activeItem]];
        
			var nasaImg = nasa.image;
	console.log(nasaImg+".png");

        var nasaPhoto = document.createElement("div");
        var daily = moment().subtract(3, "days").format('YYYY/MM/DD');
        nasaPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/natural/'+daily+'/jpg/'+nasaImg+'.jpg"  width="'+this.config.MaxWidth+'" height="'+this.config.MaxHeight+'">';
        }
        wrapper.appendChild(nasaPhoto);
        
        
        return wrapper;
    },

    processNASA: function(data) {
        this.today = data.Today;
        this.nasa = data;
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
            this.getNASA();
        }, this.config.updateInterval);
        this.getNASA(this.config.initialLoadDelay);
        var self = this;
    },


    getNASA: function() {
        this.sendSocketNotification('GET_NASA');

    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "NASA_RESULTS") {
            this.processNASA(payload);
            if(this.rotateInterval == null){
                 this.scheduleCarousel();
             }
            this.updateDom(this.config.fadeSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },

});
