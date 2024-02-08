import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip, Grid, Container, Typography, TextField, Button, AppBar, Toolbar, Box } from '@mui/material';
import { Card, CardContent, CardActions, CardMedia } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StarIconOutlined from '@mui/icons-material/StarBorderOutlined';
import StarIconFilled from '@mui/icons-material/Star';

import axios from 'axios';
import Link from 'next/link';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/posts')
      .then(response => {
        console.log('Posts received:', response.data);
        setPosts(response.data);
        setFilteredPosts(response.data);
        fetchAuthors(response.data);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const fetchAuthors = async (posts) => {
    const authorIds = posts.map(post => post.authorId);
    const authorPromises = authorIds.map(authorId => axios.get(`http://localhost:3000/api/profiles/${authorId}`));

    try {
      const authorResponses = await Promise.all(authorPromises);
      const authors = authorResponses.map(response => response.data);

      const updatedPosts = posts.map((post, index) => {
        const author = authors.find(author => author.id === post.authorId);
        return { ...post, author: author.name };
      });

      setFilteredPosts(updatedPosts);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleSearch = () => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <Box>

      <AppBar position="fixed" sx={{ backgroundColor: '#e0484e' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cars.co.za
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Favourites</Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          height: '100vh',
          overflow: 'hidden',
          backgroundImage: "url('https://images.unsplash.com/photo-1607500422359-a8831901753b?q=80&w=1868&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          paddingTop: '64px',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            From New Beginnings to Classic Adventures <span style={{ display: 'block' }}> Find Your Car Here</span>
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <TextField
              label="Search for car brand, car model, year etc"
              variant="outlined"
              fullWidth
              placeholder="Enter search keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                backgroundColor: '#e0484e',
                color: '#fff',
                width: 'auto',
                '&:hover': {
                  backgroundColor: '#b0363b',
                },
                ml: 1,
              }}
            >
              Search
            </Button>

          </Box>
        </Container>
      </Box>

      <Box mt={4} mx="auto" maxWidth="lg" height="100vh" display="flex" flexDirection="column" justifyContent="center">
        <Typography
          variant="h5"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            color: 'black',
            mb: 4,
          }}
        >
          Featured vehicles
        </Typography>

        <Grid container spacing={4}>
          {filteredPosts.map(post => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="auto"
                  image="../assets/porsche.png"
                  alt="Porsche"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    <Link href={`/post/${post.authorId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {post.title}
                    </Link>
                  </Typography>
                  <Typography variant="body1" gutterBottom>By {post.author}</Typography>
                </CardContent>
                <CardActions>
                  <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"} arrow>
                    <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
                      {isFavorite ? <StarIconFilled sx={{ color: 'yellow' }} /> : <StarIconOutlined />}
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  );
}

export default Home;
