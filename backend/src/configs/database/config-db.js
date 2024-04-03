import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    port: process.env.DB_PORT,
});

export default pool;
