'use strict'
//var loc= prompt ('please enter a location..');
const express = require('express');

const server = express();


const cors = require('cors');// Cross Origin Resource Sharing

server.use(cors()); // give access to make anyone use my app

require('dotenv').config(); //ability to use whats in the enviroment

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log('Listening at port 3000'));// Make the app listening

//to test my app status 200 ma3naha suuccessful
server.get('/', (request, response) => {
    response.status(200).send('App is working CLAAAAASS');
});

//this is the response i should recieve
/* {
    "search_query": "lynwood",
    "formatted_query": "lynood,... ,WA, USA",
    "latitude": "47.606210",
    "longitude": "-122.332071"
  }
*/

function Location(city, locationData){
    this.formatted_query = locationData[0].display_name;
    this.latitude = locationData[0].lat;
    this.longitude = locationData[0].lon;
    this.search_query = city;
}

function Weather(day){
   /* this.latitude=weatherData[0].latitude;
    this.longitude=weatherData[0].longitude;
    this.timezone=weatherData[0].timezone;
    this.currently=weatherData[0].currently;
    this.minutely=weatherData[0].minutely;
    this.hourly=weatherData[0].hourly;
    this.daily=weatherData[0].daily;
    this.flags=weatherData[0].flags;
    this.offset=weatherData[0].offset;
    this.search_query = city;*/
    this.forecast = day.summary;
    this.time = new Date(day.time * 1000).toString().slice(0, 15);


    

}

//i need the data in the geo.json and i want to get it
server.get('/location', (request, response) => {
    // Read the city from the user (request)
    // find the city in geo.json
    
     //that'show i get the file that contains the data
    const locationData = require('./data/geo.json');
    const loc = request.query.city;

    let location = new Location(loc, locationData);
    response.status(200).send(location);
});


server.get('/weather', (request, response) => {
    // Read the city from the user (request)
    // find the city in geo.json
    
     //that'show i get the file that contains the data
   // const weatherData = require('./data/darksky.json');

   // let weather = new Weather(loc, weatherData);
    //response.status(200).send(weather);
    const darkskyData = require('./data/darksky.json');
    const weatherSummaries = [];
    darkskyData.daily.data.forEach(day => {
      weatherSummaries.push(new Weather(day));
    });
    response.status(200).json(weatherSummaries);
});

//error handling anything we get not defined it will go here 
server.use('*', (request, response) => {
    response.status(404).send('Sorry, not found');
});

//if i have an error im going to show it to the user
server.use((error, request, response) => {
    response.status(500).send(error);
});

//network tab in your console to see the errors



