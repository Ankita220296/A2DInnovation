# A2D test project

Create a .env file in the `src` folder and set JWT_TOKEN.
Please note : You can set any random value string to JWT_TOKEN as for now.

## How to run

- Create a `.env` file inside `src` folder and add JWT_TOKEN=socialmedia12345
- In the root folder run `npm install`
- Go to src folder and run `node index.js`

## Library management project end points

### POST /users

- Create user document from request body
- URL : /createUser
- Type : POST
- Params : fName, lName, email, password

### POST /loginUser

- Login user
- URL : /login
- Type : POST
- Params : email, password

### POST /Book

- Create a book document from request body.
- URL : /createBook
- Type : POST
- Params : title, description, userId, authorName , bookPrice , category
  This API will take userId from JWT token

### GET /getBookById

- URL : /getBook/:bookId
- Type : GET

### GET /getBooks

- Get all books.
- URL : /getBooks
- Type : GET

### PUT /updateBook

- URL : /updateBook/:bookId
- Type : PUT

  ### PUT /issueBook

- URL : /issueBook/:bookId
- Type : PUT

  ### DELETE /deleteBook

- URL : /deleteBook/:bookId
- Type : DELETE

### Authentication

- Authorisation has been implemented by using JWT token. It validates the token before every protected endpoint is called.
- Protected routes are createBook, getBookByID, getBooks, updateBook, deleteBook, issueBook
- Set the JWT token in the request - `x-api-key`: jwt_token
