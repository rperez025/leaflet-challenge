# leaflet-challenge
Module 15 - Leaflet GeoJSON

**BACKGROUND**

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. I have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

**Requirements**

Please refer to [logic.js](https://github.com/rperez025/leaflet-challenge/blob/main/Leaflet-Part-1/static/js/logic.js) in my Leaflet-Part-1 folder for my scripts demonstrating the following requirements. 

**NOTE**: Although I performed the requirements for Leaflet Part 2 (see 2 below), I kept all scripts within the [logic.js](https://github.com/rperez025/leaflet-challenge/blob/main/Leaflet-Part-1/static/js/logic.js) in my Leaflet-Part-1 folder.

1. Part1 - Create the Earthquake Visualization

   Obtained my dataset by following these steps:
   * The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visited the [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and choose a dataset to visualize.
   * Clicked a "All Earthquakes from the Past 7 Days" dataset and was given a JSON representation of that data. Used the URL of this JSON to pull in the data for the visualization.
   * Imported and visualized the data by doing the following:
        - Used Leaflet and created a map that plots all the earthquakes from my dataset based on their longitude and latitude.
           > My data markers reflected the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
        - Included popups that provided additional information about the earthquake when its associated marker was clicked.
        - Created a legend that will provide context for my map data.

2. Part 2 - Gather and Plot More Data: Illustrate the Relationship between Tectonic Plates and Seismic Activty

   Plotted a second dataset on my map to illustrate the relationship between tectonic plates and seismic activity. I pulled in this dataset and visualized it alongside my original data in Part 1. I used the data on tectonic plates [https://github.com/fraxen/tectonicplates](https://github.com/fraxen/tectonicplates).

**RESOURCES AND REFERENCES**
During the challenge, I referenced the following to aid in my understanding and completion of the assignment:

1. Reviewed the following instructor videos from Dr. A:
   *[Module 15 Challenge Walkthrough](https://youtu.be/RUGbwfSIjnI)
     - I referenced the above code in the video for performing my assignment. Specifically, I reviewed and followed along in the video to gain an understanding of its organization and use. I then took that understanding and incorporated my knowledge and practice from the class activities to write my scripts in [logic.js](https://github.com/rperez025/leaflet-challenge/blob/main/Leaflet-Part-1/static/js/logic.js).
