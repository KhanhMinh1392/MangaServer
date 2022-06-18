const express = require("express");
const router = express.Router();
const {
  index,
  getAll,
  getPreviousChapters,
  CreatChapter,
  getchapterID,
  updateChapter,
  replaceChapter,
} = require("../controllers/chapterContronller");
const {
  validateBody,
  validateParam,
  schemas,
} = require("../helpers/routerHelper");

router.get("/firstChapter", index);
router.get("/chapters", getAll);
router.get("/previousChapter", getPreviousChapters);
router.post("/addChapters", validateBody(schemas.chapterSchema), CreatChapter);
router.get(
  "/chapterID/:chapterID",
  validateParam(schemas.idSchema, "chapterID"),
  getchapterID
);
router.patch("/updateChapter/:chapterID", updateChapter);
router.put("/replaceChapter/:chapterID", replaceChapter);

module.exports = router;
