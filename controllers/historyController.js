const History = require("../model/historyModel");
const express = require("express");
const Joi = require("@hapi/joi");
const { findOne } = require("../model/historyModel");

exports.getAll = async (req, res, next) => {
  try {
    const getAllHistory = await History.find({})
      .populate("id_comic", "_id name_comic image name_author")
      .populate("id_chapter", "name_chapter");
    return res.json(getAllHistory);
  } catch (error) {
    next(error);
  }
};

exports.createHistory = async (req, res, next) => {
  try {
    const { id_user, id_comic, id_chapter } = req.body;
    const checkId = await History.findOne({ id_comic, id_chapter });
    if (checkId) {
      await History.updateOne({
        timestamps: new Date(),
        // id_comic:id_comic,
        // id_chapter:id_chapter
      });
      return res.status(403).json({
        Http_status: "Error",
        Http_code: 403,
        message: "Comic added",
      });
    } else {
      const newHistory = new History({ id_user, id_comic, id_chapter });
      await newHistory.save();
      return res.json({ history: newHistory });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateComicHistory = async (req, res, next) => {
  try {
    // const id_comic = req.body
    const historyId = req.params;
    const { id_comic, id_chapter } = req.value.body;
    const check = await History.find({
      "id_comic.0": id_comic, // '623855815102c4f70b762807'
    });
    console.log("check", check);

    console.log("----", historyId);
    console.log("id_comic", id_comic);
    const newComic = req.value.body;

    // console.log("----", newComic);
    if (check.length) {
      return res.status(403).json({
        Http_status: "Error",
        Http_code: 403,
        message: "Comic added",
      });
    } else {
      const result = await History.updateMany(
        historyId,
        {
          $push: newComic,
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      console.log("result", JSON.stringify(result));
      return res.json({
        http_status: "OK",
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      http_status: "Error",
      message: "Error",
    });
  }
};

exports.getIdUserHistory = async (req, res, next) => {
  try {
    const id_user = req.query.id_user;
    // const id_chapter = req.query.id_chapter
    const historyIdUser = await History.find({
      id_user: id_user,
    })
      .sort({ createdAt: -1 })
      .populate("id_comic", "_id name_comic image name_author")
      .populate("id_chapter", "name_chapter index");
    if (historyIdUser) {
      return res.json({ historyIdUser });
    } else {
      return res.json({
        http_code: 403,
        http_status: "Error",
        message: "No data",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: " server returned a 500 response",
    });
  }
};
