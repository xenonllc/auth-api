// Package Imports
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

// Module Imports
import Server from './server'
import { check_api_key } from './modules/emps';

// Initialize dotenv
dotenv.config();

// Create new Express app
const app: Express = express();

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: ["*"],
}))
app.use(check_api_key)

// Create new server
const server = new Server(Number(process.env.PORT), app);

// Connect to DB
server.connect_db(`${process.env.DB_URI}`)

// Start Server
server.start()