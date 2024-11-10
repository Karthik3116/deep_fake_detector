// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import LandingPage from './components/LandingPage'
// import EnhancedPlatform from './components/EnhancedPlatform'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <EnhancedPlatform />
//      {/* <LandingPage /> */}

//     </>
//   //   <div className="flex min-h-screen items-center justify-center bg-gray-100">
//   //   <div className="max-w-md rounded-lg bg-white p-6 shadow-lg">
//   //     <h1 className="text-2xl font-bold text-gray-800">Hello, Tailwind CSS!</h1>
//   //     <p className="mt-4 text-gray-600">
//   //       This is a simple component to test Tailwind CSS setup in your Vite + React app. If you see this styled text, Tailwind is working!
//   //     </p>
//   //     <button className="mt-6 w-full rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600">
//   //       Test Button
//   //     </button>
//   //   </div>
//   // </div>
//   )
// }

// export default App


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import CreatorDashboard from './components/CreatorDashboard';
// import PostPage from './components/PostPage';
// import LandingPage from './components/LandingPage'

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<LandingPage />} />
//         <Route path='/news' element={<EnhancedPlatform />} />
//         <Route path="/creator" element={<CreatorDashboard />} />
//         <Route path="/post/:type" element={<PostPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatorDashboard from './components/CreatorDashboard';
import PostPage from './components/PostPage';
import LandingPage from './components/LandingPage'
import EnhancedPlatform from './components/EnhancedPlatform';
import Nav from './components/Nav';


function App() {
  return (
    <Router>
      <Nav/>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/news" element={<EnhancedPlatform />} />
        <Route path="/creator" element={<CreatorDashboard />} />
        <Route path="/post/:type" element={<PostPage />} />
      </Routes>

    </Router>
  );
}

export default App;
