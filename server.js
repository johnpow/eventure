const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./routes');
const helpers = require('./utils');

const hbs = exphbs.create({
  helpers,
});

const sequelize = require('./config/connection');

const app = express();

const PORT = process.env.PORT || 3001;

// setup handlebars as our template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// setup express to use sessions
// this will allow us to store data on the session object
//process the cookie
const sessionConfig = {
  secret: 'Super secret secret', 
  resave: false,
  saveUninitialized: false,
};

// Express middleware
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// This will create a req.session object for every request that comes to the server
app.use(session(sessionConfig));

app.use(routes);


sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});

