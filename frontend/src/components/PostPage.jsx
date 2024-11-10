import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostPage = () => {
  const { type } = useParams();
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [article, setArticle] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [score, setScore] = useState(0);
  const [verified, setVerified] = useState(false);
  const [response, setResponse] = useState(null);
  const [response2, setResponse2] = useState(null);
  const [videopath, setVideopath] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const formData = new FormData();

    if (type === 'image' && image) {
      formData.append('image', image)
      try {
        const res = await axios.post('http://localhost:8080/verify_image_article', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log("i have pressed a button");
        const postData = {
          videopath,
          videoTitle,
          username: "vstuart2",
          description,
          score: Math.floor(res.probability * 100),
          verified: res.prediction === "Fake" ? false : true,
        };
        try {
          await axios.post('http://localhost:3000/creatorpost/image', postData, {
            headers: { 'Content-Type': 'application/json' }
          });
          setResponse2((Response) => ({
            ...Response,
            success: 'Data posted to MongoDB successfully!',
          }));
          setVideoTitle('');
          setVideo('');
          setVideopath('');

        } catch (error) {
          console.error('Error posting data:', error);
          setResponse({ error: 'Failed to submit data' });
        }
      } catch (error) {
        console.error('Error posting data from model:', error);
        setResponse({ error: 'Failed to submit data from model' });
      }

    };

    if (type === 'video' && video) {
      formData.append('video', video);
      try {
        const res = await axios.post('http://127.0.0.1:5000/predict', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log("i have pressed a button");
        const postData = {
          videopath,
          videoTitle,
          username: "vstuart2",
          description,
          score: Math.floor(res.probability * 100),
          verified: res.prediction === "Fake" ? false : true,
        };
        try {
          await axios.post('http://localhost:3000/creatorpost', postData, {
            headers: { 'Content-Type': 'application/json' }
          });
          setResponse2((Response) => ({
            ...Response,
            success: 'Data posted to MongoDB successfully!',
          }));
          setVideoTitle('');
          setVideo('');
          setVideopath('');

        } catch (error) {
          console.error('Error posting data:', error);
          setResponse({ error: 'Failed to submit data' });
        }
      } catch (error) {
        console.error('Error posting data from model:', error);
        setResponse({ error: 'Failed to submit data from model' });
      }


    }

    if (type === 'text' && article) {
      formData.append('user_article', article);
      try {
        const res = await axios.post('http://localhost:8080/verify_article', { user_article: article }, {
          headers: { 'Content-Type': 'application/json' }
        });
        const postData = {
          videopath,
          videoTitle,
          username: "vstuart2",
          description: article,
          postScore: res.data.authenticity_score,
          verified: res.data.authenticity_score <= 50 ? false : true,
          summary: res.data.summary,
        };
        console.log('postdata', postData);

        try {
          await axios.post('http://localhost:3000/creatorposttext', postData, {
            headers: { 'Content-Type': 'application/json' }
          });
          setResponse2((Response) => ({
            ...Response,
            success: 'Data posted to MongoDB successfully!',
          }));
          setVideoTitle('');
          setArticle('');
        } catch (error) {
          console.error('Error posting data:', error);
          setResponse({ error: 'Failed to submit data' });
        }
      } catch (error) {
        console.error('Error posting data from model:', error);
        setResponse({ error: 'Failed to submit data from model' });
      }
    }

    setIsLoading(false); // End loading
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Submit Your {type.charAt(0).toUpperCase() + type.slice(1)}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'video' && (
            <div className="flex flex-col">
              <label className="text-lg">Title</label>
              <textarea
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="p-2 border rounded"
                rows="1"
              />
              <label className="text-lg">Upload Video</label>
              <input type="file"accept="video/*"  onChange={(e) => {
                setVideo(e.target.files[0]);
                if (e.target.files[0]) {
                  setVideopath(e.target.files[0].name);
                }
              }} className="p-2 border rounded" />
              {video && video.name && (
                <p className="text-sm mt-2">Selected File: {video.name}</p>
              )}
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          )}

          {type === 'image' && (
            <div className="flex flex-col">
              <label className="text-lg">Title</label>
              <textarea
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="p-2 border rounded"
                rows="1"
              />
              <label className="text-lg">Upload Video</label>
              <input type="file"   onChange={(e) => {
                setImage(e.target.files[0]);
                if (e.target.files[0]) {
                  setVideopath(e.target.files[0].name);
                }
              }} className="p-2 border rounded" />
              {video && video.name && (
                <p className="text-sm mt-2">Selected File: {video.name}</p>
              )}
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </div>

          )}

          {type === 'text' && (
            <div className="flex flex-col">
              <label className="text-lg">Title</label>
              <textarea
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="p-2 border rounded"
                rows="1"
              />
              <label className="text-lg">Article</label>
              <textarea
                value={article}
                onChange={(e) => setArticle(e.target.value)}
                className="p-2 border rounded"
                rows="6"
              />
            </div>
          )}

          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {response2 && (
          <div className="mt-6">
            {response2.error ? (
              <p className="text-red-600">{response.error}</p>
            ) : (
              <p className="text-green-600">Post submitted successfully!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;


