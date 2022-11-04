const { default: mongoose } = require("mongoose");
const { isValidBody, isValidField } = require("./commonValidation");

const validateCreateBook = async (req, res, next) => {
  try {
    const data = req.body;
    const { title, description, authorName, bookPrice, category, isDeleted } =
      data;

    if (!isValidBody(data)) {
      return res.status(400).send({ status: false, message: "Missing data" });
    }
    if (!title) {
      return res.status(400).send({
        status: false,
        message: "Please provide title",
      });
    }
    if (!isValidField(title)) {
      return res.status(400).send({
        status: false,
        message: "Invalid Title",
      });
    }

    if (!description) {
      return res.status(400).send({
        status: false,
        message: "Please provide description",
      });
    }

    if (!isValidField(description)) {
      return res.status(400).send({
        status: false,
        message: "Invalid description",
      });
    }
    if (!authorName) {
      return res.status(400).send({
        status: false,
        message: "Please enter author name",
      });
    }

    if (!isValidField(authorName)) {
      return res.status(400).send({
        status: false,
        message: "Invalid author's name",
      });
    }

    if (!bookPrice) {
      return res.status(400).send({
        status: false,
        message: "Please enter book Price",
      });
    }

    if (isNaN(bookPrice)) {
      return res.status(400).send({
        status: false,
        message: "Invalid book price",
      });
    }

    if (!category) {
      return res
        .status(400)
        .send({ status: false, message: "category is required" });
    }

    if (!isValidField(category)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid Category" });
    }

    if (isDeleted && typeof isDeleted !== "boolean") {
      return res
        .status(400)
        .send({ status: false, message: "isDeleted is in wrong format" });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
  next();
};

const validateUpdateBook = async (req, res, next) => {
  try {
    const data = req.body;
    const { title, description, bookPrice, totalIssued, category } = data;

    if (!isValidBody(data)) {
      return res.status(400).send({ status: false, message: "Missing data" });
    }

    if (title && !isValidField(title)) {
      return res.status(400).send({
        status: false,
        message: "Invalid Title",
      });
    }

    if (description && !isValidField(description)) {
      return res.status(400).send({
        status: false,
        message: "Invalid description",
      });
    }

    if (bookPrice && isNaN(bookPrice)) {
      return res.status(400).send({
        status: false,
        message: "Invalid book price",
      });
    }

    if (totalIssued && isNaN(totalIssued)) {
      return res.status(400).send({
        status: false,
        message: "Invalid book's issue number",
      });
    }

    if (category && !isValidField(category)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid Category" });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
  next();
};
module.exports = { validateCreateBook, validateUpdateBook };
