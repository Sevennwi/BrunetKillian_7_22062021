const Models = require('../models');
const jwt = require('jsonwebtoken');



exports.createReactionGif = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    Models.Reaction.create({
      userId,
      gifId: req.params.id
    })
    .then(() => res.status(200).json({ message: 'Gif Liké !'}))
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
  
  exports.deleteReactionGif = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    Models.Reaction.destroy({ where: {
      userId,
      gifId: req.params.id }
    })
    .then(() => res.status(200).json({ message: 'Reaction supprimé !'}))
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.getAllReactions = (req, res, next) => {
    Models.Reaction.findAll().then(
      (reactions) => {
        res.status(200).json(reactions);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };