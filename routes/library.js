const express = require('express')
const router = express.Router()
const libraryController = require('../controllers/libraryController')
const {validateBody,validateParam,schemas}=require('../helpers/routerHelper')
const middleware = require('../helpers/verifyToken');


router.get("/allLibrary",libraryController.index);

router.post("/addComicLib",validateBody(schemas.librarySchema),libraryController.createLibrary);

router.patch("/updateLibrary/:libraryID",validateParam(schemas.idSchema,'libraryID'),validateBody(schemas.updateLibrarySchema),libraryController.updateLibrary);

router.delete("/removeLib/:libraryID",validateParam(schemas.idSchema,'libraryID'),libraryController.deleteLibrary)

router.delete("/removeComicLib/:libraryID&:comicId",libraryController.deteleComicLib)

module.exports = router 