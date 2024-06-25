const Post = require('../models/CommunityForm/postModel');
const Comment = require('../models/CommunityForm/commentsModel');

const createPost = async (req, res) => {
    const { content } = req.body;
    const userId = req.body.userId; 
    console.log('userId====',userId)

    try {
        const newPost = await Post.create({ userId, content });
        res.status(201).json(newPost);
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const createComment = async (req, res) => {
    const { content } = req.body;
    const userId = req.body.userId; 
    const postId = req.params.postId;

    try {
        const newComment = await Comment.create({ postId, userId, content });
        res.status(201).json(newComment);
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const fetchPosts = async (req, res) => {
    try {
        // Fetch all posts from the database
        const posts = await Post.find();

        // Populate each post with its comments, sorted by createdAt in descending order
        const postsWithComments = await Promise.all(
            posts.map(async (post) => {
                const comments = await Comment.find({ postId: post._id }).sort({ createdAt: -1 });
                return { ...post.toObject(), comments };
            })
        );

        // Sort posts by createdAt timestamp in descending order (if needed)
        postsWithComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Send sorted posts with sorted comments as JSON response
        res.status(200).json(postsWithComments);
    } catch (err) {
        console.error('Error fetching posts with comments:', err);
        res.status(500).json({ message: 'Server error' });
    }
};



const getPostComments = async (req, res) => {
    const postId = req.params.postId;

    try {
        const comments = await Comment.find({ postId }).sort({ createdAt: 1 });
        res.status(200).json(comments);
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createPost,
    createComment,
    fetchPosts,
    getPostComments
};
