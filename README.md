
## moodboard - giving you the content you feel like today
### https://p3moodboard.herokuapp.com/

For my final project I created an app which reads the users emotions via Face ID on login or signup and renders a personalized news feed if the user appears to be in a good mood and a feed with random jokes, gifs, advice and facts if the user seems to be in a bad mood.

I used Clarifai's face-detection model for verifying that there's a face present in the webcam-image taken for authentification and AWS Rekognition for face comparison (face authentification) and face/emotion analysis.

#### NOTE: Unfortunately, webcam only works on Chrome and IE for now. Safari refuses as the connection is not secure. Heroku only provides SSL on paid plans and as this is a study project, SSL was sacrificed 🔪

Built with React, HTML, CSS, Bootstrap, React-Webcam, AWS Rekognition API, Clarifai API
