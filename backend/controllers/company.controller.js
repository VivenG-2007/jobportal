import Company from "../models/company.model.js";
export const registerCompany = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        let company = await Company.findOne({ name: name });
        if (company) {
            return res.status(400).json({
                message: "Company already exists, you can't register same company",
                success: false
            });
        }

        company = await Company.create({
            name: name,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company created successfully",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const company = await Company.find({ userId });
        if (!company) {
            return res.status(400).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company fetched successfully",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(400).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company fetched successfully",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location, logo } = req.body;
        const updatedata = { name, description, website, location, logo };
        const company = await Company.findByIdAndUpdate(req.params.id, updatedata, { returnDocument: 'after' });
        if (!company) {
            return res.status(400).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company updated successfully",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findByIdAndDelete(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company deleted successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}