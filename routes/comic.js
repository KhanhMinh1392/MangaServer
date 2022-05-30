const express = require('express')
const router = express.Router()
const ComicController = require('../controllers/comicController');

const {validateBody,validateParam,schemas}=require('../helpers/routerHelper')

router.get("/manga",ComicController.index);
router.get("/views/:comicID",validateParam(schemas.idSchema,'comicID'),ComicController.updateViews)
router.post("/addManga",validateBody(schemas.comicSchema),ComicController.CreateComic);
router.get("/manga/:comicID",validateParam(schemas.idSchema,'comicID'),ComicController.getcomicID);
router.put("/manga/:comicID",ComicController.replaceComic);
router.patch("/manga/:comicID",validateParam(schemas.idSchema,'comicID'),validateBody(schemas.comicUpdateSchema),ComicController.updateComic);


module.exports = router
