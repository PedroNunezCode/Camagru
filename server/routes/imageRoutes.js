const express = require('express');
const router = express.Router();

const imageControllers = require('../controllers/imageControllers');


router.post('/like-image', imageControllers.likeImage);
router.post('/post-comment', imageControllers.postComment);
router.get('/get-all-images', imageControllers.getAllImages);
router.post('/delete-image', imageControllers.deleteImage);
router.post('/save-image/:id', imageControllers.saveImage);
router.get('/get-images/:id', imageControllers.getImages);

module.exports = router;