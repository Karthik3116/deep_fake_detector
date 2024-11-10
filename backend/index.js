require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Creator = require('./models/creator'); 


const app = express();

app.use(express.json());
app.use(cors({}));

app.get('/api/creators', async (req, res) => {
  
  try {
    const creators = await Creator.find();
    res.json(creators);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data from database' });
  }
});

function timeAgo(timestamp) {
  const now = new Date();
  const time = new Date(timestamp);
  const secondsAgo = Math.floor((now - time) / 1000);

  if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
  } else {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
  }
}

app.get("/api/posts", async (req, res) => {
  console.log('got request for posts ')
  try {
    // Fetch all creators along with their posts
    const creators = await Creator.find().sort({ score: -1 });

    // Map through each creator and their posts
    const postsWithCreatorDetails = creators.flatMap((creator) => {
    const sortedPosts = creator.posts.sort((a, b) => b.createdAt - a.createdAt);
      return sortedPosts.map((post) => ({
        ...post.toObject(),
        creator: {
          username: creator.username,
          score: creator.score,
        },
          timesago : timeAgo(post.createdAt)
      }));
    });

    res.json(postsWithCreatorDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/creatorpost', async (req, res) => {
  try {
    const { videopath, videoTitle, username, description, score, verified } = req.body;
    console.log(req.body);

    // Find the creator (user) by username
    let creator = await Creator.findOne({ username });

    if (!creator) {
      return res.status(404).json({ error: 'Creator not found' });
    }

    // Create a new post
    const newPost = {
      title: videoTitle,
      description:'',
      video: videopath,  // You can save the path or URL here
      postScore: score,
      verified,
    };

    // Add the new post to the creator's posts array
    creator.posts.push(newPost);

    const totalScore = creator.posts.reduce((sum, post) => sum + post.postScore, 0);
    const averageScore = totalScore / creator.posts.length;

    creator.score = Math.round(averageScore);
    // Save the creator with the new post
    await creator.save();

    // Send a success response
    res.status(200).json({ success: 'Post added successfully', post: newPost });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'Failed to save post' });
  }
});
app.post('/creatorpost/image', async (req, res) => {
  try {
    const { videopath, videoTitle, username, description, score, verified } = req.body;
    console.log(req.body);

    // Find the creator (user) by username
    let creator = await Creator.findOne({ username });

    if (!creator) {
      return res.status(404).json({ error: 'Creator not found' });
    }

    // Create a new post
    const newPost = {
      title: videoTitle,
      description:'',
      image: videopath,  // You can save the path or URL here
      postScore: score,
      verified,
    };

    // Add the new post to the creator's posts array
    creator.posts.push(newPost);

    const totalScore = creator.posts.reduce((sum, post) => sum + post.postScore, 0);
    const averageScore = totalScore / creator.posts.length;

    creator.score = Math.round(averageScore);
    // Save the creator with the new post
    await creator.save();

    // Send a success response
    res.status(200).json({ success: 'Post added successfully', post: newPost });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'Failed to save post' });
  }
});
app.post('/creatorposttext', async (req, res) => {
  const { username, videoTitle, description, video, postScore, summary, verified } = req.body;

  try {
    // Find the creator by username
    const creator = await Creator.findOne({ username });
    if (!creator) {
      return res.status(404).json({ error: 'Creator not found' });
    }

    // Create a new post object
    const newPost = {
      title:videoTitle,
      description,
      video,
      postScore,
      summary,
      verified,
    };

    // Add the new post to the creator's posts array
    creator.posts.push(newPost);
    const totalScore = creator.posts.reduce((sum, post) => sum + post.postScore, 0);
    const averageScore = totalScore / creator.posts.length;

    creator.score = Math.round(averageScore);
    await creator.save();

    res.status(200).json({ success: 'Post added successfully!', post: newPost });
  } catch (error) {
    console.error('Error adding post:', error);
    res.status(500).json({ error: 'Failed to add post' });
  }
});


mongoose.connect(process.env.MONGODBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});