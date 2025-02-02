const exp=require('express')
const adminApp=exp.Router();

//API
adminApp.get("/admin-api",(req,res)=>{
    res.send({message:"from admin api"})
})
module.exports = adminApp