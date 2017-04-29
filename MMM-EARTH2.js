/* Magic Mirror
 * Module: MMM-EARTH
 *
 * By Mykle1 - Tutored by Cowboysdude - Rescued by Strawberry
 * 
 */
Module.register("MMM-EARTH", {

    // Module config defaults.
    defaults: {
		style: "Natural", // Natural, Enhanced, lunarTransit, thumbsN, thumbsE
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
		this.url = '';
		this.imageUrls = {
			'Natural': 'https://epic.gsfc.nasa.gov/api/natural',
			'Enhanced': 'https://epic.gsfc.nasa.gov/api/enhanced',
			'lunarTransit': 'https://epic.gsfc.nasa.gov/api/natural/date/2016-07-05',
			'thumbsN': 'https://epic.gsfc.nasa.gov/api/natural',
			'thumbsE': 'https://epic.gsfc.nasa.gov/api/enhanced'
		};
		
		// I can't make this work. node_helper has only one api url
		// How to make node choose from several urls based on config option?
		console.log(this.imageUrls[this.config.style]); 
		if (this.config.style != '') {
			this.url = this.imageUrls[this.config.style];
		} 
		
		if (this.config.style == "Natural") {
			this.url = this.imageUrls[this.config.style];
			
		} else if (this.config.style == "Enhanced"){
			this.url = this.imageUrls[this.config.style];
			
		} else {
			this.url = this.imageUrls[this.config.style];
			
		}
		
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
			if(hkeys.length > 0){
           	if(this.activeItem >= hkeys.length){
				this.activeItem = 0;
		}
         var earth = this.earth[hkeys[this.activeItem]];
        
		var earthImg = earth.image;
//		console.log(earthImg+".jpg");  // for checking later if necessary

        var earthPhoto = document.createElement("div");
		var daily = earth.date.slice(0, 10).replace(/-/g, "/"); // <-- Strawberry fix
		
// I think I need an if/else if statement here. If GET_EARTH results then earthPhoto.innerHTML =
// is this.img src. else if GET_STATIC results then earthPhoto.innerHTML = is thisdifferent.img src.
//  AS long as the earthPhoto.innerHTML below is the same, how can it get different data?
/*1*/  earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/natural/'+daily+'/jpg/'+earthImg+'.jpg"  width="'+this.config.MaxWidth+'" height="'+this.config.MaxHeight+'">';
//*2*/  earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/enhanced/'+daily+'/jpg/'+earthImg+'.jpg"  width="'+this.config.MaxWidth+'" height="'+this.config.MaxHeight+'">';
//*3*/	earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/natural/2016/07/05/jpg/'+earthImg+'.jpg"  width="'+this.config.MaxWidth+'" height="'+this.config.MaxHeight+'">';
//*4*/	earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/natural/'+daily+'/thumbs/'+earthImg+'.jpg"  width="'+this.config.MaxWidth+'" height="'+this.config.MaxHeight+'">';
//*5*/	earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/enhanced/'+daily+'/thumbs/'+earthImg+'.jpg"  width="'+this.config.MaxWidth+'" height="'+this.config.MaxHeight+'">';
		
		
        }
        wrapper.appendChild(earthPhoto);
        
        
        return wrapper;
    },



    processEARTH: function(data) {
        this.today = data.Today;
        this.earth = data;
        this.loaded = true;
    },
	
	processSTATIC: function(data) {
        this.today = data;   // Made this for STATIC
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
        this.sendSocketNotification('GET_STATIC'); // Made this for STATIC

    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "EARTH_RESULTS") {
            this.processEARTH(payload);
		
		} else if (notification === "STATIC_RESULTS") {
			this.processSTATIC(payload);          // Made this for STATIC
		}	
			
            if(this.rotateInterval == null){
                 this.scheduleCarousel();
             }
            this.updateDom(this.config.fadeSpeed);
        
        this.updateDom(this.config.initialLoadDelay);
    },

});
