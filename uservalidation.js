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
    connection.query("SELECT txtUsername,dtDOB,txtEmail,id,txtPassword,txtPhoneno FROM Users  WHERE txtUsername = ? AND txtPassword = ?",[name,pass ], function (error, results, fields) {
        if (error) {
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