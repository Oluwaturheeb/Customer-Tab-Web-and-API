import postgres from 'postgres';
import dotenv from 'dotenv';

// setup config
dotenv.config({path: './conf/config.env'});

const query = postgres({
  user: process.env.dbUser,
  password: process.env.dbPassword,
  host: process.env.dbHost,
  port: process.env.dbPort,
  database: process.env.db,
  ssl: {rejectUnauthorized: false}
});
export default query;