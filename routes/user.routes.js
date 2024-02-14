const express = require("express");
const router = express.Router();
const verifyJWT  = require("../middlewares/auth.middleware.js");
const { getUser, loginUser, registerUser } = require("../controllers/user.controller.js");

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', verifyJWT, getUser);

module.exports = router;
