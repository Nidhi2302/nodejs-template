let utilsfunction ={};
utilsfunction.isDefined = (variable) => {
    if (typeof variable == 'boolean') return true;
        return (typeof variable !== undefined && variable != null && variable != "");
}
utilsfunction.empty = (mixedVar) => {
        let undef, key, i, len;
        let emptyValues = ["undefined", null, false, 0, '', '0'];
        for (i = 0, len = emptyValues.length; i < len; i++) {
            if (mixedVar === emptyValues[i]) {
                return true;
            }
        }
        if (typeof mixedVar === 'object') {
            for (key in mixedVar) {
                return false;
            }
            return true;
        }

        return false;
}
utilsfunction.isArray = (array) => {
    return  Array.isArray(array);
}
utilsfunction.getHtmlContent = (filePath, callback) => {
        let content = "";
        fs.readFile(filePath, 'utf8', function (err, html) {
            if (!err) {
                content = html;

            }
            callback(null, content);

        });
}
utilsfunction.makeRandom = (req) => {
       let text = "";
       let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
       for( let i=0; i < 20; i++ ){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
       }
       return text;
}
utilsfunction.sendEmail = (toEmail, subject, body, callback) => {
        let options = {
            auth: {
                api_user: process.ENV.MAIL_API_USER,
                api_key: process.ENV.MAIL_API_KEY
            }
        }

        //smtpTransport = nodemailer.createTransport('smtps://murtu@suitenomics.com:g@KFyt34e@smtp.gmail.com');
        smtpTransport = nodemailer.createTransport(sgTransport(options));
        
        let isEmailSent = false;
        smtpTransport.sendMail({
            from: "donotreply@suitenomics.com",
            to: toEmail,
            subject: subject,
            html: body.toString()
        }, function (error, response) {
            if (error) {
                isEmailSent = false;
            } else {
                isEmailSent = true;
            }
            callback(null, isEmailSent);
        });
}
module.exports = utilsfunction