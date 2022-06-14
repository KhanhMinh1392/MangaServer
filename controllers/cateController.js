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


const getName = async (req, res, next) => {
    try {
        const name_cate = req.query.search;
        const category = await Category.findOne({ 'name_cate': name_cate }).populate('comic_type', 'name_comic image');
        if(category){
            return res.json({
                http_code: 200,
                http_status: "OK",
                message: "Success",
                category
            })

        }else{
            return res.json({
                http_code: 403,
                http_status: "Error",
                message: "No data"
                
        })
    }
        

    } catch (error) {
        console.log(error.message);

    }
}

const getCateId = async (req, res, next) => {
    try {
        const name_cate = req.query.name_cate;
        const category = await Category.findOne({ 'id': name_cate });
        return res.json({
            http_status: "OK",
            http_code: 200,
            http_message: "Success",
            category
        })

    } catch (error) {
        console.log(error.message);

    }
}



const CreateCate = async (req, res, next) => {
    try {
        const createGenres = new Category(req.value.body)
        await createGenres.save()
        return res.json({
            http_status: "OK",
            http_code: 200,
            http_message: "Success",
            category : createGenres
           })
        
    } catch (error) {
       next (error)
        
    }

}

const updateCatecomic = async (req, res, next) => {
    const { genresID } = req.value.params
    const newCate = req.value.body
    const result = await Category.findByIdAndUpdate(
        genresID,
        { $push: newCate },
        {
            new: true,
            useFindAndModify: false,
        }
    );
    return res.json({ success: true })
}

module.exports = {
    index,
    getCateId,
    getName,
    CreateCate,
    updateCatecomic

}