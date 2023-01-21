// 1. importing mongoose
var mongoose = require("mongoose");

// creating book schema (sets of rule that data coming/going from/to database is in which form)
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: Number
});

// creating book model using book schema which will be used to connect mongodb collection "books" having schema "Bookschema"
const BookModel = mongoose.model("books", BookSchema);

// exporting book model (i.e mongodb model) "BookModel"
module.exports = BookModel;

/*{
    "ISBN": "123Two",
    "title": "Getting started with DB",
    "authors": [1],
    "language": "en",
    "pubDate": "2022-10-05",
    "numOfPage": 500,
    "category": ["web dev"],
    "publication": 2
}
*/