const History = require("../model/historyModel");
const express = require("express");
const Joi = require("@hapi/joi");

exports.getAll = async (req, res, next) => {
  try {
    const getAllHistory = await History.find({});
    return res.json(getAllHistory);
  } catch (error) {
    next(error);
  }
};

exports.createHistory = async (req, res, next) => {
  try {
    const { id_user, id_comic, id_chapter } = req.body;
    const checkId = await History.findOne({ id_comic });
    if (checkId) {
      return res.status(403).json({
        Http_status: "Error",
        Http_code: 403,
        message: "Comic added",
      });
    }
    const newHistory = new History({ id_user, id_comic, id_chapter });
    await newHistory.save();
    return res.json({ history: newHistory });
  } catch (error) {
    next(error);
  }
};

exports.updateComicHistory = async (req, res, next) => {
  try {
    const historyId = req.params;
    const newComic = req.value.body;
    console.log("----", historyId);
    console.log("----", newComic);

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
    return res.json({
      http_status: "OK",
      message: "Success",
      result,
    });
  } catch (error) {}
};
exports.getIdUserHistory = async (req, res, next) => {
  try {
    const id_user = req.query.id_user;
    const historyIdUser = await History.findOne({
      id_user: id_user,
    })
      .populate("id_comic", "_id name_comic image name_author")
      .populate("id_chapter", "name_chapter");
    if (historyIdUser) {
      return res.json({
        http_code: 200,
        http_status: "OK",
        message: "Success",
        data: historyIdUser,
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
