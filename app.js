const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
// ...
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:
app.get("/static", (req, res) => {
  res.render("static");
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(response => {
    res.render('beers', response)
    })
  .catch(err => {
    console.log(err)
  })
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then(response => {
      const randomBeer = response[0];  
      res.render('random-beer', { beer: randomBeer }); 
    })
    .catch(err => {
      console.log(err);
    });
});


// create a constant with the first value of the array [0]
// for response, you create an object with the created variable

app.get('/beerpartial', (req, res) => {
  res.render('beerpartial');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
