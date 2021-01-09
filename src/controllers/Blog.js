const {validationResult} = require('express-validator');
const BlogPost = require('../models/Blog')
const fs = require('fs')
const path= require('path')

exports.createBlogPost = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty){
        const err = new Error('input value tidak sesuai');
        err.errorStatus = 400;
        err.data= errors.array();
        throw err;
    }

    if (!req.file) {
        const err = new Error('image harus di isi')
        err.errorStatus= 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;

    const Posting = new BlogPost({
        title: title,
        body : body,
        image : image,
        author : {uid : 1, name : 'sidhiek ardhiansah'}
    })

    Posting.save()
    .then(result => {
        result =  {
            message : "Success create blog",
            data : result,
            }
            res.status(201).json(result);
        })
    .catch(err => {
        console.log("err : " + err)
    });
}

exports.getAllBlogPost = (req, res, next) => {
    BlogPost.find()
    .then( result => {
        res.status(200).json({
            message: "data berhasil di ambil",
            data : result
        })
    })
    .catch(err => {
        next(err)
    })
}

exports.getBlogPostById= (req, res, next) => {
    const postId = req.params.postId;
    BlogPost.findById(postId)
    .then(result => {
        if (!result){
            const error= new Error('Blog Post tidak di temukan')
            error.errorStatus= 404;
            throw error;
        } else {
            res.status(200).json({
                message : "Data Berhasil Di temukan",
                data : result
            })
        }
    })
    .catch(err => {
        next(err);
    })
}

exports.updateBlogPost = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty){
        const err = new Error('input value tidak sesuai');
        err.errorStatus = 400;
        err.data= errors.array();
        throw err;
    }

    if (!req.file) {
        const err = new Error('image harus di isi')
        err.errorStatus= 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;
    const postId = req.params.postId;
    
    BlogPost.findById(postId)
    .then(post => {
        if(!post) {
            const error = new Error('id tidak di temukan');
            error.errorStatus=404;
            throw error;
        } 

        post.title= title;
        post.body = body;
        post.image= image;

        return post.save();
    })
    .then(result => {
    res.status(200).json({
        message: "Update telah berhasil",
        data : result,
    })
    })
    .catch(err => {
        next(err)
    })
    
}

exports.deleteBlogPost= (req, res, next) => {
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post => {
        if(!post){
            const error = new Error('id tidak di temukan');
            error.errorStatus=404;
            throw error;
        }
        removeImage(post.image);
        return  BlogPost.findByIdAndRemove(postId)

    }).
    then(result => {
        res.status(200).json({
            message : "Hapus blog post berhasil",
            data : result
        })
    })
    .catch(err => {
        next(err);
    })
    
}

const removeImage= (filepath) => {
console.log('filepath : ' + filepath);
console.log('direktory name : '+ __dirname)

filepath = path.join(__dirname, '../../', filepath);
fs.unlink(filepath, err => {
    console.log(err)
})
}