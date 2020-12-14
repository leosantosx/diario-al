import dotenv from 'dotenv'
import multerS3 from 'multer-s3'
import Aws, { S3 } from 'aws-sdk'
import crypto from 'crypto'

dotenv.config()

const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
})

export default ({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME!,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function(req, file, cb){
            cb(null, { fieldname: file.fieldname })
        },

        key: function(req, file, cb){
            const filename = `${crypto.randomBytes(10).toString('hex')}-${file.originalname}`
            cb(null, filename)
        }
    })
})