const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

const gifCtrl = require('../controllers/gif');

router.post('/', auth, multer, gifCtrl.createGif);

router.post('/:id/like', auth, gifCtrl.likeGif);
  
router.put('/:id', auth, multer, gifCtrl.modifyGif);
  
router.delete('/:id', auth, gifCtrl.deleteGif);
  
router.get('/:id', auth, gifCtrl.getOneGif);
  
router.get('/', auth, gifCtrl.getAllGifs);

module.exports = router;