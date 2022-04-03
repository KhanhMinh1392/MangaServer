const express = require('express')
const router = express.Router()
const CateController = require('../controllers/cateController')
const {validateBody,validateParam,schemas}=require('../helpers/routerHelper')

router.get("/getGenres",CateController.index)
router.post("/addGenres",validateBody(schemas.categorySchema),CateController.CreateCate)
router.get("/:cateID",CateController.getCateId)



module.exports=router