const Models = require("../models");
const jwt = require("jsonwebtoken");

exports.createCommentaireGif = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  Models.Commentaire.create({
    userId,
    gifId: req.params.id,
    commentaire: req.body.commentaire,
  })
    .then(() => res.status(200).json({ message: "Commentaire créée !" }))
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteCommentaireGif = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  Models.Commentaire.destroy({
    where: {
      id: req.params.commentaireId,
      userId,
    },
  })
    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
