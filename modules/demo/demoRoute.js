//Dependencies 
let express = require('express');
let demoCtr = require('./demoController.js');
let demoMiddleware = require('./demoMiddleware.js');
let demoRouter = express.Router();

let getUsersMiddleware = [demoCtr.getUsers];
demoRouter.get('/get-users', getUsersMiddleware);

let loginMiddleware = [demoMiddleware.validateInput("login"),demoCtr.login];
demoRouter.post('/login', loginMiddleware);

let checkNotificationMiddleware = [demoCtr.checkNotification];
demoRouter.post('/check-notification', checkNotificationMiddleware);


module.exports = demoRouter; 

