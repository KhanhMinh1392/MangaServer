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
    result
  });
};

const deleteLibrary = async (req,res,next)=>{
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
}

const deteleComicLib = async(req, res, next)=>{
  try {
    const { libraryID,comicId } = req.params;


    console.log(libraryID,comicId);

    const check = await Library.updateMany({_id:libraryID},{$pull:{comic: comicId}})

    return res.json({
      http_status: "OK",
      http_code: 200,
      http_message: "Detele Successfully",
    });
  } catch (error) {
    res.json(error);
    
  }

}

module.exports = {
  index,
  createLibrary,
  updateLibrary,
  deleteLibrary,
  deteleComicLib
};
