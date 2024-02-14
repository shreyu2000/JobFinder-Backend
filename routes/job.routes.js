const express = require("express");
const router = express.Router();
const { addJobPost, editJobPost, getAllJobPost, getJobPost } = require("../controllers/job.controller.js");
const  verifyJWT  = require("../middlewares/auth.middleware.js");

router.get("/", getAllJobPost);
router.get("/:jobId", getJobPost);

// Protected/Secured Routes
router.post("/", verifyJWT, addJobPost);
router.put("/:jobId", verifyJWT, editJobPost);

module.exports = router;
