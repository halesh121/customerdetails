const db=require('mysql');


var conn=db.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database:'custom_details',
    debug    :  false
    });

    // conn.getConnection("CREATE DATABASE IF NOT EXISTS custom_details", function (err, result) {  
    //   if (err) throw err;  
    //    console.log("successfull");
   
    
    
    
    
      module.exports=conn;