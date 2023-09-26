import { Express, Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'

 export default class Server {
    
    // Variables
    private port: number;
    public app: Express; 

    constructor(port: number, app: Express) {
        this.port = port
        this.app = app
    }

    start () {
        this.init_routes()
    
        this.app.listen(this.port, () => {
            // Log success msg
            console.log(chalk.bgGrey('Logs:-'));
            console.log(chalk.greenBright(`✅ Started server on port ${this.port}`));
        })
    }

    async connect_db (uri: string) {
        try {
            const connection: { isConnected?: any } = {}
    
            // Check if already connected
            if (connection.isConnected === 0) return;
    
            // Connect to DB
            const db = await mongoose.connect(uri)
    
            // Set recieved data
            connection.isConnected = db.connections[0].readyState
    
            // Log success msg
            console.log(chalk.greenBright('✅ Connected to DB'));
        } catch (err) {
            // Log error msg
            console.log(err);
            console.log(chalk.redBright('❌ Failed to connect to DB, Please check if the IP is listed in access list'));
        }
    }

    private async init_routes () {
        const methods = await fs.readdirSync(path.join(__dirname, 'routes'), 'utf-8')
    
        methods.forEach(async method => {
            if (!['get', 'post', 'put', 'delete'].includes(method)) {
                console.log(chalk.redBright(`❌ Invalid method: ${method}`));
                return;
            }
    
            const files = await fs.readdirSync(path.join(__dirname, `routes/${method}`), 'utf-8')
       
            if (files === undefined) return;
    
            files.forEach( filename => {
       
                // Recharacterize the route
                const route: string = filename.split('_').join('/').split('=').join(':').split('.ts')[0]
    
                // Import handler function
                const handler = require(`./routes/${method}/${filename}`)
       
                // Set post handler
                this.app[method as keyof Express](`/${route}`, handler)
       
                // Log success message
                console.log(chalk.greenBright(`✅ Loaded ${method.toUpperCase()} route - /${route}`));
       
            })
    
        } )
    }
    
}

