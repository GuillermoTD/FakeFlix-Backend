"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
//This is the router instance
const router = (0, express_1.Router)();
//These are the routes that we are configuring to auth in this app
router.post('/login', auth_controller_1.login);
router.post('/signin', auth_controller_1.signin);
exports.default = router;
