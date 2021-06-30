const express = require('express');
const route = express.Router();

const userController = require('./../src/controller/UserController'); 
const verifyToken = require('../src/middleware/AuthenToken');

route.get('/' ,verifyToken,userController.getUser);

module.exports = route;