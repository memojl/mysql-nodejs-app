const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

//settings
app.set('port',process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Global Vars
app.use((req, res, next)=>{

  next();
});

//routes
app.use(require('./routes'));
app.use(require('./routes/auth'));
app.use('/links',require('./routes/links'));

//public
app.use(express.static(path.join(__dirname + "/public")));

//Server
app.listen(app.get('port'), () => {
  console.log(`Our app is running on port:`.blue + ` ${ app.get('port') }`.yellow);
});