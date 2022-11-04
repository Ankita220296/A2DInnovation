const bookModel = require("../models/bookModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const createbook = async (req, res) => {
  try {
    const bookDetails = req.body;
    const data = await bookModel.create(bookDetails);
    res.status(201).send({ status: true, data });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const data = await bookModel
      .find({ isDeleted: false })
      .populate("userId", "fName lName");

    return res.status(200).send({
      status: true,
      data,
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

// Get book using book id
const getBookById = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    if (bookId && !ObjectId.isValid(bookId))
      return res
        .status(404)
        .send({ status: false, message: "bookId is invalid" });

    const bookDetails = await bookModel.findById(bookId);

    if (req.headers.userId !== bookDetails.userId) {
      return res
        .status(403)
        .send({ status: false, message: "You are not authorized..." });
    }

    if (!bookDetails) {
      return res.status(404).send({ status: false, message: "No book found" });
    } else if (bookDetails.isDeleted) {
      return res
        .status(404)
        .send({ status: false, message: "Book is deleted" });
    }

    return res.status(200).send({
      status: true,
      message: "Books List",
      data: bookDetails,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const issueBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    if (bookId && !ObjectId.isValid(bookId))
      return res
        .status(404)
        .send({ status: false, message: "bookId is invalid" });

    const bookDetails = await bookModel.findOneAndUpdate(
      { _id: bookId },
      { $inc: { totalIssued: 1 } },
      { new: true }
    );

    if (req.headers.userId !== bookDetails.userId) {
      return res
        .status(403)
        .send({ status: false, message: "You are not authorized..." });
    }

    if (!bookDetails) {
      return res.status(404).send({ status: false, message: "No book found" });
    } else if (bookDetails.isDeleted) {
      return res
        .status(404)
        .send({ status: false, message: "Book is deleted" });
    }

    return res.status(200).send({
      status: true,
      message: "Books List",
      data: bookDetails,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    if (bookId && !ObjectId.isValid(bookId))
      return res
        .status(404)
        .send({ status: false, message: "BookId is not valid" });

    const { title, description, bookPrice, totalIssued, category } = req.body;

    const bookDetails = await bookModel.findOne({
      _id: bookId,
      isDeleted: false,
    });

    if (!bookDetails)
      return res
        .status(404)
        .send({ status: false, msg: "Book does not exists" });

    //authorization
    const userId = bookDetails.userId.toString();

    if (req.headers["userId"] !== userId)
      return res
        .status(403)
        .send({ status: false, msg: "You are not authorized...." });

    if (title) bookDetails.title = title;
    if (description) bookDetails.description = description;
    if (bookPrice) bookDetails.bookPrice = bookPrice;
    if (category) bookDetails.category = category;

    bookDetails.save();

    return res
      .status(200)
      .send({ status: true, message: "Success", data: bookDetails });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    if (bookId && !ObjectId.isValid(bookId))
      return res
        .status(404)
        .send({ status: false, message: "BookId is not valid" });

    //authorisation
    const bookDetails = await bookModel.findById({ _id: bookId });
    if (!bookDetails)
      return res
        .status(404)
        .send({ status: false, message: "Book does not exist" });

    const userId = bookDetails.userId.toString();
    if (req.headers["userId"] !== userId)
      return res
        .status(403)
        .send({ status: false, msg: "You are not authorized...." });

    const data = await bookModel.findByIdAndUpdate(
      { _id: bookId, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: Date.now() } }
    );

    if (data.isDeleted) {
      return res
        .status(404)
        .send({ status: false, message: "The book is already deleted" });
    } else {
      return res
        .status(200)
        .send({ status: true, message: "The book is deleted" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = {
  createbook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  issueBook,
};
