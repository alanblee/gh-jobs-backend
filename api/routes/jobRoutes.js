const express = require("express");
const router = express.Router();
const jobCtrl = require("../controllers/jobController");

// GET - gets all saved jobs
router.route("/").get(jobCtrl.getAllJobs);
// DELETE - deletes a saved job
router.route("/:id").delete(jobCtrl.deleteJob);
// POST - saves a new job
router.route("/").post(jobCtrl.saveJob);

module.exports = router;
