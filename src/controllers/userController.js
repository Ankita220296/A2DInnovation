const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create an user
const createUser = async (req, res) => {
  try {
    const userDetails = req.body;
    const data = await userModel.create(userDetails);
    res
      .status(201)
      .send({ status: true, message: "User created successfully", data });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

// Login user using email and password. Generate JWT token and send it to the response
const loginAUser = async (req, res) => {
  try {
    // Generate JWT token using userId and secret
    const token = jwt.sign(
      {
        userId: req.headers.userId,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "3h" }
    );
    res.status(200).send({ status: true, message: "Success", data: token });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createUser, loginAUser };
