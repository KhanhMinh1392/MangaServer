const User = require('../model/userModel')
const express = require('express')

const Joi = require('@hapi/joi')
//const { JWT_SECRECT }= require('../config/index')
const JWT = require('jsonwebtoken')
const { findById } = require('../model/userModel')
const { token } = require('morgan')
let refreshTokens = [];

const tokenController = {
    generateAccessToken:(login)=>{
        return JWT.sign({
            _id: login._id
        }, "ApiManga",
            { expiresIn: "30s" }
        );

    },
    generateRefreshToken:(login)=>{
        return JWT.sign({
            _id: login._id
        }, "RefreshTokenAPI",
            { expiresIn: "365d" }
        );
    },


    signin: async (req, res) => {
        const { email, password } = req.value.body
        const login = await User.findOne({ email, password })
        if (login) {
            const token = tokenController.generateAccessToken(login)
            const refreshToken = tokenController.generateRefreshToken(login)
            refreshTokens.push(refreshToken)
            res.cookie("refreshToken",refreshToken,{
                httpOnly:true,
                secure:false,
                samesite:"strict"
            })
             return res.status(200).json({
                Http_status: "OK",
                Http_code: 200,
                message: "Đăng nhập thành công",
                id_user: login._id,
                token: token
                
                // refeshToken: refeshToken
            });
        }
        else {
           return res.status(200).json({
                Http_status: "Error",
                Http_code: 403,
                message: "Đăng nhập thất bại",

            })
        }

    },
    requestRefreshToken: async(req,res)=>{
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return res.status(403).json("You're not authenticate");
        if(!refreshTokens.includes(refreshToken)){
            return res.status(403).json("Refresh token is not valid")
        }
        JWT.verify(refreshToken,"RefreshTokenAPI",(err,login)=>{
            if(err){
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token)=>token!== refreshToken)
            const newAccessToken = tokenController.generateAccessToken(login)
            const newRefreshToken = tokenController.generateRefreshToken(login)
            refreshTokens.push(newRefreshToken)
            res.cookie("refreshToken",newRefreshToken,{
                httpOnly:true,
                secure:false,
                samesite:"strict"
            });
            res.status(200).json({accestoken: newAccessToken})
        })
    }

}

module.exports = tokenController