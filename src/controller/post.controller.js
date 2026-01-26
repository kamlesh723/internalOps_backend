const Post = require("../models/Post");
const {processTags} = require("../controller/Tag.controller")

const createPost = async(req,res)=>{
    try {
        const {title, content, status,tags=[]} = req.body;

        if(!title || !content){
            return res.status(400).json({messgae:"Title and Content required"})
        }

        const tagIds= await processTags(tags);
        const post  = await Post.create({
            title,
            content,
            author:req.user._id,// this id will be from token verifytoken
            status:status ||"draft"
        });
        return res.status(201).json({
            message:"Post Created Succesfuly",
            post
        })
    } catch (error) {
        console.log("create post error",error.message);
        return res.status(500).json( {message:"Server Error"})
        
    }
}

const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page <= 0 || limit <= 0) {
      return res.status(400).json({
        message: "Page and limit must be positive numbers",
      });
    }

    const filter = {
      isActive: true,
      status: "published",
    };

    const total = await Post.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    // 🔥 THIS is the important check
    if (page > totalPages && totalPages !== 0) {
      return res.status(404).json({
        message: "Page not found",
        pagination: {
          requestedPage: page,
          totalPages,
        },
      });
    }

    const skip = (page - 1) * limit;

    const posts = await Post.find(filter)
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.json({
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts: total,
        postsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getPostById = async(req,res)=>{
    try{
        const post = await Post.findOne({
        _id:req.params.id,
        isActive:true,
        status:"published"
    }).populate("author","name email");

    if(!post){
        return res.status(404).json({
            message:"Post not found"
        })
    }
    return res.json({post})
}catch(error){
    return res.status(500).json({message:"server Error"});
}
}

const updatePost = async(req,res)=>{
    try {
        const {title, content, status,tags} = req.body;
        const post = req.post//from checkownership middleware

        if(title) post.title = title;
        if(content) post.content =content;
        if(status) post.status = status;

        if(tags){
            post.tags = await processTags(tags)
        }
       
        await post.save();
        return res.json({
            message:"Post updated succesfully",
            
        });
    } catch (error) {
        return res.status(500).json({message:"Server Error"})
    }
};

const deletePost = async(req,res)=>{
    try {
        const post = req.post;

        //soft delete
        post.isActive = false;
        post.deletedAt = new Date();
        post.deletedBy = req.user._id;//

        await post.save();
        return res.json({
            message:"Post updated succesfully"})
    } catch (error) {
         return res.status(500).json({message:"Server Error"})
    }
}

const searchPosts = async(req,res)=>{
    try {
        const {q} = req.query;// search query and this bracket bcz of it come as object 
        if(!q){
            return res.status(400).json({message:"Search query required"})
        }

        const posts = await Post.find({
            isActive:true,
            status:"published",
            $or:[
               { title:{$regex:q,$options:"i"}},
               { content:{$regex:q,$options:"i"}}
            ]
        })
        .populate("author","name email")
        .sort({createdAt:-1});

        return res.json({
            posts,
            count:posts.length,
            query:q
        });

    } catch (error) {
        return res.status(500).json({message:"Server Error"})
    }
}
const getMyPosts = async(req,res)=>{
    try {
        const posts = await Post.find({
            auhtor:req.user,_id,
            isActive:true
        }).sort({createdAt:-1});// -1 mean neweast first
        return res.json({posts});

    } catch (error) {
        return res.status(500).json({message:"Server Error"})
    }
}
const getMyDrafts = async(req,res)=>{
    try {
        const drafts = await Post.find({
            author:req.user._id,
            status:"draft",
            isActive:true
        }).sort({createdAt:-1});

        return res.json({drafts})
    } catch (error) {
        return res.status(500).json({message:"Server Error"})
    }
}
module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getMyDrafts,
    getMyPosts,
    searchPosts
}