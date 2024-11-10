import React, { useState } from 'react';
import { Shield, Search, CheckCircle, Award, ArrowRight, Globe, Users } from 'lucide-react';
import axios from 'axios';


const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dragging, setDragging] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [result, setResult] = useState(null);

  


  const features = [
    { icon: Shield, title: 'Instant Verification', description: 'Get real-time fact-checking and source verification for any content' },
    { icon: Search, title: 'Deep Analysis', description: 'Advanced AI analysis detects manipulation and verifies authenticity' },
    { icon: Globe, title: 'Global Database', description: 'Cross-reference against our vast database of verified sources' },
  ];

  const steps = [
    { number: '01', title: 'Paste Content', description: 'Share the content you want to verify' },
    { number: '02', title: 'Instant Analysis', description: 'Our AI analyzes authenticity and sources' },
    { number: '03', title: 'Get Results', description: 'Receive detailed verification report' },
  ];
  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!videoFile) {
      alert("Please upload a video file first.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-5xl font-bold mb-6">Verify Digital Content in Seconds</h1>
          <p className="text-xl mb-8 max-w-auto">
            TruthLens uses advanced AI to instantly verify content authenticity, check sources, and protect you from misinformation.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-lg p-2 max-w-auto flex shadow-lg mt-8">
            <input 
              type="text"
              placeholder="Paste an article, link, or upload content to verify..."
              className="flex-grow p-3 outline-none text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md flex items-center">
              Verify Now <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
          <br /><br /><br />
          {/* Drag-and-Drop Area and Upload Button */}
          <div 
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleFileDrop}
            className={`p-8 border-dashed border-4 rounded-lg ${dragging ? 'border-blue-400' : 'border-gray-300'} flex justify-between items-center bg-white`}
          >
            <p className="text-gray-600 flex-grow text-center">{dragging ? 'Drop the video here...' : 'Drag and drop a video file here to verify'}</p>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
              id="fileUpload"
            />
            <label htmlFor="fileUpload" className="bg-blue-600 text-white px-6 py-3 rounded-md cursor-pointer ml-4">
              Or Upload
            </label>
          </div>

          {/* Displaying Video File Name */}
          {videoFile && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-black shadow-lg">
              <h3 className="text-xl font-bold">Uploaded File</h3>
              <p>{videoFile.name}</p>
            </div>
          )}

          {/* Submit Button */}
          {videoFile && (
            <div className="mt-6">
              <button 
                onClick={handleSubmit} 
                className="bg-blue-600 text-white px-8 py-3 rounded-md"
              >
                Submit for Verification
              </button>
            </div>
          )}

          {/* Displaying Result */}
          {/* {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg color black">
              <h3 className="text-xl font-bold">Prediction Result</h3>
              <p>Prediction: {result.prediction}</p>
              <p>Probability: {result.probability}</p>
            </div>
          )} */}

          {/* Displaying Result */}
          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-black shadow-lg">
              <h3 className="text-xl font-bold text-gray-800">Prediction Result</h3>
              <p className="text-gray-800">Prediction: <span className="font-semibold">{result.prediction}</span></p>
              <p className="text-gray-800">Probability: <span className="font-semibold">{result.probability}</span></p>
            </div>
          )}


          

          {/* Trust Indicators */}
          <div className="flex gap-8 mt-12 items-center justify-center">
            <div className="flex items-center">
              <Users className="h-6 w-6 mr-2" />
              <span>100K+ Users Trust Us</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2" />
              <span>99.9% Accuracy Rate</span>
            </div>
            <div className="flex items-center">
              <Award className="h-6 w-6 mr-2" />
              <span>Award-Winning AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg shadow-lg bg-white p-6">
              <div className="text-6xl font-bold text-gray-100 absolute right-4 top-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Verification Tools</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="rounded-lg shadow-lg bg-white p-6 text-center">
                <feature.icon className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Verifying Content Today</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust TruthLens to verify digital content and fight misinformation.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-md font-bold">Get Started Free</button>
            <button className="border-2 border-white px-8 py-3 rounded-md font-bold">Watch Demo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;




// import React, { useState } from 'react';
// import { Shield, Search, CheckCircle, Award, ArrowRight, Globe, Users } from 'lucide-react';

// const LandingPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');

//   const features = [
//     { icon: Shield, title: 'Instant Verification', description: 'Get real-time fact-checking and source verification for any content' },
//     { icon: Search, title: 'Deep Analysis', description: 'Advanced AI analysis detects manipulation and verifies authenticity' },
//     { icon: Globe, title: 'Global Database', description: 'Cross-reference against our vast database of verified sources' },
//   ];

//   const steps = [
//     { number: '01', title: 'Paste Content', description: 'Share the content you want to verify' },
//     { number: '02', title: 'Instant Analysis', description: 'Our AI analyzes authenticity and sources' },
//     { number: '03', title: 'Get Results', description: 'Receive detailed verification report' },
//   ];

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
//         <div className="container mx-auto px-6 py-20">
//           <h1 className="text-5xl font-bold mb-6">Verify Digital Content in Seconds</h1>
//           <p className="text-xl mb-8 max-w-auto">
//             TruthLens uses advanced AI to instantly verify content authenticity, check sources, and protect you from misinformation.
//           </p>
          
//           {/* Search Bar */}
//           <div className="bg-white rounded-lg p-2 max-w-auto flex shadow-lg">
//             <input 
//               type="text"
//               placeholder="Paste an article, link, or upload content to verify..."
//               className="flex-grow p-3 outline-none text-gray-700"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button className="bg-blue-600 text-white px-6 py-3 rounded-md flex items-center">
//               Verify Now <ArrowRight className="ml-2 h-5 w-5" />
//             </button>
//           </div>
          
//           {/* Trust Indicators */}
//           <div className="flex gap-8 mt-12 items-center justify-center">
//             <div className="flex items-center">
//               <Users className="h-6 w-6 mr-2" />
//               <span>100K+ Users Trust Us</span>
//             </div>
//             <div className="flex items-center">
//               <CheckCircle className="h-6 w-6 mr-2" />
//               <span>99.9% Accuracy Rate</span>
//             </div>
//             <div className="flex items-center">
//               <Award className="h-6 w-6 mr-2" />
//               <span>Award-Winning AI</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="container mx-auto px-6 py-20">
//         <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {steps.map((step, index) => (
//             <div key={index} className="relative overflow-hidden rounded-lg shadow-lg bg-white p-6">
//               <div className="text-6xl font-bold text-gray-100 absolute right-4 top-4">
//                 {step.number}
//               </div>
//               <h3 className="text-xl font-bold mb-4">{step.title}</h3>
//               <p className="text-gray-600">{step.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Features Grid */}
//       <div className="bg-gray-50 py-20">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12">Powerful Verification Tools</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div key={index} className="rounded-lg shadow-lg bg-white p-6 text-center">
//                 <feature.icon className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
//                 <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="bg-blue-900 text-white py-20">
//         <div className="container mx-auto px-6 text-center">
//           <h2 className="text-3xl font-bold mb-6">Start Verifying Content Today</h2>
//           <p className="mb-8 max-w-2xl mx-auto">
//             Join thousands of users who trust TruthLens to verify digital content and fight misinformation.
//           </p>
//           <div className="flex gap-4 justify-center">
//             <button className="bg-white text-blue-900 px-8 py-3 rounded-md font-bold">Get Started Free</button>
//             <button className="border-2 border-white px-8 py-3 rounded-md font-bold">Watch Demo</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
