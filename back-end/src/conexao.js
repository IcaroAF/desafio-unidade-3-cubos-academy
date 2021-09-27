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
    user: 'nmraumyfybqytx',
    host: 'ec2-34-233-0-64.compute-1.amazonaws.com',
    database: 'd2ttnnkgd2fot',
    password: 'd29ccd7b6c8363dd8b20b85c8ba74a567e5c9b75cc05b0571763bebfeeb86a96',
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