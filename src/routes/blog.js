const express= require('express');
const blogController = require('../controllers/Blog')
const {body} = require('express-validator');
const router = express.Router();

//CREATE => POST
router.post('/post',[
    body('title'). isLength({min : 5}).withMessage('input title tidak sesuai'),
    body('body').isLength({min: 5}).withMessage('input body tidak sesuai')
],blogController.createBlogPost)

router.get('/posts', blogController.getAllBlogPost)
router.get('/posts/:postId', blogController.getBlogPostById)
router.put('/posts/:postId', [
    body('title'). isLength({min : 5}).withMessage('input title tidak sesuai'),
    body('body').isLength({min: 5}).withMessage('input body tidak sesuai')
], blogController.updateBlogPost)
router.delete('/posts/:postId', blogController.deleteBlogPost)

module.exports= router;