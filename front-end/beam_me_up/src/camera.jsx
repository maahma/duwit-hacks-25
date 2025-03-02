// camera.jsx
export const takePhoto = async (setPhotoURL, setShowModal) => {
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

        setShowModal(true)
      };
  
      setTimeout(takeSnapshot, 3000);
  
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };