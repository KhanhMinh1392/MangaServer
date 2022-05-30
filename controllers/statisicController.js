const Statisic = require('../model/statisticModel')
const express = require('express')
const Joi = require('@hapi/joi')
const app = express();

const index = async (req, res, next) => {
    try {
        const allStatisic = await Statisic.find({})
        return res.json({ allStatisic })

    } catch (error) {

    }
}
const createStatisic = async (req, res, next) => {
    try {
        const createStatisic = new Statisic(req.body)
        await createStatisic.save()
        return res.json({
            http_status: "OK",
            http_code: 200,
            http_message: "Success",
            statisic: createStatisic
        })

    } catch (error) {
        next(error)

    }
}
const updateStatisicUser = async (req, res, next) => {
    try {
        const { statisicID } = req.params;
        const newStatisic = req.body;

        const result = await Statisic.findByIdAndUpdate(
            statisicID,
            { $push: newStatisic },
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

    } catch (error) {
        console.error(error);

    }
}

const unLike = async (req,res,next) =>{
    try {
        const {statisicID,comidId} = req.params
    } catch (error) {
        
    }
}

module.exports = {
    index,
    createStatisic,
    updateStatisicUser,
    unLike
}