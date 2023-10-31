import React, { useRef, useState } from "react";
import "./Picture-in-Picture.css";

function PictureInPicture() {
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const startPictureInPicture = () => {
    setIsReady(true);

    navigator.mediaDevices
      .getDisplayMedia()
      .then((mediaStream) => {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().then(() => {
            // Start Picture-in-Picture if the browser supports it
            if (document.pictureInPictureEnabled) {
              videoRef.current.requestPictureInPicture();
            }
          });
        };
      })
      .catch((error) => {
        console.error("Error when using Picture-in-Picture:", error);
      })
      .finally(() => {
        setIsReady(false);
      });
  };

  return (
    <main>
      <section className="picture-in-picture">
        <video ref={videoRef} controls height="360" width="640" hidden></video>
        <div className="button__container">
          <button
            className="button__start-video"
            type="button"
            onClick={startPictureInPicture}
          >
            {isReady ? "Starting..." : "START"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default PictureInPicture;
