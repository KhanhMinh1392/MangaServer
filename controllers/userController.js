// const body = require('body-parser')
const User = require("../model/userModel");
const express = require("express");
const Joi = require("@hapi/joi");
//const { JWT_SECRECT }= require('../config/index')
const JWT = require("jsonwebtoken");
const { findById } = require("../model/userModel");

// const encodeToken = (userID) =>{
//     return JWT.sign({
//         iss:'Van Sen',
//         sub: userID,
//         iat: new Date().getTime(),
//         exp: new Date().setTime(new Date().getDate()+3)

//     },JWT_SECRECT)
// }
const idSchema = Joi.object().keys({
  userID: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});
const app = express();

const getID = async (req, res, next) => {
  const validator = idSchema.validate(req.params);
  console.log("result", validator);

  const { userID } = req.value.params;
  const user = await User.findById(userID);
  return res.json({ user });
};

const index = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.json({ users });
  } catch (error) {
    next(error);
  }
};

const CreatUser = async (req, res, next) => {
  try {
    const createUser = new User(req.value.body);

    await createUser.save();

    return res.json({ user: createUser });
  } catch (error) {
    next(error);
  }
};

// const Loginuser = async(req,res,next) =>{
//     const email= req.body.email
//     const password=req.body.password

//    await User.findOne({
//         email:email,
//         password:password
//     })
//     .then(data=>{
//         if (data) {
//             res.json('suc')
//         } else {
//             res.json('fail')
//         }

//     })
//     .catch(err=>{
//         res.status.json('co loi ben server')
//     })
// }
const replaceUser = async (req, res, next) => {
  const { userID } = req.params;
  const newUser = req.body;
  const result = await User.findByIdAndUpdate(userID, newUser);
  return res.json({ success: true });
};

// const Signin = async (req, res, next) => {
//   const { email, password } = req.value.body;
//   const login = await User.findOne({ email, password });
//   if (login) {
//     var token = JWT.sign(
//       {
//         _id: login._id,
//       },
//       "ApiManga",
//       { expiresIn: "2h" }
//     );
//     return res.status(200).json({
//       Http_status: "OK",
//       Http_code: 200,
//       message: "Đăng nhập thành công",
//       token: token,
//     });
//   } else {
//     return res.status(200).json({
//       Http_status: "OK",
//       Http_code: 403,
//       message: "Đăng nhập thất bại",
//     });
//   }
// };

const Signup = async (req, res, next) => {
  const { name, email, phone, password } = req.value.body;

  const foundUser = await User.findOne({ email });

  if (foundUser)
    return res.status(403).json({
      Http_status: "Error",
      Http_code: 403,
      message: "Email đã tồn tại",
    });

  const newUser = new User({ name, email, phone, password });
  console.log("new User", newUser);
  newUser.save();
  //  const token = encodeToken(newUser._id)
  //  res.setHeader('Autorization',token)
  return res.status(200).json({
    Http_status: "OK",
    Http_code: 200,
    message: "Đăng ký thành công",
  });
};

const updateUser = async (req, res, next) => {
  const { userID } = req.value.body;
  const newUser = req.body;
  const result = await User.findByIdAndUpdate(userID, newUser);
  return res.json({ success: true });
};
const deleteUser = async (req, res, next) => {
  try {
    const { userID } = req.params;
    const user = await User.findByIdAndDelete(userID);
    return res.json("Detele Successfully");
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getID,
  index,
  CreatUser,
  replaceUser,
  // Signin,
  Signup,
  updateUser,
  deleteUser,
};
