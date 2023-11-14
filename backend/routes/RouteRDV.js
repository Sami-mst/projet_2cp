const express = require('express')
const router = express.Router()
const RDVControl = require('../controllers/RDV');
const usercontroler = require('../controllers/auth');
const adminControl = require('../controllers/admin');

router.post('/prise', usercontroler.Auth, RDVControl.prise);
router.get('/validate', RDVControl.decision);
router.get('/show', RDVControl.show);

module.exports = router;