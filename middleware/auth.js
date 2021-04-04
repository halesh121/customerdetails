const pool=require('../db/confiq');

const jwt=require('jsonwebtoken')

const auth=async(req,res,next)=>{


        
// console.log(req.params.token);
    pool.getConnection(function(err,con){
        if(err){
            console.log("hi")
            throw new Error;
            return;
        }
        let token="SELECT * from user_register where token='"+req.params.token+"'";
        console.log(token)
        con.query(token,function(err,rows){
            if(err){
                throw new Error;
            }
            else if(rows.length<=0)
            {
                res.status(400).send("invalid userid");
            }
            

        
            
        })
    })
    next()
    
}



module.exports=auth