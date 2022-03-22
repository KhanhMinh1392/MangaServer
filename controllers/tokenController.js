const User = require('../model/userModel')
const express = require('express')

const Joi = require('@hapi/joi')
//const { JWT_SECRECT }= require('../config/index')
const JWT = require('jsonwebtoken')
const { findById } = require('../model/userModel')
const { token } = require('morgan')
let refeshTokens = [];

const tokenController = {
    generateAccesToken:(login)=>{
        return JWT.sign({
            _id: login._id
        }, "ApiManga",
            { expiresIn: "30s" }
        );

    },
    generateRefreshToken:(login)=>{
        return JWT.sign({
            _id: login._id
        }, "RefeshTokenAPI",
            { expiresIn: "365d" }
        );
    },


    signin: async (req, res) => {
        const { email, password } = req.value.body
        const login = await User.findOne({ email, password })
        if (login) {
            const token = tokenController.generateAccesToken(login)
            const refeshToken = tokenController.generateRefreshToken(login)
            refeshTokens.push(refeshToken)
            res.cookie("refeshToken",refeshToken,{
                httpOnly:true,
                secure:false,
                path:"/",
                samesite:"strict"
            })
             return res.status(200).json({
                Http_status: "OK",
                Http_code: 200,
                message: "Đăng nhập thành công",
                token: token
                // refeshToken: refeshToken
            });
        }
        else {
           return res.status(200).json({
                Http_status: "OK",
                Http_code: 403,
                message: "Đăng nhập thất bại",

            })
        }

    },
    requestRefreshToken: async(req,res)=>{
        const refreshToken = req.cookies.refeshToken
        if(!refreshToken) return res.status(403).json("You're not authenticate");
        if(!refeshTokens.includes(refreshToken)){
            return res.status(403).json("Refesh token is not valid")
        }
        JWT.verify(refreshToken,"RefeshTokenAPI",(err,login)=>{
            if(err){
                console.log(err);
            }
            refeshTokens = refeshTokens.filter((token)=>token!== refreshToken)
            const newAccesToken = tokenController.generateAccesToken(login)
            const newRefreshToken = tokenController.generateRefreshToken(login)
            refeshTokens.push(newRefreshToken)
            res.cookie("refeshToken",newRefreshToken,{
                httpOnly:true,
                secure:false,
                path:"/",
                samesite:"strict"
            });
            res.status(200).json({accestoken: newAccesToken})
        })
    }

}

module.exports = tokenController