const Gif = require('../models/Gif-model');
const fs = require('fs');


exports.createGif = (req, res, next) => {
  const gifData = JSON.parse(req.body.gif)
  console.log(gifData)
  const gif = new Gif({
    ...gifData,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  gif.save().then(
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
  Gif.findOne({
    _id: req.params.id
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
  
  Gif.updateOne({ _id: req.params.id}, {...gifData, _id: req.params.id })
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
  Gif.findOne({ _id: req.params.id })
    .then(gif => {
      const filename = gif.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Gif.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllGifs = (req, res, next) => {
  Gif.find().then(
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

exports.likeGif = (req, res, next) => {

  switch (req.body.like) {
    case 0:                                                   
      Gif.findOne({ _id: req.params.id })
        .then((gif) => {
          if (gif.usersLiked.find( user => user === req.body.userId)) {  
            Gif.updateOne({ _id: req.params.id }, {         
              $inc: { likes: -1 },                           
              $pull: { usersLiked: req.body.userId }          
            })
              .then(() => { res.status(201).json({ message: "vote enregistré."}); })
              .catch((error) => { res.status(400).json({error}); });

          } 
          if (gif.usersDisliked.find(user => user === req.body.userId)) { 
            Gif.updateOne({ _id: req.params.id }, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId }
            })
              .then(() => { res.status(201).json({ message: "vote enregistré." }); })
              .catch((error) => { res.status(400).json({error}); });
          }
        })
        .catch((error) => { res.status(404).json({error}); });
      break;
    
    case 1:                                                 
      Gif.updateOne({ _id: req.params.id }, {             
        $inc: { likes: 1 },                                 
        $push: { usersLiked: req.body.userId }              
      })
        .then(() => { res.status(201).json({ message: "Vous aimez le gif" }); }) 
        .catch((error) => { res.status(400).json({ error }); });
      break;
    
    case -1:                                                  
      Gif.updateOne({ _id: req.params.id }, {               
        $inc: { dislikes: 1 },                               
        $push: { usersDisliked: req.body.userId }             
      })
        .then(() => { res.status(201).json({ message: "Vous n'aimez pas le gif" }); }) 
        .catch((error) => { res.status(400).json({ error }); }); 
      break;
    default:
      console.error("bad request");
  }
};