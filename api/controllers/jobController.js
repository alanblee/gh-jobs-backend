const Jobs = require("./helpers/jobHelper");

// GET - gets all saved jobs
module.exports.getAllJobs = async (req, res) => {
  try {
    const allJobs = await Jobs.getJobs();
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
