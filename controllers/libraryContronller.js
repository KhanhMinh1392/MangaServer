const Library = require('../model/libraryModel')
const express = require('express')
const Joi = require('@hapi/joi')
const app = express();

const index = async (req,res,next)=>{
    try {
     const comics = await Library.find({})
     return res.json({comics})
        
    } catch (error) {
        next(error)
        
    }
 }



 const Createlibrary = async(req,res,next)=>{
    try {
        const { id_user,id_comic } = req.value.body;
        const check = await Library.findOne({id_user})
        if(check)
        return res.status(403).json({
            Http_status: "Error",
            Http_code: 403,
            message: "User đã tồn tại",
          });
        const createLibrary = new Library({id_user, id_comic});
        createLibrary.save()
        return res.json({
            http_status: "OK",
            http_code: 200,
            http_message: "Success",
            library: createLibrary
           })
        
    } catch (error) {
       next (error)
        
    }
}

 module.exports = {
     index,
     Createlibrary
 }
