// Package Imports
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import Server from './server';

// Module Imports
import config from './config.json'
import { check_api_key } from './modules/emps';

// Initialize dotenv
dotenv.config();

// Create new Express app
const app: Express = express();

// Middleware
app.use(express.json())
app.use(check_api_key)

// Create new server
const server = new Server(config.port, app);

// Connect to DB
server.connect_db(config.database_uri)

// Start Server
server.start()