const express = require('express');
const middleware = require('../helpers/verifyToken');
const router = express.Router()
const tokenController = require('../controllers/tokenController')
const {validateBody,validateParam,schemas}=require('../helpers/routerHelper')

router.post('/signIn',validateBody(schemas.SingninSchema),tokenController.signin);
router.post('/refresh',tokenController.requestRefreshToken)

module.exports=router