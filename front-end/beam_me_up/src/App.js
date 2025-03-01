import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [photoURL, setPhotoURL] = useState(null);
  const [uploadMode, setUploadMode] = useState("none");

  const handleTakePhoto = async () => {
    if (uploadMode === "photo") {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoElement = document.createElement('video');
        videoElement.srcObject = stream;
        videoElement.play();

        document.body.appendChild(videoElement);

        videoElement.onloadedmetadata = () => {
          videoElement.width = 640;
          videoElement.height = 480;
        };

        const takeSnapshot = () => {
          const canvas = document.createElement('canvas');
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          const context = canvas.getContext('2d');
          context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

          const dataUrl = canvas.toDataURL('image/png');
          setPhotoURL(dataUrl);

          stream.getTracks().forEach(track => track.stop());
          document.body.removeChild(videoElement);

          if (window.confirm('Do you want to upload the photo?')) {
            handleUpload(dataUrl);
          }
        };

        setTimeout(takeSnapshot, 3000);

      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    }
  };

  const handleUpload = (dataUrl) => {
    // Example upload function
    console.log('Uploading photo');
    // Add logic to upload photo to your server
    // This would typically be a fetch or axios POST request
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        setPhotoURL(base64data);
        if (window.confirm('Do you want to upload the photo?')) {
          handleUpload(base64data);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Mood selection here：）</p>
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
        {/* <div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            start your journey from here~
          </a>
        </div> */}
      </header>
      {photoURL && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setPhotoURL(null)}>&times;</span>
            <h2>Beam me uppppp</h2>
            <img src={photoURL} alt="Selected" className="modal-image" />
            <a href={photoURL} download="photo.png">Download Photo</a>
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
//         <p>Mood selection here:）</p>
//         <select value={uploadMode} onChange={(e) => setUploadMode(e.target.value)}>
//           <option value="none">Do you want to take a photo</option>
//           <option value="none">Nope, I dont have mood</option>
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
//         <div>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//           start your journey from here~
//         </a></div>
//         {photoURL && (
//           <div>
//             <h2>Your Photo</h2>
//             <img src={photoURL} alt="Selected" />
//             <a href={photoURL} download="photo.png">Download Photo</a>
//           </div>
//         )}
//       </header>
//     </div>
//   );
// }

// export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Mood selection here:）
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           submitted!
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;