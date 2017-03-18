* Magic Mirror
    * Module: MMM-NASA
    *
    * By Mykle1 with all the actual work being done by cowboysdude
    * 
    */
   


Module.register("MMM-NASA", {

       // Module config defaults.
       defaults: {
           updateInterval: 120000, // every 10 minutes  I don't think that's every 10 minutes you'll want to change that to like twice a day... we'll okcheck on that laterok
           animationSpeed: 1000,  // that is the speed at which the module loads.. I put mine at like 5 LOL  I like it to just pop up quick  odonkt' care for the fade crapok
           initialLoadDelay: 1130, // 0 seconds delay Well that's wrong LOL  leave ithaha
           retryDelay: 2500,  //if not data how long before retryok
           header: "", 
           picWidth: "",
           picHeight: "",

       },

       getScripts: function() {
           return ["moment.js"];
       },
       

       start: function() {
           Log.info("Starting module: " + this.name);

		   
       moment.locale(config.language);
           this.today = "";
           this.scheduleUpdate();
       },

      getDom: function() {

         var nasa = this.nasa; 
         var wrapper = document.createElement("div");
         wrapper.className = "wrapper";


         if (!this.loaded) {
             wrapper.innerHTML = "Getting your picture...";
             wrapper.className = "bright light small";
             return wrapper;
         }
         if (this.config.header != "" ){
         var header = document.createElement("header");
         header.className = "header";
         header.innerHTML = this.config.header;
         wrapper.appendChild(header);
		 }
		 
         var top = document.createElement("div");
         top.className = ("small bright");
 

        
         var nasaPhoto = document.createElement("div");
         var nasaIcon = document.createElement("img");
         nasaIcon.src = nasa.hdurl;
         nasaIcon.classList.add("imgDes");
         nasaLogo.appendChild(nasaIcon);
         top.appendChild(nasaLogo);

		 

         var title = document.createElement("h3");
         title.classList.add("small");
         title.className = "medium bright";
         top.appendChild(title);

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
         if (notification === "NASA_RESULT") {
             this.processRecipe(payload);
             this.updateDom(this.config.fadeSpeed);
         }
         this.updateDom(this.config.initialLoadDelay);
     },

 });

