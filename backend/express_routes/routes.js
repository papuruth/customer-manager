const express = require('express');

const routes = express.Router();
const userController = require('../controllers/user-controller');

routes.get('/getusers', userController.getUsers);
routes.post('/adduser', userController.addUser);

module.exports = routes;