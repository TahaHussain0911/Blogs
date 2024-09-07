const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../errors");
const Blog = require("../models/Blog");
const mongoose = require("mongoose");
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(StatusCodes.OK).json(blogs);
  } catch (error) {
    throw new UnauthenticatedError(error.message);
  }
};

const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate("user");
    if (!blog) {
      res.status(StatusCodes.NOT_FOUND).send("No Blog Found");
    } else {
      res.status(StatusCodes.OK).json(blog);
    }
  } catch (error) {
    throw new UnauthenticatedError(error.message);
  }
};

const createBlog = async (req, res) => {
  const { body, user } = req;
  console.log(req.file, "req.files");
  try {
    const response = await Blog.create({
      ...body,
      image: req.file?.filename,
      user: user?.userId,
    });
    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    throw new UnauthenticatedError(error.message);
  }
};

const updateBlog = async (req, res) => {
  const { body, user, params } = req;
  try {
    let updateFields = { ...body };

    // Check if a new file is uploaded and update image field accordingly
    if (req.file) {
      updateFields.image = req.file.filename;
    }
    const response = await Blog.findByIdAndUpdate(
      params.id,
      updateFields,
      { new: true }
    );
    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    throw new UnauthenticatedError(error.message);
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req?.params;
  console.log(id);
  try {
    await Blog.findByIdAndDelete(id);
    res.status(StatusCodes.NO_CONTENT).send("Deleted Successfully");
  } catch (error) {}
};

module.exports = { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog };
