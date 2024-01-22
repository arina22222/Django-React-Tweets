import React, { useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';

const AboutMe = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const loadModel = async () => {
    setLoading(true);

    // Load the MobileNet model
    const model = await mobilenet.load();

    // Make a prediction on the provided image
    const imgElement = document.getElementById('uploaded-image');
    const predictions = await model.classify(imgElement);

    // Check if the predictions contain 'cat' or 'dog'
    const isCat = predictions.some((result) => result.className.includes('cat'));
    const isDog = predictions.some((result) => result.className.includes('dog'));

    // Set the prediction result
    if (isCat) {
      setPrediction('It\'s a cat!');
    } else if (isDog) {
      setPrediction('It\'s a dog!');
    } else {
      setPrediction('Unable to determine.');
    }

    setLoading(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  return (
    <div className="CatDogClassifier">
      <h1 className="classifier-heading">Cat or Dog Classifier</h1>
      <input className="image-input" type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <>
          <img className="uploaded-image" src={image} alt="Uploaded" width="300" />
          <button className="classify-button" onClick={loadModel} disabled={loading}>
            {loading ? 'Loading Model...' : 'Classify'}
          </button>
          {prediction && (
            <div className="prediction-container">
              <h2 className="prediction-heading">Prediction:</h2>
              <p className="prediction-text">{prediction}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
  
};

export default AboutMe;
