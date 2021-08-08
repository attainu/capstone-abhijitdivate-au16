const post = require("../models/post");

exports.getPosts = (req, res) => {
    res.json({
        posts: [{ title: "First post"}, { title :"Second Post"}]
    }

    );
};   

exports.createPost = (req,res) => {
    const post = new post(req.body);
    console.log("CREATING POst: ", req.body);
    post.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.status(200).json({
            post: result
        });
    });
};