const Chapter = require('../model/chapterModel')
const express = require('express')
const Joi = require('@hapi/joi')
const app = express();
const idSchema = Joi.object().keys({
  chapterID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
})

const getchapterID = async(req,res,next)=>{
  const validator= idSchema.validate(req.params)
  const {chapterID} = req.value.params

  const chapters = await Chapter.findById(chapterID)
  if(chapters){
    return res.json({chapters})

  }else{
    return res.status(200).json({
      Http_status: "OK",
      Http_code: 403,
      message: "Id không hợp lệ",
    });
  }
}

const index = async (req, res, next) => {
    try {
      const chapters = await Chapter.find({});
      return res.json({ chapters });
    } catch (error) {
      next(error);
    }
  };

  const CreatChapter = async (req, res, next) => {
    try {
      const createChapter = new Chapter(req.value.body);
  
      await createChapter.save();
  
      return res.json({ chapter: createChapter });
    } catch (error) {
      next(error);
    }
  };

  module.exports={
    getchapterID,
      index,
      CreatChapter
  }