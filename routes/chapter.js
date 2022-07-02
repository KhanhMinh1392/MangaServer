const express = require("express");
const router = express.Router();
const {
  index,
  getAll,
  getChapterDetail,
  CreatChapter,
  getchapterID,
  updateChapter,
  replaceChapter,
  // getNextChapter,
  getImgChap,
  getIdComicChapter,
} = require("../controllers/chapterContronller");
const {
  validateBody,
  validateParam,
  schemas,
} = require("../helpers/routerHelper");
console.log(typeof getChapterDetail);

// router.get("/nextChapter", getNextChapter);
router.get("/getDetailChapter", index);
router.get("/chapters", getAll);
router.get("/previousChapter", getChapterDetail);
router.get("/imgChap", getImgChap);
router.get("/idComiChapter", getIdComicChapter);
router.get(
  "/chapterID/:chapterID",
  validateParam(schemas.idSchema, "chapterID"),
  getchapterID
);
router.post("/addChapters", validateBody(schemas.chapterSchema), CreatChapter);
router.patch("/updateChapter/:chapterID", updateChapter);
router.put("/replaceChapter/:chapterID", replaceChapter);

module.exports = router;
