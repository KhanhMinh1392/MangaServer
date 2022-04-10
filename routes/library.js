const express = require('express')
const router = express.Router()
const libraryController = require('../controllers/libraryController')
const {validateBody,validateParam,schemas}=require('../helpers/routerHelper')

router.get("/allLibrary",libraryController.index);

router.post("/addComicLib",validateBody(schemas.librarySchema),libraryContronller.createLibrary);

router.patch("/updateLibrary/:libraryID",validateParam(schemas.idSchema,'libraryID'),validateBody(schemas.updatelibrarySchema),libraryContronller.updateLibrary);

module.exports = router 