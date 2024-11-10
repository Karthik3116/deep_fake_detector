
require('dotenv').config();
// const mongoose = require('mongoose');
// const Creator = require('./models/creator'); // Assuming the model is in models/creator.js

// mongoose.connect(process.env.MONGODBURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');

//   // Create a new creator
//   const newCreator = new Creator({
//     username: 'rajeshtanguturi',
//     email: 'john@example.com',
//     password: 'securepassword123', // In practice, this should be hashed!
//     score: 50,
//     posts: [
//       {
//         title: 'My First Post',
//         description: 'This is the description of my first post.',
//         image: 'https://example.com/image.jpg',
//         video: 'https://example.com/video.mp4',
//         postScore: 10,
//         verified: true,
//       },
//       {
//         title: 'Another Post',
//         description: 'Description for another post.',
//         image: 'https://example.com/image2.jpg',
//         video: null,
//         postScore: 5,
//         verified: false,
//       },
//     ],
//   });

//   // Save the creator to the database
//   newCreator.save()
//     .then(creator => {
//       console.log('Creator saved:', creator);
//     })
//     .catch(error => {
//       console.error('Error saving creator:', error);
//     });
// }).catch(err => {
//   console.error('Error connecting to MongoDB:', err);
// });

// require('dotenv').config();
const mongoose = require('mongoose');
const Creator = require('./models/creator'); // Assuming the model is in models/creator.js
const fs = require('fs').promises;

async function loadDataAndInsert() {
    try {
        // Read and parse data from JSON file
        const data = await fs.readFile('creators.json', 'utf-8');
        const creatorsData = JSON.parse(data);  

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // Insert data into the database
        await Creator.insertMany(creatorsData);
        console.log("Data inserted successfully");
    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Close the MongoDB connection
        mongoose.connection.close();
    }
}

// Run the function
loadDataAndInsert();
