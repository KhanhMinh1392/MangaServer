const Chapter = require("../model/chapterModel");
const Comic = require("../model/comicModel");
const express = require("express");
const Joi = require("@hapi/joi");
// const { findOne } = require("../model/chapterModel");
const app = express();
const idSchema = Joi.object().keys({
  chapterID: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

exports.getchapterID = async (req, res, next) => {
  const { chapterID } = req.value.params;

  const listChapter = await Chapter.findById(chapterID);
  // Report.reportView(chapterID)
  return res.json({ listChapter });
};

exports.index = async (req, res, next) => {
  try {
    const id = req.query.id_comic;
    const index = req.query.index;
    console.log("id", id);
    console.log("index", index);

    const result =  await exports.getChapterDetail(res,id, index)
    return res.json({result})
    
  } catch (error) {
    next(error);
  }
};

exports.getNextChapter = async(req,res,next)=>{
  try {
    const id = req.query.id_comic;
    const index = req.query.index;
    console.log("id", id);
    console.log("index", index);

    const result =  await exports.getChapterDetail(res,id, index)
    return res.json({result})
    
  } catch (error) {
    
  }
}
exports.getDetailNextChap = async(res,id,index)=>{
  try {
    const nextDetail = await Chapter.findOne({
      id_comic:id,
      index:index
    })
    return res.json({
      nextDetail
    })
  } catch (error) {
    
  }
}


exports.getChapterDetail = async (res,id, index) => {
  try {
  
    
    const chapters = await Chapter.findOne({
      id_comic: id,
      index: index,
      // _id: '6245ba909ef85e573fd6f9b9'
    });
    console.log( index, "------", chapters);
    const numIndex = Number(index)

    if (chapters) {
      const nextChapters = await Chapter.findOne({
        id_comic: id,
        index: numIndex + 1,
      });
      console.log("nextchapter:", nextChapters);

      let previousChapter = null;
      if (index - 1 >= 0) {
        previousChapter = await Chapter.findOne({
          id_comic: id,
          index: numIndex - 1,
        });
      }
      console.log("previouschapters", previousChapter);

      return {
       
        ...chapters._doc,
        nextChapters: nextChapters ? nextChapters._id || "" : "",
        previousChapter: previousChapter ? previousChapter._id || "" : "",
      };
    } else {
      return {};
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};
exports.getImgChap = async (req, res, next) => {
  try {
    const id = req.query.id_comic;
    const index = req.query.index;
    const chapters = await Chapter.findOne({ id_comic: id, index: 0 });
    return res.json({ chapters });
  } catch (error) {}
};

exports.getAll = async (req, res, next) => {
  try {
    const chapters = await Chapter.find({});
    return res.json({ chapters });
  } catch (error) {
    next(error);
  }
};

exports.CreatChapter = async (req, res, next) => {
  try {
    const createChapter = new Chapter(req.value.body);

    await createChapter.save();

    return res.json({ chapter: createChapter });
  } catch (error) {
    next(error);
  }
};

exports.updateChapter = async (req, res, next) => {
  const { chapterID } = req.params;
  const newChapter = req.body;
  const result = await Chapter.findByIdAndUpdate(chapterID, newChapter);
  return res.json({ success: true });
};
exports.replaceChapter = async (req, res, next) => {
  const { chapterID } = req.params;
  const newChapter = req.body;
  const result = await Chapter.findByIdAndUpdate(chapterID, newChapter);
  return res.json({ success: true });
};
