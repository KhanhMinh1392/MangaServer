const express = require('express')
const router = express.Router()
const {getAll , createHistory,updateComicHistory,getIdUserHistory,replaceHistoryChapter} = require('../controllers/historyController');
const {validateBody,validateParam,schemas}=require('../helpers/routerHelper')

router.get("/getAll", getAll)
router.get("/getIdUserHistory",getIdUserHistory)
router.post("/newHistory",createHistory)
router.patch("/updateHistory/:historyId",validateParam(schemas.idSchema,'historyId'),validateBody(schemas.updateHistoryComicSchema),updateComicHistory),
router.put("/replaceHistoryChapter/:historyId",replaceHistoryChapter)

module.exports = router