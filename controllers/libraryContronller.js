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
        // const { name, email, phone, password } = req.value.body;
        const createLibrary = new Library(req.value.body)
        await createLibrary.save()
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
