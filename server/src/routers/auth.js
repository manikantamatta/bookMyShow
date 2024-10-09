const express = require('express');
const routers = express.Router();
const auth_controller = require('../controllers/auth');

routers.post('/',auth_controller.login);
routers.post('/business',auth_controller.loginBusiness);

module.exports = routers;