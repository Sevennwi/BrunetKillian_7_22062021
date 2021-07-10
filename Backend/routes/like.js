const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

const likeCtrl = require('../controllers/like');

router.post('/', auth, multer, likeCtrl.createLike);
  
router.put('/:id', auth, multer, likeCtrl.modifyLike);
  
router.delete('/:id', auth, likeCtrl.deleteLike);
  
router.get('/:id', auth, likeCtrl.getOneLike);
  
router.get('/', auth, likeCtrl.getAllLikes);

module.exports = router;