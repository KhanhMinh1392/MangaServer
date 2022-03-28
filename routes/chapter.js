const express = require('express')
const router = express.Router()
const chapterContronller = require('../controllers/chapterContronller')
const {validateBody,validateParam,schemas}=require('../helpers/routerHelper')

router.get("/chapters",chapterContronller.index);
router.post("/addChapters",validateBody(schemas.chapterSchema),chapterContronller.CreatChapter);
router.get("/chapterID/:chapterID",validateParam(schemas.idSchema,'chapterID'),chapterContronller.getchapterID);


module.exports = router