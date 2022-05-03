// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')
var Busboy = require('busboy');

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
}).any('file', 1);

async function getFields(req) {
  var fields = {}
  return new Promise((resolve) => {
    const busboy = Busboy({ headers: req.headers });
    busboy.on('field', function (fieldname, val) {
      fields[fieldname] = val
    });
    busboy.on('finish', function () {
      resolve(fields);
    });
    req.pipe(busboy);
  });
}

export default async function handler(req, res) {
  

  const { method } = req;

  switch (method) {
    case 'GET':
      res.json({ method: 'GET', endpoint: 'Events' });
      break;
    case 'POST':
      await upload(req, res, function (error) {
        if (error) {
          console.log(error);
          res.json({msg: 'error'});
        }
      });

      const fields = await getFields(req)
      console.log(fields)

      console.log('File uploaded successfully.');
      res.json({msg: 'success'});

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