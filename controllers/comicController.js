const Category = require('../model/categoryModel')
const Comic = require('../model/comicModel')
const express = require('express')
const Joi = require('@hapi/joi')
const app = express();

const idSchema = Joi.object().keys({
    comicID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
})

const getcomicID = async(req,res,next)=>{
    const validator= idSchema.validate(req.params)
    const {comicID} = req.value.params

    const comic = await Comic.findById(comicID)

    return res.json({comic})
}


 
const index = async (req,res,next)=>{
    try {
     const comics = await Comic.find({})
     return res.json({comics})
        
    } catch (error) {
        next(error)
        
    }
 }

 const CreateComic = async(req,res,next)=>{
     try {
         const createComic = new Comic(req.value.body)
         await createComic.save()
         return res.json({
             http_status: "OK",
             http_code: 200,
             http_message: "Success",
             comic : createComic
            })
         
     } catch (error) {
        next (error)
         
     }
 }

 
 const replaceComic = async(req,res,next)=>{
    const {comicID} = req.params
    const newComic = req.body
    const result = await Comic.findByIdAndUpdate(comicID, newComic)
    return res.json({success: true})

}

const updateComic = async(req,res,next)=>{
    const {comicID} = req.value.params
    const newComic = req.value.body
    const result = await Comic.findByIdAndUpdate(comicID, newComic)
    return res.json({success: true})


}


 module.exports ={
     getcomicID,
     index,
     CreateComic,
     replaceComic,
     updateComic
 }