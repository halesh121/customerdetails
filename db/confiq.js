const db=require('mysql');


  var conn=db.createPool({
      connectionLimit : 100,
      host     : 'localhost',
      user     : 'root',
      password : 'password',
      database:'custom_details',
      debug    :  false
      });     
      
    
    module.exports=conn;