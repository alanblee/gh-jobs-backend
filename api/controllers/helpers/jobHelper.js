const db = require("../../../data/dbConfig");

//Get all saved jobs
const getJobs = (userId) => {
  return db("jobs").where({ user_id: userId });
};

const findBy = (obj) => {
  return db("jobs").where(obj);
};

const findById = (jobId) => {
  return db("jobs").where({ id: jobId }).first();
};
//Delete saved job
const deleteJob = (jobId) => {
  return db("jobs").where({ id: jobId }).returning("id").del();
};
// Save the job post
const saveJobPost = async (jobInfo) => {
  const { job_post_id } = jobInfo;
  // check to see if job post is already saved
  const [existingJob] = await findBy({ job_post_id });
  if (existingJob) {
    // compare the id if found
    const compareId = await findById(Number(existingJob.id));
    if (Number(compareId.id) === Number(existingJob.id)) {
      return {
        message: "Job has already been saved",
      };
    }
  } else {
    try {
      const [newSavedJob] = await db("jobs").returning("id").insert(jobInfo);
      return findById(Number(newSavedJob));
    } catch (err) {
      throw err;
    }
  }
};

module.exports = {
  getJobs,
  findById,
  deleteJob,
  saveJobPost,
};
