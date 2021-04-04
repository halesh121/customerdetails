const pool=require('../db/confiq');



const auth=async(req,res,next)=>{

    pool.getConnection(function(err,con){
        if(err){
            throw new Error;
        }
        let token="SELECT * from user_register where id="+req.params.userid+"";

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