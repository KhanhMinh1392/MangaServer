const express = require('express')
const router = express.Router()
const imgcomicController = require('../controllers/imgcomicController');
const middleware = require('../helpers/verifyToken');

const {validateBody,validateParam,schemas}=require('../helpers/routerHelper')

router.get("/imgChapter/",imgcomicController.getIDimg)
router.get("/imgComic",imgcomicController.index);
router.post("/addimg",validateBody(schemas.imgcomicSchema),imgcomicController.CreateimgComic);
router.patch("/imgComic/:imgcomicID",validateParam(schemas.idSchema,'imgcomicID'),validateBody(schemas.imgcomicUpdateSchema),imgcomicController.UpdateimgComic);


module.exports = router
