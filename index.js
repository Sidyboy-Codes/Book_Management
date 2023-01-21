// 1. importing express

const express = require("express");
const app = express();
app.use(express.json());

// 2. importing security package "env" to secure are mongodb url
require("dotenv").config();

// 3. importing Mongoose .... and connecting to mongoDB
const mongoose = require("mongoose");
const mongoDB = process.env.MongoDB;
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("CONNECTION ESTABLISHED"));

//4. importing database collections
const BookModel = require("./database/books");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publications");

// 5. REST APIs

/*
Route           /
Description     to welcome user
Access          public
Parameter       None 
Methods         GET
Example         http://localhost:3000/
*/

app.get("/", (req, res) => {
  return res.json({ Welcome: "to Book APIs by Siddhant" });
});

/*
Route           /books
Description     to get all books
Access          public
Parameter       None 
Methods         GET
Example         http://localhost:3000/books
*/

app.get("/books", async (req, res) => {
  // where /books is url and only "/" is root directory
  const Allbooks = await BookModel.find();
  return res.json(Allbooks);
});

/*
Route           /book-isbn
Description     get book with specific ISBN
Access          public
Parameter       isbn 
Methods         GET
Example         http://localhost:3000/book-isbn/1234Three
*/

app.get("/book-isbn/:isbn", async (req, res) => {
  const { isbn } = req.params; //object destructuring... params is parameter that we passed as :isbn
  const specific_ISBN_Book = await BookModel.findOne({ ISBN: isbn });
  //if no book found
  if (specific_ISBN_Book === null) {
    return res.json({ Error: `No book with ISBN ${isbn} found` });
  }
  //else
  return res.json(specific_ISBN_Book);
});

/*
Route           /book-category
Description     get books with specific category
Access          public
Parameter       cate
Methods         GET
Example         http://localhost:3000/books-category/tech
*/

app.get("/books-category/:cate", async (req, res) => {
  const { cate } = req.params;

  const specific_category_Books = await BookModel.find({ category: cate });
  // here there can be multifle books with same category so "find" and it returns array
  if (specific_category_Books.length === 0) {
    return res.json({ Error: `No book with Category ${cate} found` });
  }

  return res.json(specific_category_Books);
});

/*
Route           /authors
Description     get all authors
Access          public
Parameter       None 
Methods         GET
Example         http://localhost:3000/authors
*/

app.get("/authors", async (req, res) => {
  const Allauthors = await AuthorModel.find();
  return res.json(Allauthors);
});

/*
Route           /author-id
Description     get author with specific id
Access          public
Parameter       id
Methods         GET
Example         http://localhost:3000/author-id/1
*/

app.get("/author-id/:id", async (req, res) => {
  const { id } = req.params;

  const specific_id_author = await AuthorModel.findOne({ id: id });

  if (specific_id_author === null) {
    return res.json({ Error: `No author with id ${id}` });
  }
  return res.json(specific_id_author);
});

/*
Route           /author-isbn
Description     get authors of isbn
Access          public
Parameter       isbn
Methods         GET
Example         http://localhost:3000/author-isbn/123Four
*/

app.get("/author-isbn/:isbn", async (req, res) => {
  const { isbn } = req.params;

  const authors_of_isbn = await AuthorModel.find({ books: isbn });

  if (authors_of_isbn.length === 0) {
    return res.json({ Error: `No authors has writen ${isbn}` });
  }
  return res.json(authors_of_isbn);
});

/*
Route           /publications
Description     get all publications
Access          public
Parameter       None 
Methods         GET
Example         http://localhost:3000/authors
*/

app.get("/publications", async (req, res) => {
  const Allpublications = await PublicationModel.find();
  return res.json(Allpublications);
});

/*
Route           /publication-id
Description     get publication with specific id
Access          public
Parameter       id
Methods         GET
Example         http://localhost:3000/publication-id/2
*/

app.get("/publication-id/:id", async (req, res) => {
  const { id } = req.params;

  const specific_publication = await PublicationModel.findOne({ id: id });

  if (specific_publication === null) {
    return res.json({ Error: `No publication with id ${id}` });
  }
  return res.json(specific_publication);
});

/*
Route           /publication-isbn
Description     get publication of isbn
Access          public
Parameter       isbn
Methods         GET
Example         http://localhost:3000/publication-isbn/123Four
*/

