This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

moodboard - giving you the content you feel like today

For my final project I created an app which reads the users emotions via Face ID on login or signup and renders a personalized news feed if the user appears to be in a good mood and a feed with random jokes, gifs, advice and facts if the user seems to be in a bad mood.

I used Clarifai's face-detection model for verifying that there's a face present in the webcam-image taken for authentification and AWS Rekognition for face comparison (face authentification) and face/emotion analysis.

