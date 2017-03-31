# MMM-EARTH

A MagicMirror module to display the Earth as it rotates.

## How we look - from 1,000,000 miles away!

![](pix/7.gif)
##
On July 5th, 2016, the moon passed between DSCOVR and the Earth. EPIC snapped these images over a period of about 4 hours. In this set, the far side of the moon, which is never seen from Earth, passes by. The DSCOVR satellite is, at times, 1 million miles away, more than 4 times further away than the moon itself.


## How you see it

NASA's Earth Polychromatic Imaging Camera (EPIC), aboard NOAA's DSCOVR satellite, provides daily, full disc imagery of the Earth and captures unique perspectives of certain astronomical events, such as lunar transits. (Seen above) EPIC uses a 2048x2048 pixel CCD detector coupled to a 30-cm aperture Cassegrain telescope. The DSCOVR satellite was launched by SpaceX on a Falcon 9 two-stage rocket on February 11, 2015 from Cape Canaveral.



## Dependencies
* Works best on a motherboard that is more robust than a Raspberry Pi 3. Results shown above.
* An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
* npm
* [request](https://www.npmjs.com/package/request)


## Info

* No API key is necessary but these limits apply.
* 30 requests per IP address per hour
* 50 requests per IP address per day.

## Installation

* Clone this repo into `~/MagicMirror/modules` directory.
* `cd MMM-EARTH`
* `npm install` in ~/MagicMirror/modules/MMM-EARTH directory.

## Add to Config.js

    {
        module: "MMM-EARTH",
        position: "bottom_center",
        config: {
            rotateInterval: 5000,
            MaxWidth: "50%",
            MaxHeight: "50%",
        }
    },

## Config Options

| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `updateInterval` | `1800000` | Every 30 minutes = 48. DO NOT exceed 50 per day. |
| `animationSpeed` | `0` | The speed at which each image fades in ms. |
| `rotateInterval` | `3000` | The speed at which the images rotate in ms. |
| `initialLoadDelay` | `2500` | Module load delay in ms |
| `retryDelay` | `2500`  |Delay to retry fetching data. |
| `useHeader` | false | Must be set to true if you want a header |
| `header` | `"Your Header"` | Add header between the `""` if desired. |
| `MaxWidth` | `"50%"`|  Choose width of image between the `""` (Ex: `200px` or '12%'). |
| `MaxHeight` | `"50%"` | Choose height of image between the `""` (Ex: `200px` or '12%').. |

This module would not be possible without the unfailing patience, generosity and kindness of 
cowboysdude (Module Developer - Extraordinaire)
