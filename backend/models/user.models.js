import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phonenumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["jobseeker", "recruiter"],
        required: true,
    },
    profile: {
        bio: { type: String, },
        skills: [{ type: String }],
        resume: { type: String },//url to resume file;
        resumeoriginalname: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        profilephoto: {
            type: String,
            default: "",
        }
    }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;