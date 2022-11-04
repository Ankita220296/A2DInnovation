const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bookController = require("../controllers/bookController");
const auth = require("../middleware/auth");
const userValidation = require("../validations/userValidation");
const bookValidation = require("../validations/bookValidation");

// .................................. User end points ................................//
router.post(
  "/createUser",
  userValidation.validateCreateUser,
  userController.createUser
);

router.post(
  "/login",
  userValidation.validateLoginUser,
  userController.loginAUser
);

// .................................. Book end points ................................//
router.get("/getBooks", auth.authentication, bookController.getBooks);

router.get("/getBook/:bookId", auth.authentication, bookController.getBookById);

router.post(
  "/createBook",
  auth.authentication,
  bookValidation.validateCreateBook,
  bookController.createbook
);

router.put(
  "/updateBook/:bookId",
  auth.authentication,
  bookValidation.validateUpdateBook,
  bookController.updateBook
);

router.put("/issueBook/:bookId", auth.authentication, bookController.issueBook);

router.delete(
  "/deleteBook/:bookId",
  auth.authentication,
  bookController.deleteBook
);
module.exports = router;
