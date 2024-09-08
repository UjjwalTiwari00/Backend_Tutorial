// import model
const Post=require("../models/postModel")
const Comment = require("../models/commentModel");

// bussiness logic

exports.createComment = async (req, res) => {
  try {
    // fetch data from rquest ki body se
    const { post, user, body } = req.body;
    // create a comment object
    const comment = new Comment({
      post,
      user,
      body,
    });
    // save the new comment into the database
    const savedComment = await comment.save();
    // find the post by ID, add the new comment to its comments array
    const updatePost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    ).populate("comments");    //populate the comments array with comment document 

    res.json({
        Post:updatePost,
    });
  } catch (e) {
    return res.status(500),json({
        error:"error while creating comment"
    })
  }
};
