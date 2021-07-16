const Models = require('../models/');
const jwt = require('jsonwebtoken');



exports.createLikeGif = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    Models.Like.create({
      userId,
      gifId: req.params.id
    })
    .then(() => res.status(200).json({ message: 'Objet Liké !'}))
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
  
  exports.deleteLikeGif = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    Models.Like.destroy({ where: {
      userId,
      gifId: req.params.id }
    })
    .then(() => res.status(200).json({ message: 'Objet Liké !'}))
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.getAllLikes = (req, res, next) => {
    Models.Like.findAll().then(
      (likes) => {
        res.status(200).json(likes);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };