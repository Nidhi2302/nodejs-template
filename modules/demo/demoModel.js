let sqlQuery = require("jm-ez-mysql");
let md5 = require('js-md5');
let demoModel = {};
demoModel.login = (req, callback) => {
    sqlQuery.query("select * from users where email = ? and password =?", [req.email,md5(req.password)])
        .then(function (results) {
            if(results.length > 0){
                callback(results)    
            }else{
                callback(false)    
            }
            
        }).catch(function (err) {
            console.log(err);
        });

}
demoModel.getUsers = (req, callback) => {
    sqlQuery.findAll("users", ["id,email"], "1=1").then(function (r) {
        if(r.length > 0){
            callback(r);
        }else{
            callback(false);
        }
    }).catch(function (err) {
        callback(false);
    });
}
demoModel.getUsersById = (id, callback) => {
    sqlQuery.query("select * from users where id = ?",[id]).then(function (r) {
        if(r.length > 0){
            callback(r[0]);
        }else{
            callback(false);
        }
    }).catch(function (err) {
        callback(false);
    });
}

module.exports = demoModel;    