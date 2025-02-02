const exp=require('express')
const userApp=exp.Router();
const UserAuthor=require("../models/userAuthorModel")
const expressAsyncHandler=require("express-async-handler");
const createUserOrAuthor=require("./createUserOrAuthor")

//API

//create new user
userApp.post("/user",expressAsyncHandler(createUserOrAuthor))

module.exports=userApp;