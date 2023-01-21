const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({
  id: Number,
  name: String,
  books: [String],
});

const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports = AuthorModel;

/*{
  "id": 2,
  "name": "shyam",
  "books": ["12One"]
}*/
