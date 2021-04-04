const express=require('express');
const Personal_details=require('../model/personal_details')
const router=express.Router();
const multer=require('multer');
const upload=multer();


router.post('/custom_details',upload.single('Image'),async(req,res,next)=>{

    const details=req.body;
    // const
    // console.log(req.file.originalname);
     
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
        res.status(400).send("invalid Date Formate....please follow the correct date formate yy/mm/dd");
    }
    else
    {
            await Personal_details.insert(req,res);
    }



})




module.exports=router