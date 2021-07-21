const Models = require('../models/');
const fs = require('fs');
const User = require('../models/User');
const Gif = require('../models/Gif');
const jwt = require('jsonwebtoken');


exports.createGif = (req, res, next) => {
  const gifData = JSON.parse(req.body.gif)
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId;
  Models.Gif.create({
    ...gifData,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    userId,
  })
  .then(
    () => {
      res.status(201).json({
        message: 'Gif enregistrée !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneGif = (req, res, next) => {
  Models.Gif.findOne({ include: Models.Like, where: {
    id: req.params.id }
  }).then(
    (gif) => {
      res.status(200).json(gif);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyGif = (req, res, next) => {
  const gifData = req.file
  ? {
      ...JSON.parse(req.body.gif),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    }

  : { ...req.body };
  
  Models.Gif.update({ ...gifData, id: req.params.id}, { where: { id: req.params.id }})
  .then(
    () => {
      res.status(201).json({
        message: 'Gif modifiée !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteGif = (req, res, next) => {
  Models.Gif.findOne({ where: {id: req.params.id }})
    .then(gif => {
      console.log(gif)
      const filename = gif.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Models.Gif.destroy({ where: {id: req.params.id }})
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllGifs = (req, res, next) => {
  Models.Gif.findAll({ include: [ {model:Models.Like}, {model:Models.User, attributes: ['email']} ] }).then(
    (gifs) => {
      res.status(200).json(gifs);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

