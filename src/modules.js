const fs = require('fs');
const path = require('path');

const init_GET = (app) => {
    fs.readdir(path.join(__dirname, 'routes/GET') , (err, data) => {

        data.forEach(filename => {
            
            const route = filename.split('_').join('/').split('=').join(':').split('.js')[0];
    
            const handler = require(`./routes/GET/${filename}`)
    
            app.get(`/${route}`, handler)
    
        })
    
    });
}

const init_POST = (app) => {
    fs.readdir(path.join(__dirname, 'routes/POST') , (err, data) => {

        try {
            data.forEach(filename => {
                
                const route = filename.split('_').join('/').split('=').join(':').split('.js')[0];
        
                const handler = require(`./routes/POST/${filename}`)
        
                app.post(`/${route}`, handler)
        
            })
        } catch (err) {
            console.log(err);
        }
        
    });
}

const init_DELETE = (app) => {
    fs.readdir(path.join(__dirname, 'routes/DELETE') , (err, data) => {

        try {
            data.forEach(filename => {
                
                const route = filename.split('_').join('/').split('=').join(':').split('.js')[0];
        
                const handler = require(`./routes/DELETE/${filename}`)
        
                app.delete(`/${route}`, handler)
        
            })
        } catch (err) {
            console.log(err);
        }
    
    });
}

const check_api_key = (req, res, next) => {
    if (req.headers['api-key'] === process.env.API_KEY) next();
    else return res.status(400).json({
        status: 'error',
        message: 'Request Failed - Incorrect API Key'
    })
}

const handleError = (err, res, cmsg) => {
    let err_msg = '';

    if (cmsg !== null) {
        err_msg = cmsg;

        return res.status(400).json({
            status: 'fail',
            message: err_msg
        })
    }

    if (err.code === 11000) {
        err_msg = 'Email is already in use';

        return res.status(400).json({
            status: 'fail',
            message: err_msg
        })
    }

    err_msg = Object.values(err.errors)[0].properties.message

    res.status(400).json({
        status: 'fail',
        message: err_msg
    })
}

module.exports = { init_GET, init_POST, init_DELETE, check_api_key , handleError}