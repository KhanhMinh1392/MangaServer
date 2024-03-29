const Library = require("../model/libraryModel");
const express = require("express");
const Joi = require("@hapi/joi");
const app = express();

const index = async (req, res, next) => {
  try {
    const data = await Library.find({}).populate(
      "comic",
      "_id name_comic image name_author"
    );
    return res.json({
      http_status: "OK",
      http_code: 200,
      http_message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getIdUser = async (req, res, next) => {
  try {
    const id_user = req.query.id_user;
    const comicIdUser = await Library.findOne({
      id_user: id_user,
    }).populate("comic", "_id name_comic image name_author");
    if (comicIdUser) {
      return res.json({
        http_code: 200,
        http_status: "OK",
        message: "Success",
        data: comicIdUser,
      });
    } else {
      return res.json({
        http_code: 403,
        http_status: "Error",
        message: "No data",
      });
    }
  } catch (error) {
    next(error);
  }
};

const createLibrary = async (req, res, next) => {
  try {
    const { id_user, comic } = req.value.body;
    const check = await Library.findOne({ id_user });
    if (check)
      return res.status(403).json({
        Http_status: "Error",
        Http_code: 403,
        message: "User đã tồn tại",
      });
    const createLibrary = new Library({ id_user, comic });
    createLibrary.save();
    return res.json({
      http_status: "OK",
      http_code: 200,
      http_message: "Success",
      library: createLibrary,
    });
  } catch (error) {
    next(error);
  }
};

const updateLibrary = async (req, res, next) => {
  try {
    const { libraryID } = req.value.params;
    const newLibrary = req.value.body;

    const result = await Library.findByIdAndUpdate(
      libraryID,
      { $push: newLibrary },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    return res.json({
      http_status: "OK",
      http_code: 200,
      http_message: "Success",
      result,
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteLibrary = async (req, res, next) => {
  try {
    const { libraryID } = req.value.params;
    const user = await Library.findByIdAndDelete(libraryID);

    return res.json({
      http_status: "OK",
      http_code: 200,
      http_message: "Detele Successfully",
    });
  } catch (error) {
    res.json(error);
  }
};

const deteleComicLib = async (req, res, next) => {
  try {
    const { libraryID, comicId } = req.params;
    console.log(libraryID, comicId);
    const check = await Library.findByIdAndUpdate(libraryID, {
      $pull: { comic: comicId },
    });
    if (check.comic.length == 0) {
      const deletelibrary = await Library.findByIdAndDelete(libraryID);
      return res.json({
        http_status: "OK",
        http_code: 200,
        http_message: "No data",
      });
    } else {
      return res.json({
        http_status: "OK",
        http_code: 200,
        http_message: "Detele Successfully",
      });
    }
  } catch (error) {
    console.error(error);
    return res.json({
      http_status: "Error",
      http_code: 403,
      http_message: "Error",
    });
  }
};

module.exports = {
  index,
  getIdUser,
  createLibrary,
  updateLibrary,
  deleteLibrary,
  deteleComicLib,
};
