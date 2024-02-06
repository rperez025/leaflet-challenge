# leaflet-challenge
Module 15 - Leaflet GeoJSON

**BACKGROUND**

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. I have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

**Requirements**

Please refer to [logic.js](https://github.com/rperez025/leaflet-challenge/blob/main/static/js/logic.js) in my Leaflet-Part-1 folder for my scripts demonstrating the following requirements. 

1. Create the Earthquake Visualization

   Obtained my dataset by following these steps:

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visited the [USGS GeoJSON Feed] (https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php). page and choose a dataset to visualize.

2. Create a Bubble Chart

   Create a bubble chart that displays each sample.
     * Used otu_ids for the x values.
     * Used sample_values for the y values.
     * Used sample_values for the marker size.
     * Used otu_ids for the marker colors.
     * Used otu_labels for the text values.

3. Displayed the sample metadata, i.e., an individual's demographic information.
  
5. Displayed each key-value pair from the metadata JSON object somewhere on the page.

6. Updated all the plots in the dashboard when a new sample is selected.

7. Deployed my app (dashboard) to a free static page hosting service (i.e., GitHub Pages) at the following link: [Belly Button Biodiversity Dashboard](https://rperez025.github.io/belly-button-challenge/).

**RESOURCES AND REFERENCES**
During the challenge, I referenced the following to aid in my understanding and completion of the assignment:

1. Reviewed the following instructor videos from Dr. A:
   *[Module 14 Challenge Walkthrough](https://youtu.be/j7Q3Ax0d7vs)
     - I referenced the above code in the video for performing my assignment. Specifically, I reviewed and followed along in the video to gain an understanding of its organization and use. I then took that understanding and incorporated my knowledge and practice from the class activities to write my scripts in [app.js](https://github.com/rperez025/belly-button-challenge/blob/main/static/js/app.js).
