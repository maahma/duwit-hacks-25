import React, { useState } from 'react';
<<<<<<< HEAD
import logo from './logo.svg';
import logo_heart from './heart.svg';
=======
import logo from './heart.svg';
>>>>>>> photo-create
import './App.css';
import { takePhoto } from './camera.jsx';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI('AIzaSyC7hsFMssBldoRVYYwJAnnGNbyzbjCqebA');

function App() {
  const [photoURL, setPhotoURL] = useState(null);
  const [uploadMode, setUploadMode] = useState("none");
  const [showModal, setShowModal] = useState(false);
  const [uploadOption, setUploadOption] = useState("");
  const [mood, setMood] = useState("");
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTakePhoto = () => {
    if (uploadMode === "photo") {
      takePhoto(setPhotoURL, setShowModal);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        setPhotoURL(base64data);
        setShowModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    console.log("Uploading photo...");
    setShowModal(false);
  };

  const handleRetake = () => {
    setPhotoURL(null);
    setShowModal(false);
    handleTakePhoto();
  };

  const handleMoodSubmit = async () => {
    if (!mood.trim()) {
      setError("Please enter your mood before requesting advice.");
      return;
    }
  
    setIsLoading(true);
    setError("");
    setAdvice("");
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});
  
      const prompt = `The user is feeling ${mood}. Please provide a short, positive, and encouraging piece of advice to help improve their mood. Keep the response under 100 words.`;
  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
  
      setAdvice(text);
    } catch (error) {
      console.error('Error fetching advice:', error);
      setError("Sorry, I couldn't get advice at this time. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="App">
      <header className="App-header">

      <img src={logo} className="App-logo" alt="logo" />
        <p>Mood selection here:）</p>
        <select value={uploadMode} onChange={(e) => setUploadMode(e.target.value)}>
          <option value="none">Do you want to take a photo</option>
          <option value="none">Nope, I don't have mood</option>
          <option value="photo">Take Photo and Upload</option>
          <option value="file">Upload from Folder</option>
        </select>
        <div>
           {uploadMode === "photo" && (
            <button className="App-link" onClick={handleTakePhoto}>
              Take Photo
            </button>
          )}
          {uploadMode === "file" && (
            <input type="file" accept="image/*" onChange={handleFileChange} />
          )}
        </div>
        <div className="mood-section">
          <h2>How are you feeling today?</h2>
          <div className="mood-input">
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="Enter your mood"
              className="mood-text-input"
            />
            <button 
              onClick={handleMoodSubmit} 
              disabled={isLoading}
              className="mood-submit-button"
            >
              {isLoading ? 'Getting Advice...' : 'Get Advice'}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
          {advice && (
            <div className="advice-section">
              <h3 >Here's some advice for you:</h3>
              <p className="advice-text">{advice}</p>
            </div>
          )}
        </div>
      </header>
      {showModal && photoURL && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Photo Preview</h2>
            <img src={photoURL} alt="Selected" className="modal-image" />
            <div className="modal-buttons">
              <button onClick={handleUpload}>Upload</button>
              <button onClick={handleRetake}>Retake</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default App;

// import React, { useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { takePhoto } from './camera.jsx';

// function App() {
//   const [photoURL, setPhotoURL] = useState(null);
//   const [uploadMode, setUploadMode] = useState("none");
//   const [showModal, setShowModal] = useState(false);

//   const handleTakePhoto = () => {
//     if (uploadMode === "photo") {
//       takePhoto(setPhotoURL, setShowModal);
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64data = reader.result;
//         setPhotoURL(base64data);
//         setShowModal(true);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUpload = () => {
//     console.log("Uploading photo...");
//     setShowModal(false);
//   };

//   const handleRetake = () => {
//     setPhotoURL(null);
//     setShowModal(false);
//     handleTakePhoto();
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>Mood selection here:）</p>
//         <select value={uploadMode} onChange={(e) => setUploadMode(e.target.value)}>
//           <option value="none">Do you want to take a photo</option>
//           <option value="none">Nope, I don't have mood</option>
//           <option value="photo">Take Photo and Upload</option>
//           <option value="file">Upload from Folder</option>
//         </select>
//         <div>
//           {uploadMode === "photo" && (
//             <button className="App-link" onClick={handleTakePhoto}>
//               Take Photo
//             </button>
//           )}
//           {uploadMode === "file" && (
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//           )}
//         </div>
//       </header>
//       {showModal && photoURL && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setShowModal(false)}>&times;</span>
//             <h2>Photo Preview</h2>
//             <img src={photoURL} alt="Selected" className="modal-image" />
//             <div className="modal-buttons">
//               <button onClick={handleUpload}>Upload</button>
//               <button onClick={handleRetake}>Retake</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// ---------------------------


// import React, { useState } from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   const [photoURL, setPhotoURL] = useState(null);
//   const [uploadMode, setUploadMode] = useState("none");

//   const handleTakePhoto = async () => {
//     if (uploadMode === "photo") {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         const videoElement = document.createElement('video');
//         videoElement.srcObject = stream;
//         videoElement.play();

//         document.body.appendChild(videoElement);

//         videoElement.onloadedmetadata = () => {
//           videoElement.width = 640;
//           videoElement.height = 480;
//         };

//         const takeSnapshot = () => {
//           const canvas = document.createElement('canvas');
//           canvas.width = videoElement.videoWidth;
//           canvas.height = videoElement.videoHeight;
//           const context = canvas.getContext('2d');
//           context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

//           const dataUrl = canvas.toDataURL('image/png');
//           setPhotoURL(dataUrl);

//           stream.getTracks().forEach(track => track.stop());
//           document.body.removeChild(videoElement);

//           if (window.confirm('Do you want to upload the photo?')) {
//             handleUpload(dataUrl);
//           }
//         };

//         setTimeout(takeSnapshot, 3000);

//       } catch (error) {
//         console.error('Error accessing the camera:', error);
//       }
//     }
//   };

//   const handleUpload = (dataUrl) => {
//     // Example upload function
//     console.log('Uploading photo');
//     // Add logic to upload photo to your server
//     // This would typically be a fetch or axios POST request
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64data = reader.result;
//         setPhotoURL(base64data);
//         if (window.confirm('Do you want to upload the photo?')) {
//           handleUpload(base64data);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>Mood selection here：）</p>
//         <select value={uploadMode} onChange={(e) => setUploadMode(e.target.value)}>
//           <option value="none">Do you want to take a photo</option>
//           <option value="none">Nope, I don't have mood</option>
//           <option value="photo">Take Photo and Upload</option>
//           <option value="file">Upload from Folder</option>
//         </select>
//         <div>
//           {uploadMode === "photo" && (
//             <button className="App-link" onClick={handleTakePhoto}>
//               Take Photo
//             </button>
//           )}
//           {uploadMode === "file" && (
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//           )}
//         </div>
//         {/* <div>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             start your journey from here~
//           </a>
//         </div> */}
//       </header>
//       {photoURL && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setPhotoURL(null)}>&times;</span>
//             <h2>Beam me uppppp</h2>
//             <img src={photoURL} alt="Selected" className="modal-image" />
//             <a href={photoURL} download="photo.png">Download Photo</a>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

