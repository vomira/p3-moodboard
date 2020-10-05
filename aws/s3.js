const AWS = require('aws-sdk');
const AWS_key = process.env.AWS_ACCESS_KEY_ID;
const AWS_secret = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_region = process.env.AWS_REGION;
const AWS_bucketname = process.env.AWS_BUCKET;



const s3Bucket = new AWS.S3(
  { params: {
    Bucket: AWS_bucketname,
    accessKeyId: AWS_key, 
    secretAccessKey: AWS_secret, 
    region: 'us-west-2'
}
 } );

const s3UploadPicture = (img) => {

  let b64 = img.split(',')[1];
  var data = {
    Key: user._id, 
    Body: b64,
    ContentEncoding: 'base64',
    ContentType: 'image/webp'
  };

new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise()
.then(data => {
  console.log("Successfully uploaded data to " + AWS_bucketName + "/" + user._id);
})
.catch(err => console.log(err));

};

module.exports = s3UploadPicture;