import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommunityForum = () => {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [newCommentContent, setNewCommentContent] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/fetchPosts'); 
            const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPosts(sortedPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleAddPost = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authorization token not found');
        }
        try {
            const response = await axios.post('/api/posts', { content: newPostContent },
                {
                    headers: { Authorization: `Bearer ${token}`},
                }
            ); 
            const updatedPosts = [response.data, ...posts];
            setPosts(updatedPosts);
            setNewPostContent('');
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    const handleAddComment = async (postId) => {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authorization token not found');
        }
        try {
            const response = await axios.post(`/api/posts/${postId}/createComment`, { content: newCommentContent },
                {
                    headers: { Authorization: `Bearer ${token}`},
                }
            );
            const updatedPosts = posts.map(post =>
                post._id === postId ? { ...post, comments: [...(post.comments || []), response.data] } : post
            );
            setPosts(updatedPosts);
            setNewCommentContent('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
      
        <div className="container mx-auto mt-8 bg-white">
            <h1 className="text-3xl font-bold mb-4">Community Forum</h1>

            {/* Form to add new post */}
            <div className="mb-4">
                <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    rows="4"
                    placeholder="Write your post..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                />
                <button
                    className="mt-2 px-4 py-2 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600"
                    onClick={handleAddPost}
                >
                    Post
                </button>
            </div>

            {/* Display posts */}
            {posts.map(post => (
                <div key={post._id} className="mb-4 p-4 border border-gray-300 rounded-md shadow-md">
                    <p className="font-semibold">{post.content}</p>
                    <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p> {/* Display createdAt for post */}

                    <button
                        className="text-teal-500 hover:underline"
                        onClick={() => handleAddComment(post._id)}
                    >
                        Comments ({post.comments ? post.comments.length : 0})
                    </button>

                    {/* Display comments */}
                    {post.comments && post.comments.length > 0 && (
                        <div className="mt-2">
                            {post.comments.map(comment => (
                                <div key={comment._id} className="bg-gray-100 p-2 rounded-md shadow-inner">
                                    <p>{comment.content}</p>
                                    <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p> {/* Display createdAt for comment */}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Form to add new comment */}
                    <div className="mt-2">
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            rows="2"
                            placeholder="Write your comment..."
                            value={newCommentContent}
                            onChange={(e) => setNewCommentContent(e.target.value)}
                        />
                        <button
                            className="mt-2 px-4 py-2 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600"
                            onClick={() => handleAddComment(post._id)}
                        >
                            Add Comment
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommunityForum;
