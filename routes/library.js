const express = require('express')
const router = express.Router()
const libraryContronller = require('../controllers/libraryContronller')
const {validateBody,validateParam,schemas}=require('../helpers/routerHelper')

router.get("/alllibrary",libraryContronller.index);

router.post("/createlibrary",validateBody(schemas.librarySchema),libraryContronller.Createlibrary);

module.exports = router