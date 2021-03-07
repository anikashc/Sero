import express from 'express'
import upload from '../services/upload.js'

const router = express.Router()

const singleUpload = upload.single('image')

router.get('', function(req, res) {
    
    res.send("ok");
})

router.post('', function(req, res) {
    
    singleUpload(req, res, function(error) {
        
        //const link = req.file.location;

        return res.json("ok");
    })
})

export default router