import postgres from 'postgres';
import dotenv from 'dotenv';

// setup config
dotenv.config({path: './conf/config.env'});
console.log(process.env.DATABASE_URL);
const query = postgres(process.env.DATABASE_URL || 'postgres://superuser@localhost:5432/customer_tab', {
  ssl: true,
});
// let table = await query ``;
let table = await query `create table users(id bigserial primary key, account bigint not null, name varchar(50))`

console.log(table);
let table1 = await query `create table tab(id bigserial, user_id bigint not null, paid int default 0, total int default 0, description text null)`;
console.log(table1);
export default query;