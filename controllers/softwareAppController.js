import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { SoftwareApplication } from "../models/softwareApplicationModel.js";
import { v2 as cloudinary } from "cloudinary";
export const addNewSoftwareApplication = catchAsyncError(
  async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(
        new ErrorHandler("Software Application icon/svg are required!!", 400)
      );
    }
    const { svg } = req.files;
    const { name } = req.body;
    if (!name) {
      new ErrorHandler("Software Name is  required!!", 400);
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      svg.tempFilePath,
      {
        folder: "PORTFOLIO_SOFTWARE_APPLICATIONS",
      }
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary Error"
      );
    }
    const softwareApplication = await SoftwareApplication.create({
      name,
      svg: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    return res.status(200).json({
      success: true,
      message: "New software application added!!",
      softwareApplication,
    });
  }
);

export const deleteSoftwareApplication = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const softwareApplication = await SoftwareApplication.findById(id);
    if (!softwareApplication) {
      new ErrorHandler("Software Application not found!!", 400);
    }
    const softwareApplicationSvgId = softwareApplication.svg.public_id;
    await cloudinary.uploader.destroy(softwareApplicationSvgId);
    await softwareApplication.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Software Application is deleted successFUlly!!",
    });
  }
);

export const getAllSoftwareApplication = catchAsyncError(
  async (req, res, next) => {
    const softwareApplications = await SoftwareApplication.find();
    return res.status(200).json({
      success: true,
      softwareApplications,
    });
  }
);
