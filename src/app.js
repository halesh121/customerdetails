// console.log("hi");
const express=require('express');
const body_parser=require('body-parser')
// const Info_router = require('../router/info-router');
const User_router=require('../router/user')
const auth=require('../middleware/auth')

const port= process.env.PORT || 4000;
const app=express()

app.use(body_parser.urlencoded({extended:true}))
app.use(body_parser.json())
// app.use(Info_router)
app.use(User_router);

app.listen(port,()=>{console.log(`lisetning port number ${port}`)})