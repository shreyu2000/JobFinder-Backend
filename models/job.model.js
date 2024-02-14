const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      index: true,
    },
    monthlySalary: {
      type: Number,
    },
    duration: {
      type: Number,
    },
    jobType: {
      type: String,
      enum: ["Full time", "Part time", "Contract", "Internship"],
      required: true,
    },
    remoteOffice: {
      type: String,
      enum: ["Remote", "Office", "Hybrid"],
      required: true,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    aboutCompany: {
      type: String,
    },
    skillsRequired: {
      type: [{
        type: String,
        lowercase: true,
      }],
      index: true,
      default: []
    },
    information: {
      type: String,
    },
    recruiter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Job= mongoose.model('Job', jobSchema);
module.exports = Job;
