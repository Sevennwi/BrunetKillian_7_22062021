const Models = require('../models/');
const fs = require('fs');


exports.createGif = (req, res, next) => {
  const gifData = JSON.parse(req.body.gif)
  console.log(gifData)
  Models.Gif.create({
    ...gifData,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
  Models.Gif.findOne({ where: {
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
  
  Models.Gif.update({ id: req.params.id}, { where: {...gifData, id: req.params.id }})
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
  Models.Gif.findAll().then(
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