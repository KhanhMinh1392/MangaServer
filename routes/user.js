const express = require('express');
const middleware = require('../controllers/middlewareController');
const router = express.Router()
const UserController = require('../controllers/userController')
const {validateBody,validateParam,schemas}=require('../helpers/routerHelper')
// const passport = require('passport')
// const passConfig = require('../middlewares/passport')

// router.route('/')
router.get("/getUser",middleware.verifyToken,UserController.index);

router.post("/addUser",validateBody(schemas.userSchema),UserController.CreatUser);

//sign in , sign up

// router.post('/signIn',validateBody(schemas.SingninSchema),UserController.Signin);

router.post('/signUp',validateBody(schemas.SignupSchema),UserController.Signup);

//  router.post("/login",UserController.Loginuser);

router.get("/:userID",validateParam(schemas.idSchema,'userID'),UserController.getID)

router.put("/:userID",validateParam(schemas.idSchema,'userID'),validateBody(schemas.userSchema),UserController.replaceUser)

router.patch("/:userID",validateParam(schemas.idSchema,'userID'),validateBody(schemas.userUpdateSchema),UserController.updateUser)

router.delete("/:userID",UserController.deleteUser)







 module.exports = router