let devSetting = function () {};
devSetting.NOTIFICATION_OPTIONS = {
    production: process.env.PUSH_PRODUCTION,
    cert:process.env.CERT, 
    key: process.env.SERTIFICATE_KEY,
    port: 443
};
devSetting.SECRET = process.env.SECRET_KEY
module.exports = devSetting;