const express = require('express');
const route = express.Router();

const authencationController = require('./../src/controller/AutheController'); 

// đăng nhập 
route.post('/login' , authencationController.login)

// Tạo tài khoản 
route.post('/create' , authencationController.create)

// Lấy lại access token bằng refresh token 
route.post('/token' , authencationController.token) 

module.exports = route;