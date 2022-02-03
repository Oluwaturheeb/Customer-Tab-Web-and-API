import postgres from 'postgres';
import dotenv from 'dotenv';

// setup config
dotenv.config({path: './conf/config.env'});
console.log(process.env);
const query = await postgres(process.env.DATABASE_URL || 'postgres://superuser@localhost:5432/customer_tab');
console.log(query);
// let table = await query ``;
// let table = await query `create table if not exists users(id bigserial primary key, account bigint not null, name varchar(50));
// create if not exists table tab(id bigserial, user_id bigint not null, paid int default 0, total int default 0, description text null)`;
export default query;