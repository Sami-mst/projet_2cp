const express = require('express')
const router = express.Router()
const changeControl = require('../controllers/changepass');
const auth = require('../controllers/auth');

router.post('/', auth.Auth, changeControl.change);
module.exports = router;