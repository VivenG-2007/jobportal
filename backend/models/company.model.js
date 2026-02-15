import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    website: {
        type: String,
    },
    logo: {
        type: String, //url to company url
        default: "https://www.shutterstock.com/image-vector/vector-flat-illustration-default-avatar-600nw-2269550081.jpg"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true },);

const Company = mongoose.model("Company", companySchema);

export default Company;