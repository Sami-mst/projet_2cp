const express = require('express')
const router = express.Router()
const feedbackControler = require('../controllers/feedback');
const userControler = require('../controllers/auth');
const adminControl = require('../controllers/admin')


router.post('/publish', userControler.Auth, feedbackControler.publish);
router.get('/show', feedbackControler.show);


module.exports = router;