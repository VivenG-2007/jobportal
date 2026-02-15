import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    jobtype: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    requirements: {
        type: Array,
        required: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
        }
    ],
    position: {
        type: Number,
        required: true
    }
}, { timestamps: true },);

const Job = mongoose.model("Job", jobSchema);

export default Job;