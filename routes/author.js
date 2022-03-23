const express = require('express')
const router = express.Router()
const AuthorController = require('../controllers/authorController')

router.get("/getAuthor",AuthorController.index);
router.post("/addAuthor",AuthorController.CreateAuthor);




module.exports = router