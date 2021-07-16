const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

const gifCtrl = require('../controllers/gif');
const likeCtrl = require('../controllers/like')

router.post('/', auth, multer, gifCtrl.createGif);
  
router.put('/:id', auth, multer, gifCtrl.modifyGif);
  
router.delete('/:id', auth, gifCtrl.deleteGif);
  
router.get('/:id', auth, gifCtrl.getOneGif);
  
router.get('/', auth, gifCtrl.getAllGifs);

router.post('/:id/like', auth, multer, likeCtrl.createLikeGif);

router.delete('/:id/like', auth, likeCtrl.deleteLikeGif);

router.get('/like', auth, likeCtrl.getAllLikes);

module.exports = router;