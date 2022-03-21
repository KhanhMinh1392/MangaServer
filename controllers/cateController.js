const Category = require('../model/categoryModel')
const Comic = require('../model/comicModel')
const express = require('express')
const Joi = require('@hapi/joi')
const app = express();



 
const index = async (req,res,next)=>{
    try {
     const categories = await Category.find({})
     return res.json({categories})
        
    } catch (error) {
        next(error)
        
    }
 }

 const getCateId = async(req,res,next)=>{
     try {
         const name_cate = req.query.name_cate;
         const category = await Category.findOne({'id':name_cate});
         res.json({
             error:false,
             message:"",
             category
         })
         
     } catch (error) {
         console.log(error.message);
         
     }
 }

//  const index = async (req,res,next)=>{
//     try {
//      const users = await User.find({})
//      return res.json({users})
        
//     } catch (error) {
//         next(error)
        
//     }
//  }

 const CreateCate = async(req,res,next)=>{
    // const {comicID} = req.params

    //  const newCate = new Category(req.body)

    //  const comic = await Comic.findById(comicID)

    //  newCate.comic_type = comic

    //  await newCate.save()

    //  comic.categories.push(newCate._id)

    //  await comic.save()

    //  res.json({category: newCate})

 }

 

 




 module.exports ={
     index,
     getCateId,
     CreateCate
     
 }