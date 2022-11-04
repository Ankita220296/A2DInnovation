const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const { isValidBody, isValidField } = require("./commonValidation");

const isValidEmail = (email) =>
  /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email);

const isValidPassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,15}$/.test(
    password
  );

// Validation for create user
const validateCreateUser = async (req, res, next) => {
  try {
    const data = req.body;
    const { fName, lName, password } = data;
    let { email } = data;

    if (!isValidBody(data)) {
      return res.status(400).send({ status: false, message: "Missing data" });
    }

    if (!fName) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter first name" });
    }

    if (!isValidField(fName)) {
      return res.status(400).send({
        status: false,
        message: "Invalid first name",
      });
    }

    if (!lName) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter last name" });
    }

    if (!isValidField(lName)) {
      return res.status(400).send({
        status: false,
        message: "Invalid last name",
      });
    }

    if (!email) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter email" });
    }

    email = email.toLowerCase();
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Email is not valid" });
    }

    if (!password) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter password" });
    }

    if (!isValidPassword(password)) {
      return res.status(400).send({
        status: false,
        message:
          "Please enter valid password with one uppercase, lowercse and special character. Password length should be 8 to 15",
      });
    }

    const existEmail = await userModel.findOne({ email });
    if (existEmail) {
      return res
        .status(400)
        .send({ status: false, message: "This Email is already in use" });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
  next();
};

// Validation for login user
const validateLoginUser = async (req, res, next) => {
  try {
    const data = req.body;
    if (!isValidBody(data)) {
      return res.status(400).send({ status: false, message: "Missing data" });
    }

    const { password } = data;
    let { email } = data;

    if (!email) {
      return res.status(400).send({
        status: false,
        message: "Email is required",
      });
    }

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Email is not valid" });
    }

    email = email.toLowerCase();

    if (!password) {
      return res.status(400).send({
        status: false,
        message: "Password is required",
      });
    }

    const user = await userModel.findOne({
      email,
      password,
    });

    // Send error if user not found
    if (!user) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid credentials" });
    }

    req.headers.userId = user._id.toString();
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
  next();
};

module.exports = { validateCreateUser, validateLoginUser };
