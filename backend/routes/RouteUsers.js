const express = require('express')
const router = express.Router()
const UserControler = require('../controllers/auth')
const EmailControler = require('../controllers/email')
router.post('/signup', UserControler.Create, EmailControler.Send_Confirmation_mail);
router.post('/login', UserControler.Login);
router.get('/verify_account', EmailControler.validate_account)
router.get('/password-reset', UserControler.Auth, EmailControler.password_reset_request)
router.use('/password-reset/:token', UserControler.Auth, EmailControler.change_pass)
module.exports = router