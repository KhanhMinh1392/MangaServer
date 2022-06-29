const express = require('express')
const router = express.Router()
const {getAll , createHistory,updateComicHistory,getIdUserHistory} = require('../controllers/historyController');
const {validateBody,validateParam,schemas}=require('../helpers/routerHelper')

router.get("/getAll", getAll)
router.get("/getIdUserHistory",getIdUserHistory)
router.post("/newHistory",createHistory)
router.patch("/updateHistory/:historyId",validateParam(schemas.idSchema,'historyId'),validateBody(schemas.updateHistoryComicSchema),updateComicHistory)

module.exports = router