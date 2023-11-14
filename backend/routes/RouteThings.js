/* const express = require('express')
const router = express.Router()
const ThingControl=require('../controllers/things');
const UserControler=require('../controllers/auth')

router.get('/:id',UserControler.Auth, ThingControl.ShowOneThing)

router.get('/',UserControler.Auth,ThingControl.Showthings);
router.post('/',UserControler.Auth,ThingControl.PostOne);
router.put('/:id',UserControler.Auth,ThingControl.UpdateOne);
router.delete('/:id',UserControler.Auth,ThingControl.DeleteOne);
module.exports=router; */