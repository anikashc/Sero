import express from 'express'
import upload from '../services/upload.js'
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router()

const singleUpload = upload.single('image')

router.get('', function(req, res) {
    
    res.send("ok");
})

router.post('', function(req, res) {
    
    singleUpload(req, res, function(error) {

        console.log(req.file);

        return res.json(req.file.key);
    })
})

router.delete('', function(req, res) {

    const { key } = req.body;
    
    var bucketInstance = new AWS.S3();
    var params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
    };
    bucketInstance.deleteObject(params, function (err, data) {
        if (data) {
            res.send("File deleted successfully");
        }
        else {
            res.send("Check if you have sufficient permissions : " + err);
        }
    });
})

export default router