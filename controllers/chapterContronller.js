const Chapter = require('../model/chapterModel')
const Comic = require('../model/comicModel')
const express = require('express')
const Joi = require('@hapi/joi')
const app = express();
const idSchema = Joi.object().keys({
  chapterID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
})

const getchapterID = async (req, res, next) => {
  
  const  {chapterID } = req.value.params

  const data = await Chapter.findById(chapterID)
  // Report.reportView(chapterID)
  return res.json({ data })
}

const index = async (req, res, next) => {
  try {
    const id =req.query.id_comic
    const chapters = await Chapter.find({id_comic: id});
    return res.json({ chapters });
  } catch (error) {
    next(error);
  }
};
const getAll = async(req,res,next)=>{
  try {
    const chapters = await Chapter.find({})
    return res.json({ chapters });
  } catch (error) {
    next(error);
  }
}

const CreatChapter = async (req, res, next) => {
  try {
    const createChapter = new Chapter(req.value.body);

    await createChapter.save();

    return res.json({ chapter: createChapter });
  } catch (error) {
    next(error);
  }
};

const updateChapter = async (req, res, next) => {
  const { chapterID } = req.params;
  const newChapter = req.body;
  const result = await Chapter.findByIdAndUpdate(chapterID, newChapter);
  return res.json({ success: true });
};

module.exports = {
  getchapterID,
  index,
  getAll,
  CreatChapter,
  updateChapter
}