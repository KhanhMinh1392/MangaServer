const express = require('express')
const router = express.Router()
const CateController = require('../controllers/cateController')

router.get("/layloai",CateController.index)
router.post("/themloai",CateController.CreateCate)
router.get("/:cateID",CateController.getCateId)



module.exports=router