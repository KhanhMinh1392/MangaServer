const Category = require("../model/categoryModel");
const Comic = require("../model/comicModel");
const express = require("express");
const Joi = require("@hapi/joi");
const Statisic = require("../model/statisticModel");
const app = express();

const idSchema = Joi.object().keys({
  comicID: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const getcomicID = async (req, res, next) => {
  const validator = idSchema.validate(req.params);
  const { comicID } = req.value.params;
  const comic = await Comic.findById(comicID).populate(
    "categories",
    "name_cate color"
  );
  return res.json({ comic });
};

const updateViews = async (req, res, next) => {
  try {
    const { comicID } = req.value.params;
    console.log(comicID);
    const viewsComic = await Comic.updateOne(
      {
        _id: comicID,
      },
      {
        $inc: {
          views: 1,
        },
      }
    );
    return res.json({
      http_status: "OK",
      http_code: 200,
      message: "Views have increased",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " server returned a 500 response",
    });
  }
};

const fillterManga = async (req, res, next) => {
  try {
    const id_genres = req.query.search;
    console.log(req.query, id_genres);
    const genresManga = await Comic.find({ categories: id_genres });
    if (genresManga) {
      return res.json({
        http_code: 200,
        http_status: "OK",
        message: "Success",
        genresManga,
      });
    } else {
      return res.json({
        http_code: 403,
        http_status: "Error",
        message: "No data",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " server returned a 500 response",
    });
  }
};

const index = async (req, res, next) => {
  try {
    const comics = await Comic.find({});
    return res.json({ comics });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " server returned a 500 response",
    });
  }
};
const sortComic = async (req, res, next) => {
  try {
    // const sort = req.query.sort * 1 || '-views';

    const comics = await Comic.find({}).sort({
      views: -1,
    });
    return res.json({ comics });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " server returned a 500 response",
    });
  }
};

const CreateComic = async (req, res, next) => {
  try {
    const st = new Statisic();
    await st.save();
    const createComic = new Comic(req.value.body);
    createComic.statisticId = st._id;
    await createComic.save();
    return res.json({
      http_status: "OK",
      http_code: 200,
      http_message: "Success",
      comic: createComic,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " server returned a 500 response",
    });
  }
};

const replaceComic = async (req, res, next) => {
  try {
    const { comicID } = req.params;
    const newComic = req.body;
    const result = await Comic.findByIdAndUpdate(comicID, newComic);
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " server returned a 500 response",
    });
  }
};

const updateComic = async (req, res, next) => {
  const { comicID } = req.value.params;
  const newComic = req.value.body;
  const result = await Comic.findByIdAndUpdate(comicID, newComic);
  return res.json({ success: true });
};

module.exports = {
  getcomicID,
  updateViews,
  fillterManga,
  index,
  sortComic,
  CreateComic,
  replaceComic,
  updateComic,
};
