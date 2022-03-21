const express = require('express')
const router = express.Router()
const AuthorController = require('../controllers/authorController')

router.get("/laytacgia",AuthorController.index);
router.post("/themtacgia",AuthorController.CreateAuthor);




module.exports = router