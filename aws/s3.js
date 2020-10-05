const AWS = require("aws-sdk");
const AWS_key = process.env.AWS_ACCESS_KEY_ID;
const AWS_secret = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_region = process.env.AWS_REGION;
const AWS_bucketname = process.env.AWS_BUCKET;


const s3 = new AWS.S3({
  accessKeyId: AWS_key,
  secretAccessKey: AWS_secret,
  region: AWS_region,
});

const rekognition = new AWS.Rekognition({
  apiVersion: '2016-06-27',
  accessKeyId: AWS_key,
  secretAccessKey: AWS_secret,
  region: AWS_region,
});

const detectFacesPromise = (img) => {
  let b64 = img.split(",")[1];
  const params = {
    Image: {
     Bytes: b64
      },
    "MaxLabels": 10,
    "MinConfidence": 77
}
return new Promise(function(resolve, reject) {
  rekognition.detectLabels(params, function(err, data) {
    if(err !== null) reject(err);
    else resolve(data.Labels)
  })
})
}


const s3UploadPromise = (username, img) => {
  let b64 = img.split(",")[1];
  const params = {
    Bucket: AWS_bucketname,
    Key: username, // File name you want to save as in S3
    Body: b64,
    ContentEncoding: "base64",
    ContentType: "image/webp",
  };
  return new Promise(function(resolve, reject) {
      s3.upload(params, function(err, data) {
          if (err !== null) reject(err);
          else resolve(data);
      });
  });
}







  // rekognition.detectFaces(params, function(err, data) {
  // if (err) console.log(err, err.stack); // an error occurred
  // else     console.log(data);           // successful response
  
  // });

module.exports = { s3UploadPromise, detectFacesPromise };
