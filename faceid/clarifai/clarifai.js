const Clarifai = require('clarifai');

const clarifai = new Clarifai.App({
 apiKey: process.env.CLARIFAI_KEY
});


const faceDetection = (img) => {
  let b64 = img.split(',')[1];
  return clarifai.models.predict(Clarifai.FACE_DETECT_MODEL, {base64: b64})}


module.exports = faceDetection;