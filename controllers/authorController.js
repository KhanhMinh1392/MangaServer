const Author = require('../model/authorModel')
const express = require('express')
const Joi = require('@hapi/joi')
const app = express();

const index = async (req,res,next)=>{
    try {
     const authors = await Author.find({})
     return res.json({authors})
        
    } catch (error) {
        next(error)
        
    }
 }

 const CreateAuthor = async(req,res,next)=>{
    try {
        const createAuthor = new Author(req.body)

    await createAuthor.save()

    return res.json({author : createAuthor})
        
    } catch (error) {
        next (error)
        
    }
}
module.exports={
    index,
    CreateAuthor
} 