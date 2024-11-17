import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Project } from "../models/projectModel.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewProject = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler(" project Image  Required!!", 400));
  }
  const { projectBanner } = req.files;
  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    stack,
    deployed,
    technologies,
  } = req.body;
  if (
    !title ||
    !description ||
    !gitRepoLink ||
    !projectLink ||
    !stack ||
    !deployed ||
    !technologies
  ) {
    return next(new ErrorHandler("please fill all fields!!", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    projectBanner.tempFilePath,
    {
      folder: "PROJECT IMAGES",
    }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary Error"
    );
    return next(
      new ErrorHandler("Failed to upload project banner on cloudinary!", 500)
    );
  }
  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    stack,
    deployed,
    technologies,
    projectBanner: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  return res.status(200).json({
    success: true,
    message: "New Project added!!",
    project,
  });
});
export const deleteProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("project not found!!", 404));
  }
  const projectBannerId = project.projectBanner.public_id;
  await cloudinary.uploader.destroy(projectBannerId);
  await project.deleteOne();
  return res.status(200).json({
    success: true,
    message: "project is deleted successFully!!",
  });
});
export const updateProject = catchAsyncError(async (req, res, next) => {
  const newProjectdata = {
    title: req.body.title,
    description: req.body.description,
    gitRepoLink: req.body.gitRepoLink,
    projectLink: req.body.projectLink,
    stack: req.body.stack,
    deployed: req.body.deployed,
    technologies: req.body.technologies,
  };
  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;
    const project = await Project.findById(req.params);
    const projectBannerId = project.projectBanner.public_id;
    await cloudinary.uploader.destroy(projectBannerId);

    const cloudinaryResponse = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      {
        folder: "PROJECT IMAGES",
      }
    );
    newUserdata.projectBanner = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  const project = await Project.findByIdAndUpdate(req.user.id, newProjectdata, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });
  return res.status(200).json({
    success: true,
    message: "Project Updated!",
    project,
  });
});
export const getSingleProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!id) {
    return next(new ErrorHandler("Project not found!!", 400));
  }
  return res.status(200).json({
    success: true,
    project,
  });
});
export const getAllProject = catchAsyncError(async (req, res, next) => {
  const project = await Project.find();
  return res.status(200).json({
    success: true,
    project,
  });
});