app.get("/publication-isbn/:isbn", async (req, res) => {
  const { isbn } = req.params;

  const publication_of_isbn = await PublicationModel.find({ books: isbn });

  if (publication_of_isbn.length === 0) {
    return res.json({ Error: `No publication has Published ${isbn}` });
  }
  return res.json(publication_of_isbn);
});

//-------------------GET API Over------------------------------------------------------------------------------------------------
//-------------------GET API Over------------------------------------------------------------------------------------------------
//-------------------GET API Over------------------------------------------------------------------------------------------------
//-------------------GET API Over------------------------------------------------------------------------------------------------
//-------------------GET API Over------------------------------------------------------------------------------------------------
//-------------------GET API Over------------------------------------------------------------------------------------------------
//-------------------GET API Over------------------------------------------------------------------------------------------------

// PUT APIS will be tested in postman/thunder client

/*
Route           /book
Description     add new book to database
Access          public
Parameter       None 
Methods         POST
Example         http://localhost:3000/book
*/

app.post("/book", async (req, res) => {
  // link will pasted in post method thunder client and new book data will be also added through thunder client itself
  const Newbook = await BookModel.create(req.body); // here we will get req.body from thunder client (in which there will be data of new book)

  return res.json({ "New Book added": Newbook });
});

/*
Route           /author
Description     add new author to database
Access          public
Parameter       None 
Methods         POST
Example         http://localhost:3000/author
*/

app.post("/author", async (req, res) => {
  // link will pasted in post method thunder client and new book data will be also added through thunder client itself
  const Newauthor = await AuthorModel.create(req.body); // here we will get req.body from thunder client (in which there will be data of new book)

  return res.json({ Newauthoradded: Newauthor });
});

/*
Route           /publication
Description     add new publication to database
Access          public
Parameter       None 
Methods         POST
Example         http://localhost:3000/publication
*/

app.post("/publication", async (req, res) => {
  // link will pasted in post method thunder client and new book data will be also added through thunder client itself
  const Newpublication = await PublicationModel.create(req.body); // here we will get req.body from thunder client (in which there will be data of new book)

  return res.json({ Newpublicationadded: Newpublication });
});

//-------------------POST API Over------------------------------------------------------------------------------------------------
//-------------------POST API Over------------------------------------------------------------------------------------------------
//-------------------POST API Over------------------------------------------------------------------------------------------------
//-------------------POST API Over------------------------------------------------------------------------------------------------
//-------------------POST API Over------------------------------------------------------------------------------------------------
//-------------------POST API Over------------------------------------------------------------------------------------------------
//-------------------POST API Over------------------------------------------------------------------------------------------------

/*
Route           /book-update
Description     update specific isbn book
Access          public
Parameter       isbn 
Methods         PUT
Example         http://localhost:3000/book-update/12345Six
*/

app.put("/book-update/:isbn", async (req, res) => {
  // in req.body dont need to send full Document (i.e all key value pairs) again, just send key:"updated value" only
  const { isbn } = req.params;
  const Updated_book = await BookModel.findOneAndUpdate(
    { ISBN: isbn },
    req.body,
    { new: true }
  ); // here if we target isbn and "overide" only specific Key value pair.... new true is use to "return" updated value to Update_book
  return res.json({ "Updated Book": Updated_book });
});

/*
Route           /author-update
Description     update specific id author
Access          public
Parameter       id 
Methods         PUT
Example         http://localhost:3000/author-update/3
*/

app.put("/author-update/:id", async (req, res) => {
  // in req.body dont need to send full Document (i.e all key value pairs) again, just send key:"updated value" only
  const { id } = req.params;
  const Updated_author = await AuthorModel.findOneAndUpdate(
    { id: id },
    req.body,
    { new: true }
  );
  return res.json({ "Updated author": Updated_author });
});

/*
Route           /publication-update
Description     update specific id publication
Access          public
Parameter       id 
Methods         PUT
Example         http://localhost:3000/publication-update/1
*/

app.put("/publication-update/:id", async (req, res) => {
  // in req.body dont need to send full Document (i.e all key value pairs) again, just send key:"updated value" only
  const { id } = req.params;
  const Updated_publication = await PublicationModel.findOneAndUpdate(
    { id: id },
    req.body,
    { new: true }
  );
  return res.json({ "Updated publication": Updated_publication });
});

//-------------------PUT API Over------------------------------------------------------------------------------------------------
//-------------------PUT API Over------------------------------------------------------------------------------------------------
//-------------------PUT API Over------------------------------------------------------------------------------------------------
//-------------------PUT API Over------------------------------------------------------------------------------------------------
//-------------------PUT API Over------------------------------------------------------------------------------------------------
//-------------------PUT API Over------------------------------------------------------------------------------------------------
//-------------------PUT API Over------------------------------------------------------------------------------------------------

/*
Route           /delete-book
Description     delete specific isbn book
Access          public
Parameter       isbn
Methods         DELETE
Example         http://localhost:3000/delete-book/
*/

app.delete("/delete-book/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const delete_book = await BookModel.deleteOne({ ISBN: isbn });
  if (!delete_book.deletedCount) {
    return res.json({ Error: "No book exsist" });
  }
  return res.json({ "Book Deleted": delete_book });
});

/*
Route           /delete-author
Description     delete specific id author
Access          public
Parameter       id
Methods         DELETE
Example         http://localhost:3000/delete-author/
*/

app.delete("/delete-author/:id", async (req, res) => {
  const { id } = req.params;
  const delete_author = await AuthorModel.deleteOne({ id: id });
  if (!delete_author.deletedCount) {
    return res.json({ Error: "No author exsist" });
  }
  return res.json({ "author Deleted": delete_author });
});

/*
Route           /delete-publication
Description     delete specific id publication
Access          public
Parameter       id
Methods         DELETE
Example         http://localhost:3000/delete-publication/
*/

app.delete("/delete-publication/:id", async (req, res) => {
  const { id } = req.params;
  const delete_publication = await PublicationModel.deleteOne({ id: id });
  // if no publication is there
  if (!delete_publication.deletedCount) {
    return res.json({ Error: "No publication exsist" });
  }

  return res.json({ "publication Deleted": delete_publication });
});

//-----------------Miscellaneous DELETE(delete some key's value)--------------------

/*
Route           /book-author-delete
Description     delete specific author of a isbn book
Access          public
Parameter       isbn & id
Methods         DELETE
Example         http://localhost:3000/book-author-delete/temp2/3
*/

app.delete("/book-author-delete/:isbn/:id", async (req, res) => {
  const { isbn, id } = req.params;

  const specific_book = await BookModel.findOne({ ISBN: isbn });


  if (specific_book === null) {
    return res.json({ Error: "No book found" });
  } else {
    specific_book.authors.remove(id);
    const updateBook = await BookModel.findOneAndUpdate(
      { ISBN: isbn },
      specific_book,
      { new: true }
    );
    return res.json({
      bookUpdated: updateBook,
      message: "Author was Deleted from the Book !!!",
    });
  }
});


/*
Route           /author-book-delete
Description     delete specific author of a isbn book
Access          public
Parameter       isbn & id
Methods         DELETE
Example         http://localhost:3000/delete-publication/
*/

app.delete("/author-book-delete/:id/:isbn", async (req, res) => {
  const { id, isbn } = req.params;

  const specific_author = await AuthorModel.findOne({ id: id });

  if (specific_author === null) {
    return res.json({ Error: "No author found" });
  } 
  else {
    specific_author.books.remove(isbn);
    const updateauthor = await AuthorModel.findOneAndUpdate({ id: id}, specific_author, { new: true });
    return res.json({
      authorUpdated: updateauthor,
      message: "book was Deleted from the author !!!",
    });
  }
});

//-------------------DELETE API Over------------------------------------------------------------------------------------------------
//-------------------DELETE API Over------------------------------------------------------------------------------------------------
//-------------------DELETE API Over------------------------------------------------------------------------------------------------
//-------------------DELETE API Over------------------------------------------------------------------------------------------------
//-------------------DELETE API Over------------------------------------------------------------------------------------------------
//-------------------DELETE API Over------------------------------------------------------------------------------------------------
//-------------------DELETE API Over------------------------------------------------------------------------------------------------


// server is listening with port 3000

app.listen(3000, () => {
  console.log("Server is Running");
});
