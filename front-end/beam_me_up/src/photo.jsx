import React, { useState } from "react";
import { takePhoto } from './camera.jsx';

const Photos = () => {
    const [showPhotoOptions, setShowPhotoOptions] = useState(false);
    const [photoURL, setPhotoURL] = useState(null);
    const [uploadMode, setUploadMode] = useState("none");
    const [showModal, setShowModal] = useState(false);

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
                setPhotoURL(reader.result);
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

    return (
        <div>
            {/* Button to toggle photo options */}
            {!showPhotoOptions && (
                <button onClick={() => setShowPhotoOptions(true)}>
                    Add Photo
                </button>
            )}

            {/* Show photo options if enabled */}
            {showPhotoOptions && (
                <div className="photo-options-container">
                    <select value={uploadMode} onChange={(e) => setUploadMode(e.target.value)}>
                        <option value="none">Do you want to post a photo with your mood?</option>
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
                </div>
            )}

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
};

export default Photos;