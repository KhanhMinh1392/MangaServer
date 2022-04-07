
const express = require('express')
const Joi = require('@hapi/joi');
const ImgComic = require('../model/imgComicModel');
const app = express();

const idSchema = Joi.object().keys({
    imgcomicID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
})

const index = async (req,res,next)=>{
    try {
     const imgComic = await ImgComic.find({})
     return res.json({data:imgComic})
        
    } catch (error) {
        next(error)
        
    }
 }
 const CreateimgComic = async(req,res,next)=>{
    try {
        const createimgComic = new ImgComic(req.value.body)
        //const check = db.findById(createimgComic.id_chapter)
        // if(check)
        // { 
        //     let newarr = createimgComic.image; //new arr

        //     let oldarr = ................; // old arr
        //     const oldandanew =oldarr.concat(newarr)
        //     return arr
        //     //code
        //     push// concat
        // }
        //     else {
        //     }
        await createimgComic.save()
        return res.json({
            http_status: "OK",
            http_code: 200,
            http_message: "Success",
            data : createimgComic
           })
        
    } catch (error) {
       next (error)
        
    }
}

const UpdateimgComic = async(req,res,next)=>{
    const {imgcomicID} = req.value.params
    const newimgComic = req.value.body
    const result = await ImgComic.findByIdAndUpdate(imgcomicID, newimgComic)
    return res.json({success: true})


}

 module.exports={
     index,
     CreateimgComic,
     UpdateimgComic
 }
