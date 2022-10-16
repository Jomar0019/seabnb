const mongoose = require('mongoose');
const defaultData = require('../data.json');

const Post = require('../model/postModel');
const Review = require('../model/postReviewModel');

// ALL POST
const allPost = (req,res) => {
    Post.find({}, (err,post) => {
        if(post.length === 0) {
            Post.insertMany(defaultData, err => {
                if(!err) {
                    res.redirect('/');
                    console.log("added data");
                }
            })
        } else {
            res.render("home", {
                post
            })
        }
    })
}

// SINGLE POST
const singlePost = async (req,res) => {
    const { id } = req.params;

    const post = await Post.findOne({ _id: id });
    const rev = await Review.find({ postId: id })

    res.render('post', { post, rev })
}

// GET CREATE POST FORM
const getPostForm = async (req,res) => {
    res.render('createPost');
}

// POST CREATE
const createPost = async (req,res) => {
    const { title, address, price, description, img1, img2, img3 ,img4 ,img5, host } = req.body;

    const post = new Post({
        title, address, price, description, img1,img2, img3 ,img4 ,img5, host
    });
    post.save();
    res.redirect('/')
}

// DELETE POST
const deletePost = async (req,res) => {
    const { id } = req.params;

    Post.deleteOne({ _id: id}, (err) => {
        if(!err) {
            console.log("Deleted Successfully");
            res.redirect('/');
        } else {
            console.log(err)
        }
    })
}

// GET EDIT FORM
const getEditForm = async (req,res) => {
    const { id } = req.params;

    const post = await Post.findById({ _id: id});

    res.render('updatePost', { post });
}

// UPDATE POST
const updatePost = async (req,res) => {
    const { id } = req.params;

    const { title, address, price, description, img1, img2, img3, img4, img5 } = req.body;

    Post.findByIdAndUpdate(
        {_id: id}, 
        {title, address, price, description, img1, img2, img3, img4, img5},
        (err) => {
            if(!err) {
                console.log("Update Successfully");
                res.redirect(`/post/${id}`);
            } else {
                console.log(err)
            }
        })
}

// ADD REVIEW
const createReview = async(req,res) => {
    const { postId ,fullname, review } = req.body;

    const postReview = new Review({
        postId ,fullname, review
    });
    postReview.save();
    res.redirect(`/post/${postId}`)

}


module.exports = { 
    allPost,
    singlePost,
    getPostForm,
    createPost,
    deletePost,
    getEditForm,
    updatePost,
    createReview
}