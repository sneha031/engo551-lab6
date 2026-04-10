### ENGO 551 - Lab 6 


# Overview
This lab focuses on allowing users to draw polylines directly on an interactive map and then simplify those lines using Turf.js. The simplified version is displayed in a different colour so the user can visually compare the original and simplified paths. The application also includes a clear line function so users can remove lines and continue drawing new ones.

# Features of the Site
- Interactive Map: Leaflet map with OpenStreetMap tiles
- Polyline Drawing: users can draw polylines
- Line Simplification: clicking the simplify button generates a simplified version of the ployline using Turf.js
- Different Colours for Comparison: the simplified line is displayed in red so it can be compared from the original line
- Clear Line Function: users can remove the most recently drawn line and its simplified version

# Project Structure
- index.html — main page layout 
- script.js — leaflet map setup, polyline drawing, Turf.js simplification, and line clearing functionality
- styles.css — styling for application

# Instructions for Running the Site
Follow the instructions below to run the application

1. Open the project folder in VS Code
Make sure your Lab 6 project folder contains:
- index.html
- static/styles/styles.css
- static/js/script.js
- static/images/background.jpg

2. Install the Live Server extension
In VS Code, go to Extensions and install:
Live Server by Ritwick Dey

3. Run the site
Right click on index.html and select:
Open with Live Server

4. Open the application in your browser
The site will automatically open in your browser through Live Server

