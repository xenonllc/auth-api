import { Request, Response, NextFunction } from 'express';

const check_api_key = (req: Request, res: Response, next: NextFunction) => {

    // Check if api key is correct
    if (req.headers['api-key'] === process.env.API_KEY) next();
    // Return err
    else return res.status(400).json({
        status: 'error',
        message: 'request failed - incorrect api-key'
    })
    
}

const handle_error = (err: any, res: Response, cmsg: string | null) => {
    let err_msg = '';
    
    if (cmsg !== null) {
        err_msg = cmsg;
        
        return res.status(400).json({
            status: 'fail',
            message: err_msg
        })
    }
    
    if (err.keyPattern.email) {
        err_msg = 'email is already in use';
        
        return res.status(400).json({
            status: 'fail',
            message: err_msg
        })
    }

    if (err.keyPattern.username) {
        err_msg = 'username is already in use';
        
        return res.status(400).json({
            status: 'fail',
            message: err_msg
        })
    }
    
    let error: any = Object.values(err.errors)[0]
    err_msg = error.properties.message

    res.status(400).json({
        status: 'fail',
        message: err_msg
    })
}

export { check_api_key, handle_error }