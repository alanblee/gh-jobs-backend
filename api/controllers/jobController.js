const Jobs = require("./helpers/jobHelper");

// GET - gets all saved jobs
module.exports.getAllJobs = async (req, res) => {
  let userId = Number(req.user.id);
  try {
    const allJobs = await Jobs.getJobs(userId);
    if (allJobs.length) {
      res.status(200).json(allJobs);
    } else {
      res.status(404).json({ message: "User does not have any saved jobs" });
    }
  } catch (err) {
    res.status(500).json({ message: "An error has occured", err: err.message });
  }
};

// DELETE
module.exports.deleteJob = async (req, res) => {
  const jobId = Number(req.params.id);
  const userId = Number(req.user.id);
  try {
    const [foundJob] = Jobs.findById(jobId);
    if (!foundJob) {
      res.status(404).json({ message: "Cannot find job with that id" });
    }
    if (Number(foundJob.user_id) === userId) {
      const [deletedJob] = Jobs.deleteJob(jobId);
      if (deletedJob) {
        res
          .status(200)
          .json({ message: `Job deleted with id of ${deletedJob}` });
      } else {
        res.status(404).json({ message: "Job not found with that ID" });
      }
    } else {
      res.status(404).json({ message: "Cannpt find job with that id" });
    }
  } catch (err) {
    res.status(500).json({ message: "An error has occured", err: err.message });
  }
};
