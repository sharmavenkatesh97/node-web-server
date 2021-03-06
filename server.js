const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + "\n", (err) => {
    if (err) {
      console.log('unable to write to file')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintanence.hbs');
//   next();
// });


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express</h1>');

  res.render('home.hbs', {
    welcomMSg: 'Welcome to my home Page',
    pageTitle: 'About Page',

  });

});
app.get('/about', (req, res) => {

  res.render('about.hbs', {
    welcomMSg: 'Welcome to About Page',
    pageTitle: 'About Page',

  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'unable to fetch the error'
  });
});

app.get('/project', (req, res) => {
  res.render('projects.hbs', {
    welcomMSg: 'Welcome to Project Page',
    pageTitle: 'Project Page',
  });
});
app.listen(port, () => {
  console.log(`The Site Is Up On Port ${port}`);
});