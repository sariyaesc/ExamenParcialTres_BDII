const { connect } = require('http2'); //se trae la libreria

require('dotenv').config();
module.exports={
    client:'mysql2',
    connection:{
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_DATABASE,
        port: 3307
    }
}