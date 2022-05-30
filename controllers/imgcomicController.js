
const express = require('express')
const Joi = require('@hapi/joi');
const ImgComic = require('../model/imgComicModel');
const Comic = require('../model/comicModel')
const app = express();

const idSchema = Joi.object().keys({
    imgcomicID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
})

const getIDimg = async (req, res, next) => {

    // const search = req.params.search;
    // const idchater = await ImgComic.findOne({ search })
    // return res.json({ data: idchater })
    // const { id_chapter } = req.value.body
    // let params =[];
    // params.keyword = req.query.keyword
    // const keyword = req.headers.keyword

}


const index = async (req, res, next) => {
    try {
        const imgComic = await ImgComic.find({})
        return res.json({ data: imgComic })

    } catch (error) {
        next(error)

    }
}
const CreateimgComic = async (req, res, next) => {
    try {
        const createimgComic = new ImgComic(req.value.body)
       
        await createimgComic.save()
        return res.json({
            http_status: "OK",
            http_code: 200,
            http_message: "Success",
            data: createimgComic
        })

    } catch (error) {
        next(error)

    }
}



const UpdateimgComic = async (req, res, next) => {
    const { imgcomicID } = req.value.params
    const newimgComic = req.value.body
    const result = await ImgComic.findByIdAndUpdate(
        imgcomicID,
        { $push: newimgComic },
    {
      new: true,
      useFindAndModify: false,
    }
    );
    return res.json({ success: true })
}

module.exports = {
    getIDimg,
    index,
    CreateimgComic,
    UpdateimgComic
}
