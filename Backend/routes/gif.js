const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const gifCtrl = require("../controllers/gif");
const reactionCtrl = require("../controllers/reaction");
const commentaireCtrl = require("../controllers/commentaire");

router.post("/", auth, multer, gifCtrl.createGif);

router.put("/:id", auth, multer, gifCtrl.modifyGif);

router.delete("/:id", auth, gifCtrl.deleteGif);

router.get("/:id", auth, gifCtrl.getOneGif);

router.get("/", auth, gifCtrl.getAllGifs);

router.post("/:id/reaction", auth, reactionCtrl.createReactionGif);

router.delete(
  "/:gifId/reaction/:reactionId",
  auth,
  reactionCtrl.deleteReactionGif
);

router.post("/:id/commentaire", auth, commentaireCtrl.createCommentaireGif);

router.delete(
  "/:gifId/commentaire/:commentaireId",
  auth,
  commentaireCtrl.deleteCommentaireGif
);

module.exports = router;
