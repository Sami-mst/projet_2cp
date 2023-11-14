const adminControl = require('../controllers/admin')
const express = require('express')
const router = express.Router()

router.post('/', adminControl.Login)
module.exports = router