const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Post schema
const postSchema = new Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true, // automatically generate ObjectId for posts
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String, // URL or path to image
    default: null,
  },
  video: {
    type: String, // URL or path to video
    default: null,
  },
  postScore: {
    type: Number,
    default: 0,
  },
  summary: {
    type: String,
    default: null,
  },
  verified: {
    type: Boolean,
    default: false,
  },
 
}, {
  timestamps: true,
});

// Define the Creator schema
const creatorSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure the username is unique
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique
    lowercase: true,
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum password length
  },
  score: {
    type: Number,
    default: 0, // Default score for the creator
  },
  posts: [postSchema], // Array of posts
});

// Create the Creator model
const Creator = mongoose.model('Creator', creatorSchema);

module.exports = Creator;
