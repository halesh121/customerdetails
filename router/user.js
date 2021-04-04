const express=require('express');
const Usermodel=require('../model/usermodel');
const userrouter=express.Router();
const auth=require('../middleware/auth');
const multer=require('multer');
const upload=multer();


userrouter.post('/user',async(req,res,next)=>{
        await Usermodel.signup(req,res)
})

userrouter.post('/userlogin',async(req,res)=>{
    await Usermodel.signin(req,res)
})

userrouter.post('/userdetails/:token',auth,upload.single('Image'),async(req,res)=>{
        const details=req.body;
    try{    
                        
                        let reg=/^[A-Z]{5}[0-9]{4}[A-z]{1}$/;
                        let date_formate = /^\d{2}[./]\d{2}[./]\d{2}$/;
                        if(details.F_name =='' || details.pan_no=='' || details.Dob=='' || details.Gender=='' || details.Email=='' || req.file==undefined){
                            res.status(400).send("all feilds are madatory");
                        }
                        
                        else if(!reg.test(details.pan_no.toUpperCase()))
                        {
                            res.status(400).send("invalid pancard");

                        }

                        else if(!date_formate.test(details.Dob))
                        {
                            console.log("hi")
                            res.status(400).send("invalid Date Formate....please follow the correct date formate yy/mm/dd");
                        }
                        else
                        {
                                await Usermodel.customerdetails(req,res);
                        }
    }
    catch(e)           
    {
       
        res.send(e);
    }     


})

userrouter.get('/customerdetails/:token',async(req,res)=>{
    try {
        await Usermodel.getdetails(req,res);

    } catch (error) {
        res.send(error)
    }
})



module.exports=userrouter;