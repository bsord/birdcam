// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')
var Busboy = require('busboy');
var mongoose = require('mongoose');
var Events = require('../../models/event_model.js');
// Mongoose
mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

aws.config.update({
  secretAccessKey: process.env.S3_SECRETACCESSKEY,
  accessKeyId: process.env.S3_ACCESSKEYID,
  endpoint: process.env.S3_ENDPOINT
});

var s3 = new aws.S3();

var upload = multer({
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

async function getBodyData(req) {
  var fields = {}
  var files = []
  return new Promise((resolve) => {
    const busboy = Busboy({ headers: req.headers });
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      files[fieldname] = {fieldname: fieldname, filename: filename, encoding: encoding, mimetype: mimetype}
      file.on('data', function (data) {});
      file.on('end', function () {});
    });
    busboy.on('field', function (fieldname, val) {
      fields[fieldname] = val
    });
    busboy.on('finish', function () {
      resolve([fields,files]);
    });
    req.pipe(busboy);
  });
}

export default async function handler(req, res) {

  const { method } = req;

  switch (method) {


    case 'GET':
      Events.find({}, function (err, events) {
        if (err) {
          res.json({msg: 'error'});
        };
        res.json(events);
      })

      break;


    case 'POST':
      await upload(req, res, function (error) {
        if (error) {
          console.log(error);
          res.json({msg: 'error'});
        }
      });

      const [fields,files] = await getBodyData(req)
      
      const imagePath = 'https://' + process.env.S3_BUCKET + '.' + process.env.S3_ENDPOINT + '/' + files['image'].filename
      const videoPath = 'https://' + process.env.S3_BUCKET + '.' + process.env.S3_ENDPOINT + '/' + files['video'].filename

      Events.create({ image: imagePath, video: videoPath, date: Date.now(), message: fields.text }, function (err, event) {
        if (err) {
          res.json({msg: 'error'});
        };
        res.json({msg: 'success'});
      });

      
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}

export const config = {
  api: {
    bodyParser: false
  }
}