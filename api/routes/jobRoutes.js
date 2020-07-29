const express = require("express");
const router = express.Router();
const jobCtrl = require("../controllers/jobController");

// GET - gets all saved jobs
router.route("/").get(jobCtrl.getAllJobs);
