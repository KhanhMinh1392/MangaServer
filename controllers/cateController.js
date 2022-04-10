const Category = require('../model/categoryModel')
const Comic = require('../model/comicModel')
const express = require('express')
const Joi = require('@hapi/joi')
const app = express();




const index = async (req, res, next) => {
    try {
        const categories = await Category.find({})
        return res.json({ categories })

    } catch (error) {
        next(error)

    }
}

// const getCateId = async (req, res, next) => {
//     try {
//         const name_cate = req.query.name_cate;
//         const category = await Category.findOne({ 'id': name_cate });
//         return res.json({
//             error: false,
//             message: "",
//             category
//         })

//     } catch (error) {
//         console.log(error.message);

//     }
// }
const getName = async (req, res, next) => {
    try {
        const name_cate = req.query.search;
        const category = await Category.findOne({ 'name_cate': name_cate }).populate('comic_type','name_comic image');
        return res.json({
            error: false,
            message: "",
            category
        })

    } catch (error) {
        console.log(error.message);

    }
 }

 const getCateId = async(req,res,next)=>{
     try {
         const name_cate = req.query.name_cate;
         const category = await Category.findOne({'id':name_cate});
         return res.json({
             http_code: 200,
             error:"OK",
             message:"Success",
             category
         })
         
     } catch (error) {
         console.log(error.message);
         
     }
 }



 const CreateCate = async(req,res,next)=>{
    const comic_type = await Comic.findById(req.value.body.comic_type)

    const category = req.value.body
    delete category.comic_type

    category.comic_type = comic_type._id
    const newCate = new Category(category)
    await newCate.save()

    comic_type.categories.push(newCate._id)
    await comic_type.save()

    return res.status(201).json({ category: newCate })
}

const updateCatecomic = async (req, res, next) => {
    const { genresID } = req.value.params
    const newCate = req.value.body
    const result = await Category.findByIdAndUpdate(genresID, newCate)
    return res.json({ success: true })
}

module.exports = {
    index,
    getCateId,
    getName,
    CreateCate,
    updateCatecomic

}