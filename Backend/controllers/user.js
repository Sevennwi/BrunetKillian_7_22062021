const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Models = require('../models/');

exports.signup = (req, res, next) => {
    if (req.body.password.length >= 6) {
    
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          Models.User.create({
            email: req.body.email,
            password: hash
          })
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
        })
        //.catch(error => res.status(500).json({ error }));
      
    } else {
      return res.status(401).json({ error: 'Mot de passe de 6 caractères minimum !' });
    }
  };

exports.login = (req, res, next) => {
    Models.User.findOne({ where : {email: req.body.email }})
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user.id,
              isAdmin: user.isAdmin,
              token: jwt.sign(
                { userId: user.id, isAdmin:user.isAdmin },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };



  exports.modifyUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      Models.User.update({ email: req.body.email, password: hash , id: req.params.id}, { where: { id: req.params.id }})
      .then(
        () => {
          res.status(201).json({
            message: 'Utilisateur modifiée !'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    })
  };
  
  exports.deleteUser = (req, res, next) => {
    Models.User.destroy({ where: {id: req.params.id }})
      .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };


  exports.getOneUser = (req, res, next) => {
    Models.User.findOne({ include: Models.Gif, where: {
      id: req.params.id }
    }).then(
      (user) => {
        res.status(200).json(user);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

  exports.getAllUsers = (req, res, next) => {
    Models.User.findAll({ include: Models.Gif }).then(
      (users) => {
        res.status(200).json(users);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };