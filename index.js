// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
    res.sendFile(__dirname + '/public/index.html')
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    res.send(pets)
});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
    const owner = req.query.owner

    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner === owner);

    // send the pet as a response
    res.send(
      `Pet ID: ${pet.id} </br> 
       Pet name: ${pet.name} </br>
       Pet breed: ${pet.breed} </br>
       Pet age: ${pet.age} </br>
       Pet owner: ${pet.owner} </br>
       Owner telephone number: ${pet.telephone} </br>
       Upcoming appointments: ${pet.appointments[0].date} at ${pet.appointments[0].time} for ${pet.appointments[0].reason}`
    )
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const name = req.params.name

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    res.send(
      `Pet ID: ${pet.id} </br>
       Pet name: ${pet.name} </br>
       Pet breed: ${pet.breed} </br>
       Pet age: ${pet.age} </br>
       Pet owner: ${pet.owner} </br>
       Owner telephone number: ${pet.telephone} </br>
       Upcoming appointments: ${pet.appointments[0].date} at ${pet.appointments[0].time} for ${pet.appointments[0].reason}`
    )
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;