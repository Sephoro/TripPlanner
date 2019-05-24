# ADR5: Google Maps API over Leaflet

Other users want to visualise their destinations on a map in order to see which places are they visiting. A Map API is needed to achieve this functionality. Another functionality for the Map API involves users who want to search hotels within the places they're visiting. Google Maps API offers many built-in useful services and functions such as autocomplete boxes, geolocation, traffic modes, places information and other useful services. Therefore, with this API it easy to find all the services within one library. This API provides a quality and detailed documentation on every map services. The Google Map interface is much more presentable that includes colors, style map and markers etc. 

Leaflet on the other hand, does not offer built-n library services but uses third-party services. This presents a challenge to software developers because they have to learn other third-party services in order to utilise and use Leaflet. The Leaflet has a standard easy documentation, which is easy to understand.



## Decision

We have decided to use Google Maps API as a mapping tool.

## Status

Accepted

## Consequences

    * The Google Maps API is not free, but new users are given 12 months free trial.
    * It has good map styling and colors.
    * Built-in services which are well documented.
    * Not easy to integrate it's services. 