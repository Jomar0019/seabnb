const { Router } = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const { allPost,
    singlePost,
    getPostForm,
    createPost,
    deletePost,
    getEditForm,
    updatePost,
    createReview } = require('../controller/postController');

const router = Router();

// ALL POST
router.get('/', allPost);

// SINGLE POST
router.get('/post/:id', singlePost);

// GET POST FORM
router.get('/create', requireAuth, getPostForm);

// POST FUNCTION
router.post('/create', createPost);

// DELETE POST
router.delete('/delete/:id', deletePost);

// GET EDIT POST
router.get('/update/:id', getEditForm);

// EDIT POST FUNCTION
router.patch('/update/:id', updatePost);

// CREATE REVIEW
router.post('/review', createReview)

module.exports = router