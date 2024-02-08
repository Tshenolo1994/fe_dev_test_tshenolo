
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography, Tooltip, Button, TextField, Paper, IconButton, Grid, CardMedia } from '@mui/material';
import StarIconOutlined from '@mui/icons-material/StarBorderOutlined';
import StarIconFilled from '@mui/icons-material/Star';


const Post = () => {
    const router = useRouter();
    const { postId } = router.query;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (postId) {
                    const postResponse = await axios.get(`http://localhost:3000/api/posts/${postId}`);
                    setPost(postResponse.data);

                    const commentsResponse = await axios.get(`http://localhost:3000/api/posts/${postId}/comments`);
                    setComments(commentsResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        const storedFavoriteStatus = localStorage.getItem(`isFavorite_${postId}`);
        if (storedFavoriteStatus !== null) {
            setIsFavorite(storedFavoriteStatus === 'true');
        }
    }, [postId]);
    ;

    const handleAddComment = async () => {
        try {
            setComments([...comments, { text: newComment }]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };
    const handleFavoriteClick = () => {
        const newFavoriteStatus = !isFavorite;
        setIsFavorite(newFavoriteStatus);
        localStorage.setItem(`isFavorite_${postId}`, newFavoriteStatus.toString());
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: '12px', boxShadow: '0px 3px 6px #00000029' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>

                        <Grid item xs={12}>
                            <CardMedia
                                component="img"
                                height="auto"
                                image="../assets/porsche.png"
                                alt="Porsche"
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4" gutterBottom>{post.title}</Typography>
                        <Typography variant="body1" paragraph>{post.body}</Typography>
                        <Typography variant="body2" fontWeight="bold">By {post.author}</Typography>
                    </Grid>
                </Grid>

                <Typography variant="h5" mt={4}>Comments</Typography>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {comments.map((comment, index) => (
                        <li key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
                            {comment.text} - {comment.author}
                        </li>
                    ))}
                </ul>

                <TextField
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    variant="outlined"
                    fullWidth
                    label="Add a comment"
                    sx={{ marginTop: 2 }}
                />

                <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ marginTop: 4 }}>
                    <Box>

                        <Button
                            onClick={handleAddComment}
                            variant="contained"
                            color="primary"
                        >
                            Add Comment
                        </Button>
                    </Box>
                    <Box>

                        <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"} arrow>
                            <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
                                {isFavorite ? <StarIconFilled sx={{ color: 'yellow' }} /> : <StarIconOutlined />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Post;
