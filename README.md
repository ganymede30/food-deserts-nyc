# Food Desert

## Motivation

Food Desert is a personal project of mine I've been thinking about a while. I wanted to map food security in New York City. I saw that [Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/) had an [Isochrone feature](https://docs.mapbox.com/help/tutorials/get-started-isochrone-api/) and I figured this would be a great way to map how grocery store accessibility. This was also an excuse to familiarize myself with [React Hooks](https://reactjs.org/docs/hooks-intro.html)

## Tech Stack

This application was constructed using the follow tech stack:

* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/)
* [react-map-gl](https://visgl.github.io/react-map-gl/)

## Features

A fresh isochrone is created upon click

![](public/IsochroneClick.gif)

You can adjust how far you want to travel as well as if you'd be walking, cycling, or driving with

![](public/IsochroneSlider.gif)

## Local Setup

1.  Fork and clone this repo
2.  Run `npm install`
3.  Run `npm run start-dev` and then head over to http://localhost:8080/
    * Alternatively if you want to run the server and/or `webpack` separately, you can also `npm run start-server` and `npm run build-client`.

## Contribute

If you are interested in contributing feel free to add an issue [here!](https://github.com/ganymede30/NYC-Food-Availability/issues)

I will try to address these issues in a timely fashion.

## Credits

This application was developed out of Fullstack Academy's boilermaker code:

* https://github.com/FullstackAcademy/boilermaker

Stefan Luc Gouyet's "bike-isochrones-react" was an immense help in implementing my isochrone features:

* https://github.com/stefangouyet/bike-isochrones-react
* https://blog.usejournal.com/visualizing-cycling-routes-with-mapbox-isochrones-api-3a16c7393aaa

Grocery store data is collected from the NY Department of Agriculture and Markets

* https://data.ny.gov/Economic-Development/Retail-Food-Stores/9a8c-vfzj

## License

**MIT License** Copyright © _2018 Fullstack Academy_
