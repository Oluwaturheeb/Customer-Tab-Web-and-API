import postgres from 'postgres';
import dotenv from 'dotenv';

// setup config
dotenv.config({path: './conf/config.env'});

// const query = postgres({
//   user: process.env.dbUser,
//   password: process.env.dbPassword,
//   host: process.env.dbHost,
//   port: process.env.dbPort,
//   database: process.env.db,
//   ssl: {rejectUnauthorized: false}
// });

const query = postgres({
  user: 'superuser',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'customer_tab',
  ssl: false,//{rejectUnauthorized: false}
});


export default query;