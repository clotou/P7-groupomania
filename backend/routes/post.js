const express = require('express');
const bodyParser = require('body-parser')

const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config');

const  postCtrl = require('../controllers/post');
// router.use(bodyParser.json({limit: '50mb'}));
router.post('/', auth, multer, postCtrl.createPost);
router.post('/:id/like', auth, multer, postCtrl.like);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPosts);

module.exports = router;
