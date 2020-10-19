const AWS = require("aws-sdk");
const AWS_key = process.env.AWS_ACCESS_KEY_ID;
const AWS_secret = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_region = process.env.AWS_REGION;
const AWS_bucketname = process.env.AWS_BUCKET;


const rekognition = new AWS.Rekognition({
  apiVersion: '2016-06-27',
  accessKeyId: AWS_key,
  secretAccessKey: AWS_secret,
  region: AWS_region,
});


const compareFaces = (sourceImg, refImg) => {
let params = {
  SimilarityThreshold: 90, 
  SourceImage: {
    Bytes: Buffer.from(sourceImg, 'base64')
  }, 
  TargetImage: {
    Bytes: Buffer.from(refImg, 'base64')
  }
}

return new Promise((resolve, reject) => {
  rekognition.compareFaces(params, (err, data) => {
    if(err) reject(err);
    else resolve(data)
  })
}
)}

const analyzeFace = (refImg) => {
  const params = {
    Image: {
      Bytes: Buffer.from(refImg, 'base64')
    },
    Attributes: ['ALL']
  }

  return new Promise((resolve, reject) => {
    rekognition.detectFaces(params, (err, data) => {
      if(err) reject(err);
      else resolve(data);
    })
  })
}


module.exports = { analyzeFace, compareFaces };
