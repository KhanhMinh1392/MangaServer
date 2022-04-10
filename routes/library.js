const express = require('express')
const router = express.Router()
const libraryContronller = require('../controllers/libraryContronller')
const {validateBody,validateParam,schemas}=require('../helpers/routerHelper')

router.get("/alllibrary",libraryContronller.index);

router.post("/addlibrary",validateBody(schemas.librarySchema),libraryContronller.createLibrary);

router.patch("/updatelibrary/:libraryID",validateParam(schemas.idSchema,'libraryID'),validateBody(schemas.updatelibrarySchema),libraryContronller.updateLibrary);

module.exports = router