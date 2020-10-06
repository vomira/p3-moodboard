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

  // client.detectFaces(params, function(err, response) {
  //   if (err) {
  //     console.log(err, err.stack); // an error occurred
  //   } else {
  //     response.FaceDetails.forEach(data => {
  //       console.log("All other attributes:")
  //       console.log(`  Smile.Value:            ${data.Smile.Value}`)
  //       console.log(`  Smile.Confidence:       ${data.Smile.Confidence}`)
  //       console.log(`  Emotions[0].Type:       ${data.Emotions[0].Type}`)
  //       console.log(`  Emotions[0].Confidence: ${data.Emotions[0].Confidence}`)
  //       console.log(`  Confidence:             ${data.Confidence}`)
  //       console.log("------------")
  //       console.log("")
  //     }) // for response.faceDetails
  //   } // if
  // });

}

// rekognition.compareFaces(params, (err, data) => {
//   console.log("AWS received request")
//   if (err) return res.json({ message: "Sorry, that photo didn't come up as a match for the account holder."})

//   if (!data || !data.FaceMatches.length ) {
//     return res.json({ 
//       message: "Sorry, there aren't any faces in this photo that match the account holder." 
//     })
//   } else if (data.FaceMatches[0].Similarity > 95) {
//     console.log("face match successfuly")
//     return req.login(user, () => res.json(user))
//   }
// });

// }




// const detectFacesPromise = (img) => {
//   let b64 = img.split(",")[1];
//   const params = {
//     Image: {
//      Bytes: b64
//       },
//     "MaxLabels": 10,
//     "MinConfidence": 77
// }
// return new Promise(function(resolve, reject) {
//   rekognition.detectLabels(params, function(err, data) {
//     if(err !== null) reject(err);
//     else resolve(data.Labels)
//   })
// })
// }


// const s3UploadPromise = (username, img) => {
//   let b64 = img.split(",")[1];
//   const params = {
//     Bucket: AWS_bucketname,
//     Key: username, // File name you want to save as in S3
//     Body: b64,
//     ContentEncoding: "base64",
//     ContentType: "image/webp",
//   };
//   return new Promise(function(resolve, reject) {
//       s3.upload(params, function(err, data) {
//           if (err !== null) reject(err);
//           else resolve(data);
//       });
//   });
// }







  // rekognition.detectFaces(params, function(err, data) {
  // if (err) console.log(err, err.stack); // an error occurred
  // else     console.log(data);           // successful response
  
  // });

module.exports = { analyzeFace, compareFaces };
