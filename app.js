// import modules needed for the app
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressSession from 'express-session';
import passport from 'passport';
import Google from './conf/googleConf.js';
import exphbs from 'express-handlebars';
import handlebars from 'handlebars';
import money from './conf/function.js';
import moment from 'moment';

// setup config
dotenv.config({path: './conf/config.env'});

// import routes handlers
import indexRoute from './routes/index.js';
import usersRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import apiRoute from './routes/api.js';

//initialize the app
const app = express();

// handlebars
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// register helpers
handlebars.registerHelper('formatTime', time => {
	return moment(new Date(time * 1000)).format("dddd, MMMM Do YYYY, h:mm a")
});

handlebars.registerHelper('format', num => {
	return money(num);
});

handlebars.registerHelper('firstLetter', letter => {
	return letter[0].toUpperCase();
});

// miscs
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(expressSession({
	secret: process.env.sSecret,
	resave: false,
	saveUninitialized: false,
}));

let __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// passport init
app.use(passport.initialize());
app.use(passport.session());
Google(passport);

// register our routes
  app.use('/', indexRoute);
app.use('/user', usersRoute);
app.use('/api', apiRoute);
app.use('/login', authRoute);

app.listen(process.env.PORT || '8000');
export default app;