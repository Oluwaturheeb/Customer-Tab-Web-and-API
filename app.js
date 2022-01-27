// import modules needed for the app
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import expressSession from 'express-session';
import passport from 'passport';
import Google from './conf/googleConf.js';
import exphbs from 'express-handlebars';
import handlebars from 'handlebars';
import money from './conf/function.js';
import moment from 'moment';
import https from 'https';

// import routes handlers
import indexRoute from './routes/index.js';
import usersRoute from './routes/users.js';
import itemsRoute from './routes/items.js';
import authRoute from './routes/auth.js';
import apiRoute from './routes/api.js';

// setup config
dotenv.config({path: './conf/config.env'});

// setup db for the app
/*
mongoose.connect(process.env.mongoConn, {
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	useFindAndModify: false
})
.then(() => console.log('Connected to DB'))
.catch (() => console.log("Couldn't connect to Db"));
*/

//initialize the app
const app = express();

// handlebars
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// register helpers
handlebars.registerHelper('formatTime', time => {
	return moment(time).format("dddd, MMMM Do YYYY, h:mm a")
});

handlebars.registerHelper('format', num => {
	return money(num);
});

handlebars.registerHelper('firstLetter', letter => {
	return letter[0].toUpperCase();
});

// miscs
app.use(logger('dev'));
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

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// register our routes
app.use('/', indexRoute);
app.use('/user', usersRoute);
app.use('/item', itemsRoute);
app.use('/api', apiRoute);
app.use('/login', authRoute);

// passport init
app.use(passport.initialize());
app.use(passport.session());
Google(passport);

app.listen(process.env.PORT || '8000');
export default app;