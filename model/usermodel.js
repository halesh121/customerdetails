const pool=require('../db/confiq');
const bcrypt=require('bcryptjs')
const { createPool } = require('mysql');
const jwt=require('jsonwebtoken');
const conn = require('../db/confiq');


const signup=async(req,res)=>{

    let username=req.body.username;
    let password=req.body.password;

    let bcryptpassword=await bcrypt.hash(password,8)
    let token=await jwt.sign(username,'assignment');
    
    
    pool.getConnection(function(err,con)
    {
            if(err)
            {
                res.json({"code" : 500, "status" : err});
                return;
            }

            let createtable=`create table if not exists user_register(
                id int primary key auto_increment,
                u_name varchar(255)not null,
                password varchar(255)not null,
                token varchar(255)not null)`;
                con.query(createtable,function(err,result)
                {
                    if(err){
                        console.log(err)
                        res.json({"code" : 500, "status" : err});
                        return;
                    }

                });
                let inserttable='INSERT INTO `user_register`(`id`, `u_name`, `password`,`token`) VALUES (null,"'+username+'","'+bcryptpassword+'","'+token+'")';
                con.query(inserttable,function(err,rowsss)
                {
                        if(err){
                            
                            res.json({"code" : 500, "status" : err});
                            return;
                        }
                        res.send("registered successfully")

                })

                con.release();
    })


}

const signin=async(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    let bcryptpassword=await bcrypt.hash(password,8)


    pool.getConnection(function(err,con)
    {
            if(err)
            {
                res.json({"code" : 500, "status" : err});
                return;
            }

            let loginquery="SELECT * FROM  user_register where u_name='"+username+"'";
            con.query(loginquery,async function(err,rowss)
            {
                    if(err)
                    {
                        res.json({"code" : 500, "status" : err});
                        return;
                    }
                    else if(rowss.length<=0)
                    {
                        res.status(400).send("invalid username");
                        return;
                    }
                    
                    else
                    {
                        passsword=rowss[0].password;
                        const verifypass=await bcrypt.compare(password,passsword)
                       if(!verifypass)
                       {
                            res.status(400).send("invalid password");
                            return;
                       }
                       else{
                           res.json({rowss})
                       }
                    }
            
                })        
                con.release();
    })
}

const customerdetails=async(req,res)=>{
    
    let name=req.body.F_name;
    let pno=req.body.pan_no;
    let Dob=req.body.Dob;
    let gender=req.body.Gender;
    let Email=req.body.Email;
    let profile_image=req.file.originalname;
    let userid=req.params.userid;
       
  

    pool.getConnection(function(err,con){
                if(err)
                {
                    res.json({"code" : 500, "status" : err});
                    return;
                }
                let useridexists="SELECT * FROM user_register where id="+userid+"";
                con.query(useridexists,function(err,rows){
               
                    if(err){
                        res.json({"code" : 500, "status" : "mySQl Error"});
                        return;
                    }
                    
                    if(rows.length<=0)
                    {
                        res.status(400).send("invalid userid");
                        return;
                    }
                   
                })
               

                let createTodos = `create table if not exists customer_details(
                    id int primary key auto_increment,
                    F_name varchar(255)not null,
                    pan_number varchar(255)not null,
                    DOB varchar(50),
                    gender varchar(255)not null,
                    email varchar(255),
                    profileimage varchar(255)not null,
                    userid int,FOREIGN KEY (userid)
                    REFERENCES user_register(id)
                    ON DELETE CASCADE
                )`;
                con.query(createTodos,function(err,results,fields){
                    if (err) {
                        res.status(400).json({"status":"failure","reason":err})
                        return;
                        }  

                    });

                    let insertdetails="INSERT INTO `customer_details`(`id`, `F_name`, `pan_number`, `DOB`, `gender`, `email`, `profileimage`,`userid`) VALUES (null,'"+name+"','"+pno+"','"+Dob+"','"+gender+"','"+Email+"','"+profile_image+"','"+userid+"')";
                    con.query(insertdetails,function(err,result){
                        if(err)
                        {
                            console.log(err); 
                            res.status(400).json({"status":"failure","reason":err})
                            return;
                        }
                            res.send("insert successfully");
                        
                    })  
                      con.release();
        })
}

const getdetails=(req,res)=>{
    pool.getConnection(function(err,con){
        if(err)
        {
            res.json({"code" : 500, "status" : err});
            return;
        }
        let useridexists="SELECT * FROM customer_details";
        con.query(useridexists,function(err,rows){
       
                    if(err)
                    {
                        res.json({"code" : 500, "status" : "mySQl Error"});
                        return;
                    }
                    
                
                        res.json({rows});
                        
            
            })
            con.release();
        })

}



module.exports={signup,signin,getdetails,customerdetails}