let fs = require('fs');
let demoModel = require('./demoModel.js');
let jwt = require('../../helper/jwt.js');
let utils = require('../../helper/utils.js');
let notificationUtil = require('../../helper/notificationUtils.js');
let sqlQuery = require("jm-ez-mysql");
let demoCtr = {};
demoCtr.login = (req, res) => {
    let postVar = {
        email : req.body.email,
        password : req.body.password
    }
    demoModel.login(postVar,function(userResult){
        if(userResult){
           demoCtr.getUserDetail(userResult,function(result){
              res.status(200).json({result}); 
           })     
        }else{
            res.status(400).json(req.t("NO_RECORD_FOUND"));
        }
    });
}
demoCtr.getUsers = (req, res) => {
    demoCtr.getUserRows("users","id,email",function(result){
        if(result){
            res.status(200).json({result});    
        }else{
            res.status(400).json(req.t("NO_RECORD_FOUND"));
        }
        
    });
}
/* This function return only userdetail and secrete token*/
demoCtr.getUserDetail = (result,callback) => {
    
     let secteteToken = jwt.createSecretToken({uid: result[0].id});
     let uData ={};
     for (let users in result){
          for (let key in result[users]){
               uData[key]=result[users][key];
          }
      }
      let response = {
          secteteToken : secteteToken,
          uData : uData
      }
    callback(response);
}
/* This function for registration pass two variable table name and  req example req ={name :'example'} */
demoCtr.userRegistration = (table,req) => {
   sqlQuery.insert(table,req).then(function (result) {
       callback(result.insertId);
    }).catch(function (err) {
        callback(false);
    });
}
/* This function for user update pass  variable table name ,  req example req ={name :'example1'} and where example "id = 2" */
demoCtr.userUpdate = (table,req,where,callback) => {
   sqlQuery.update(table,req,where).then(function (result) {
       if(result.affectedRows){
            callback(true);   
       }else{
           callback(false);   
       }
        
    }).catch(function (err) {
        callback(false);
    });
}
/* this funtion is use for send email for password*/
demoCtr.sendUserEmail = (pageName,fileName,subject,uName,email) =>{
    let randomStr = utils.makeRandom();
    let resetpwd = "../mail_content/"+fileName+".html";
    utils.getHtmlContent(resetpwd, function (err, content) {
         let link = config.SITE_URL+pageName+"/"+randomStr;
         content = content.replace("{USRNAME}", uName);
         content = content.replace("{LINK}", link);
         utils.sendEmail(email, subject, content, function () { });
    });
}
                          
//field example = "id,name",user
demoCtr.getUserRows = (table,field,callback) =>{
    console.log(table,field);
    sqlQuery.findAll(table, [field], "1=1").then(function (r) {
        console.log(sqlQuery.lQ);
       if(r.length > 0){
           callback(r);
       }else{
           callback(false);
       }
    })
}

/*Test check notification*/
demoCtr.checkNotification = (req,res) =>{
    var post = {
			senderName: "Demo",
			message: "Demo"
		};
        notificationUtil.sendNotificationToDevice(req.body.token, post);
        res.status(200).json("Send"); 
}
demoCtr.checkStripePayment = (card,callback) =>{
  
 
}

module.exports = demoCtr;
