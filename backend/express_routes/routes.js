const express = require('express');

const routes = express.Router();
const userController = require('../controllers/user-controller');

routes.get('/getusers', userController.getUsers);
routes.post('/login', userController.login)

module.exports = routes;