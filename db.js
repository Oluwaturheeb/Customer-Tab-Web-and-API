import postgres from 'postgres';
import dotenv from 'dotenv';

// setup config
dotenv.config({path: './conf/config.env'});
  
const query = await postgres({
  user: process.env.dbUser,
  password: process.env.dbPassword,
  host: process.env.dbHost,
  port: process.env.dbPort,
  database: 'customer_tab',
  ssl: false
});

// let table = await query `create table users(id bigserial, account bigint not null, name varchar(50))`;
//let table = await query `create table tab(id bigserial, paid int default 0, total int not null, description text)`;

export default query;