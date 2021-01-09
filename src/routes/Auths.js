const express= require('express');
const AuthController = require('../controllers/Auths')
const router = express.Router();

//CREATE => POST
router.post('/register', AuthController.register)

module.exports= router;