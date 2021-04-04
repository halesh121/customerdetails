const pool=require('../db/confiq');


const insert=(req,res)=>{
    let name=req.body.F_name;
    let pno=req.body.pan_no;
    let Dob=req.body.Dob;
    let gender=req.body.Gender;
    let Email=req.body.Email;
    let profile_image=req.file.originalname;


        pool.getConnection(function(err,con){
                if(err)
                {
                    res.json({"code" : 500, "status" : err});
                    return;
                }
               

                let createTodos = `create table if not exists customer_details(
                    id int primary key auto_increment,
                    F_name varchar(255)not null,
                    pan_number varchar(255)not null,
                    DOB varchar(50),
                    gender varchar(255)not null,
                    email varchar(255),
                    profileimage varchar(255)not null
                )`;
                con.query(createTodos,function(err,results,fields){
                    if (err) {
                        res.status(400).json({"status":"failure","reason":err})
                        }  

                    });

                    let insertdetails="INSERT INTO `customer_details`(`id`, `F_name`, `pan_number`, `DOB`, `gender`, `email`, `profileimage`) VALUES (null,'"+name+"','"+pno+"','"+Dob+"','"+gender+"','"+Email+"','"+profile_image+"')";
                   console.log(insertdetails); 
                    con.query(insertdetails,function(err,result){
                        if(err){
                            
                            res.status(400).json({"status":"failure","reason":err})
                        }

                            res.send("insert successfully");
                    })  
                      con.release();
        })

}


module.exports={insert}