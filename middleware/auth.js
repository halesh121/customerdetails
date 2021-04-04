const pool=require('../db/confiq');
const jwt=require('jsonwebtoken');

const auth=async(req,res,next)=>{
    pool.getConnection(function(err,con){
        if(err){
                throw new Error;
                return;
        }
        let token="SELECT * from user_register where token='"+req.params.token+"'";
        con.query(token,function(err,rows)
        {
            if(err){
                throw new Error;
            }
            else if(rows.length<=0)
            {
                res.status(400).send("invalid token");
            }  
        })
    })
    next();
    
}

module.exports=auth