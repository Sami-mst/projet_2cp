const express = require('express')
const router = express.Router()
const articleControl = require('../controllers/article');

router.post('/', articleControl.publish);
module.exports = router;