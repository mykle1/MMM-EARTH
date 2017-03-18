A MagicMirror module to display the Astronomy Picture of the Day from NASA

Example *How do I underline this*


*How do I insert pictures here*
mimas.jpg
butterfly.jpg

Dependencies *How do I underline this*

An installation of MagicMirror2
npm
request
moment

Info *How do I underline this*

No API key is necessary but these limits apply. 1 update per hour is adequate.
Hourly Limit: 30 requests per IP address per hour
Daily Limit: 50 requests per IP address per day

Installation *How do I underline this*

Clone this repo into ~/MagicMirror/modules directory.
cd MMM-NASA
Run command npm install in ~/MagicMirror/modules/MMM-NASA directory.

Config Options *How do I underline this*

*How do I make this a table*
Option	    Default    	Description 
updateInterval: 10 * 360000 ms, // 1 hour. No need to change this.
animationSpeed: 1000,  // the speed at which the module loads
initialLoadDelay: 2500, // load delay
retryDelay: 2500,  // if no data how long before retry
header: "", 
picWidth: "",
picHeight: "",
