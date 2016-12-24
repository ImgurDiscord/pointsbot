import { Router } from 'express';
import query from '../lib/db.js';
import child_process from 'child_process';
const exec = child_process.exec;

export default function() {
    // Initialize our router
    let router = Router();

    // Middleware to use for all requests
    router.use(function(req, res, next) {
        // Do logging
        console.log('Something is happening.');
        next();
    });



    
    return router;
}
