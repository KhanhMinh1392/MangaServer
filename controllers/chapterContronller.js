const Chapter = require("../model/chapterModel");
const Comic = require("../model/comicModel");
const express = require("express");
const Joi = require("@hapi/joi");
const { findOne } = require("../model/chapterModel");
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
    const num = req.query.index;

    return getChapterDetail(0)
  } catch (error) {
    next(error);
  }
};

const getChapterDetail = async (index) => {
  try {
    const id = req.query.id_comic;
    const chapters = await Chapter.findOne({ id_comic: id, index: index });

    if (chapters) {
      const nextChapters = await Chapter.findOne({
        id_comic: id,
        index: index + 1,
      });

      let previousChapter = null;
      if (index - 1 >= 0) {
        previousChapter = await Chapter.findOne({
          id_comic: id,
          index: index - 1,
        });
      }

      return {
        ...chapters._doc,
        nextChapters: nextChapters ? nextChapters._id || "" : "",
        previousChapter: previousChapter ? previousChapter._id || "" : "",
      };
    } else {
      return {};
    }
  } catch (error) {
    console.error(error)
    return {};

  }
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
