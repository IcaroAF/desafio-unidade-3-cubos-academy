const { Pool } = require('pg');

// config local
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'market_cubos',
//     password: 'postgres',
//     port: 5432
// });

//config heroku
const pool = new Pool({
    user: 'tlqmdkowtoxczb',
    host: 'ec2-34-197-135-44.compute-1.amazonaws.com',
    database: 'd2k1tvt42206ov',
    password: '9608fde12c1e18b04675058d6e18e151b1ec8d4f331dc82c3aa584a0b52bdf63',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

const query = (text, param) => {
    return pool.query(text, param);
}

module.exports = {
    query
};