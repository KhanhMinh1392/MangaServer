const express = require('express')
const router = express.Router()
const statisicController = require('../controllers/statisicController')
const middleware = require('../helpers/verifyToken');

router.get("/allStatisic", statisicController.index);
router.post("/addStatisic", statisicController.createStatisic);
router.patch("/likeComic/:statisicID", middleware.verifyToken,statisicController.updateStatisicUser)
router.delete("/unlikeComic/:statisicID&:comicId",statisicController.unLike)



module.exports = router