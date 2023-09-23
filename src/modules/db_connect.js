const chalk = require('chalk');
const mongoose = require('mongoose');

const connection = {};

async function db_connect () {
    if (connection.isConnected) return;

    const db = await mongoose.connect(process.env.DB_USERS, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    connection.isConnected = db.connections[0].readyState;
    
    if (connection.isConnected === 1) return console.log(chalk.green('✅ Connected to DB'))
    console.log(connection.isConnected);
}

module.exports = db_connect;