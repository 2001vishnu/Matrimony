var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "database-2.cprzfqcrfdkr.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "password",
    database: "matrimony",
});
// console.log(connection);
exports.handler = (event, context, callback) => {
    const parsedBody = JSON.parse(event.body); // should wrap in try/catch
    
   const name = parsedBody.values.txtUsername;
  
   const pass = parsedBody.values.txtPassword;
  
   const gen = parsedBody.values.refGender;
 
   const dob = parsedBody.values.dtDOB;
 
   const religion = parsedBody.values.refReligion;
  
   const mt = parsedBody.values.refMothertongue;
  
   const email = parsedBody.values.txtEmailid;

   const phone = parsedBody.values.txtPhoneno;
   
   const bIsRegirtered = parsedBody.values.bIsRegirtered;
  
   const dtCreatedOn = parsedBody.values.dtCreatedOn;
   
   const dtUpdatedOn = parsedBody.values.dtUpdatedOn;

   const bDeleteFlag = parsedBody.values.bDeleteFlag;
   if ( name== "") {
    callback("username is empty");
    return;
  }
  if (pass == "") {
    callback("password is empty");
    return;
  }
   
   
    connection.query("INSERT INTO Users (txtUsername,txtPassword,refGender,dtDOB,refReligion,refMothertongue,txtEmailid,txtPhoneno,bIsRegirtered,dtCreatedOn,dtUpdatedOn,bDeleteFlag)VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",[name,pass,gen,dob,religion,mt,email,phone,bIsRegirtered,dtCreatedOn,dtUpdatedOn,bDeleteFlag], function (error, results, fields) {
        if (error){
			if(error.errno==1064)
                {
                    callback(( {
                        "status": "error",
                        "values": "user already exists"
                    }));
                }
                else callback(error);
            callback(error,results);
            connection.destroy();
            throw error;
        
        } else {
            // connected!
            console.log(results);
            callback(error,{"status":"succes","values":results});
            connection.end(function (err) { callback(err, results);});
        }
    });
};