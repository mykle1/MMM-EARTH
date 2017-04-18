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
		console.log("getData25");

        // Set locale.
        this.today = "";
        this.earth = {};
		this.static = {};
        this.activeItem = 0;
        this.rotateInterval = null;
        this.scheduleUpdate();
    },

    getDom: function() {
		console.log("getData26");
    	
        var wrapper = document.createElement("div");
		console.log("getData27");
        wrapper.className = "wrapper";
		console.log("getData28");

        if (!this.loaded) {
			console.log("getData29");
            wrapper.innerHTML = "Getting your picture...<img src='modules/MMM-EARTH/loading/loading.gif' width='22' height='22'>"; //added some sizzle for you
            wrapper.className = "bright light xsmall";
            return wrapper;
        }
        if (this.config.useHeader === true) {
			console.log("getData30");
            var header = document.createElement("header");
            header.className = "xsmall bright";
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }
		////////////////////////////////////////////////////////////////
		var hkeys2 = Object.keys2(this.static);
		console.log("getData14");
			if(hkeys2.length > 0){
           	if(this.activeItem >= hkeys2.length){
				this.activeItem = 0;
			}
         var static = this.static[hkeys2[this.activeItem]];
		 console.log("getData15");
        
			var staticImg = static.image;
			console.log("getData24");
	console.log(staticImg+".jpg");
	

        var staticPhoto = document.createElement("div");
		console.log("getData12");
        staticPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/natural/2016/07/05/jpg/'+staticImg+'.jpg">';	
		console.log("getData13");
		}
		
		wrapper.appendChild(staticPhoto);
        ////////////////////////////////////////////////////////////////
        var hkeys = Object.keys(this.earth);
			if(hkeys.length > 0){
           	if(this.activeItem >= hkeys.length){
				this.activeItem = 0;
			}
         var earth = this.earth[hkeys[this.activeItem]];
        
			var earthImg = earth.image;
			console.log("getData23");
	console.log(earthImg+".jpg");
	

        var earthPhoto = document.createElement("div");
		console.log("getData9");
        var daily = moment().subtract(1, "days").format('YYYY/MM/DD');
		console.log("getData10");
        earthPhoto.innerHTML = '<img src="https://epic.gsfc.nasa.gov/archive/natural/'+daily+'/jpg/'+earthImg+'.jpg">';	
        console.log("getData11");
		} 
            
        wrapper.appendChild(earthPhoto);
        //////////////////////////////////////////////////////////////////
        
        return wrapper;
    },



    processEARTH: function(data) {
		console.log("getData8");
        this.today = data.Today;
        this.earth = data;
        this.loaded = true;
    },
	
	processSTATIC: function(data) {
		console.log("getData7");
        this.today = data.Today;
		this.static = data;
        this.loaded = true;
		console.log("getData2");
    },
    
     scheduleCarousel: function() {
         console.log("getData16");
         this.rotateInterval = setInterval(() => {
             this.activeItem++;
             this.updateDom(this.config.animationSpeed);
         }, this.config.rotateInterval);
     },

    scheduleUpdate: function() {
		console.log("getData17");
        setInterval(() => {
            this.getEARTH();
        }, this.config.updateInterval);
        this.getEARTH(this.config.initialLoadDelay);
        var self = this;
    },


    getEARTH: function() {
		console.log("getData18");
        this.sendSocketNotification('GET_EARTH');
		console.log("getData3");

    },
	
	getSTATIC: function() {
		console.log("getData19");
        this.sendSocketNotification('GET_STATIC');
		console.log("getData4");

    },

    socketNotificationReceived: function(notification, payload) {
		console.log("getData20");
        if (notification === "EARTH_RESULTS") {
			console.log("getData21");
            this.processEARTH(payload);
			console.log("getData5");
		} else if (notification === "STATIC_RESULTS") {
			console.log("getData22");
					this.processSTATIC(payload);
					console.log("getData6");					
		}
            if(this.rotateInterval == null){
                 this.scheduleCarousel();
             }
            this.updateDom(this.config.fadeSpeed);
        
        this.updateDom(this.config.initialLoadDelay);
    },

});
