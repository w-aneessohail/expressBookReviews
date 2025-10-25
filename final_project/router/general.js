const express = require("express");
let books = require("./booksdb.js");
let public_users = express.Router();

// Task 1: Get all books
public_users.get("/", function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Task 2: Get book by ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn]);
});

// Task 3: Get books by Author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  let result = Object.keys(books)
    .filter((key) => books[key].author === author)
    .map((key) => books[key]);
  res.send(result);
});

// Task 4: Get books by Title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  let result = Object.keys(books)
    .filter((key) => books[key].title === title)
    .map((key) => books[key]);
  res.send(result);
});

// Task 5: Get book reviews
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

// Task 10–13: Async/Await versions using Axios
const axios = require("axios");
const baseURL = "http://localhost:5000";

public_users.get("/async/books", async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/`);
    res.send(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

public_users.get("/async/isbn/:isbn", async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/isbn/${req.params.isbn}`);
    res.send(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

public_users.get("/async/author/:author", async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/author/${req.params.author}`);
    res.send(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

public_users.get("/async/title/:title", async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/title/${req.params.title}`);
    res.send(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports.general = public_users;
