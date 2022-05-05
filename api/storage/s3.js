var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

aws.config.update({
  secretAccessKey: process.env.S3_SECRETACCESSKEY,
  accessKeyId: process.env.S3_ACCESSKEYID,
  endpoint: process.env.S3_ENDPOINT
});

var s3 = new aws.S3();

exports.upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: 'public-read',
    key: function (request, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    }
  })
}).fields([
  {name:'image', maxCount: 1},
  {name:'video', maxCount: 1}
]);