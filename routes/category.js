const express = require('express')
const router = express.Router()
const CateController = require('../controllers/cateController')
const {validateBody,validateParam,schemas}=require('../helpers/routerHelper')

router.get("/getGenres",CateController.index)
router.get("/findCate",CateController.getName);
router.post("/addGenres",validateBody(schemas.categorySchema),CateController.CreateCate)
router.get("/:cateID",CateController.getCateId)
router.patch("/Genres/:genresID",validateParam(schemas.idSchema,'genresID'),validateBody(schemas.updatecatecomicSchema),CateController.updateCatecomic);



module.exports=router