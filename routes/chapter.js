const express = require('express')
const router = express.Router()
const chapterContronller = require('../controllers/chapterContronller')
const {validateBody,validateParam,schemas}=require('../helpers/routerHelper')

router.get("/firstChapter",chapterContronller.index);
router.get("/chapters",chapterContronller.getAll)
router.post("/addChapters",validateBody(schemas.chapterSchema),chapterContronller.CreatChapter);
router.get("/chapterID/:chapterID",validateParam(schemas.idSchema,'chapterID'),chapterContronller.getchapterID);
router.patch("/updateChapter/:chapterID",chapterContronller.updateChapter);
router.put("/replaceChapter/:chapterID",chapterContronller.replaceChapter);



module.exports = router