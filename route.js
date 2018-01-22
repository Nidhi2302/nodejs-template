let express = require('express');
let bodyParser = require('body-parser');
let app = express.Router();
app.use('/api/v1/demo', require('./modules/demo/demoRoute'));
app.use('/api/v1/payment', require('./modules/payment/paymentRoute'));
app.all('/*', function (req, res) {
    return errorUtil.notFound(res, req);
});
module.exports = app;
