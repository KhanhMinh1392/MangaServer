const express = require('express')
const router = express.Router()
const ComicController = require('../controllers/comicController');

const {validateBody,validateParam,schemas}=require('../helpers/routerHelper')

router.get("/manga",ComicController.index);
router.get("/sortManga",ComicController.sortComic);
router.get("/views/:comicID",validateParam(schemas.idSchema,'comicID'),ComicController.updateViews)
router.get("/fillter",ComicController.fillterManga)
router.get("/manga/:comicID",validateParam(schemas.idSchema,'comicID'),ComicController.getcomicID);
router.post("/addManga",validateBody(schemas.comicSchema),ComicController.CreateComic);
router.put("/manga/:comicID",ComicController.replaceComic);
router.patch("/manga/:comicID",validateParam(schemas.idSchema,'comicID'),validateBody(schemas.comicUpdateSchema),ComicController.updateComic);


module.exports = router
