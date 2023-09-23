require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk')

// Importing custom modules
const connect_db = require('./modules/db_connect');
const modules = require('./modules')

// Connecting DB
connect_db();

// Making a new express app
const app = express();

// Middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(modules.check_api_key)

// --------------------------------- Code Body --------------------------------- //

// Variables
const port = process.env.PORT

// Initialize router
modules.init_GET(app)
modules.init_POST(app)
modules.init_DELETE(app)

// Listen App
console.log('\n');
console.log(chalk.bgGray('Log:-'));
app.listen(port, () => console.log(chalk.green(`✅ Started app on port ${port}`)));