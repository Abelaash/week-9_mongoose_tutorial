const express = require("express");
const router = express.Router() 
// Import Express validatior
const { check, validationResult } = require("express-validator");

// Import Book Mongoose schemas
let User = require("../models/user");


// Attach routes to router
router
  .route("/add")
  // Get method renders the pug add_book page
  .get((req, res) => {
    // Render page with list of genres
    res.render("register");
    // Post method accepts form submission and saves book in MongoDB
  })
  .post(async (req, res) => {
    // Async validation check of form elements
    await check("title", "Title is required").notEmpty().run(req);
    await check("author", "Author is required").notEmpty().run(req);
    await check("pages", "Pages is required").notEmpty().run(req);
    await check("rating", "Rating is required").notEmpty().run(req);
    await check("genres", "Genre is required").notEmpty().run(req);

    // Get validation errors
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      // Create new book from mongoose model
      let book = new Book();
      // Assign attributes based on form data
      book.title = req.body.title;
      book.author = req.body.author;
      book.pages = req.body.pages;
      book.genres = req.body.genres;
      book.rating = req.body.rating;

      // Save book to MongoDB
      book.save(function (err) {
        if (err) {
          // Log error if failed
          console.log(err);
          return;
        } else {
          // Route to home to view books if suceeeded
          res.redirect("/");
        }
      });
    } else {
      res.render("add_book", {
        // Render form with errors
        errors: errors.array(),
        genres: genres,
      });
    }
  });



module.exports = router;
