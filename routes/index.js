const express = require("express");
const router = express.Router();
const { List } = require("../models/list");
const { Movie } = require("../models/list");
const listController = require("../controllers/list");
const movieController = require("../controllers/movie");

//route for home page
// router.get("/", function(req, res) {
//   List.find({}).then(lists => {
//     res.render("index", { lists });
//   });
// });

// router.get("/", function(req, res) {
//   List.find({}).then(lists => {
//     Movie.find({}).then(movies => {
//       res.render("index", { lists, movies });
//     });
//   });
// });

//route for home page
router.get("/", function(req, res) {
  Movie.find({})
    .sort({ title: 1 })
    .then(movies => {
      res.render("index", { movies });
    });
});

router.get("/rate", function(req, res) {
  Movie.find({})
    .sort({ rating: "desc" })
    .then(movies => {
      res.render("index", { movies });
    });
});

// movieRating: (req, res) => {
//   console.log("Hello");
// }

// rating: (req, res) => {
//   Movie.find({})
//     .sort({ rating: "asc" })
//     .then(movies => {
//       res.render("index", { movies });
//     });
// }

//route for movie resource
router.get("/movie/new", movieController.new);
router.post("/movie", movieController.create);
router.get("/movie/:id", movieController.show);
router.delete("/movie/:id", movieController.delete);
// router.get("/rate", movieController.movieRating);

//route for List resource
router.get("/list/new", listController.new);
router.post("/list", listController.create);
router.get("/list/:id", listController.show);
router.get("/list/:id/edit", listController.edit);
router.put("/list/:id", listController.update);
router.delete("/list/:id", listController.delete);

//route for adding movie in List
router.get("/list/:id/movie/new", listController.newMovie);
router.post("/list/:id/movie", listController.createMovie);
// router.post("/list/:id/movie/:id", listController.showMovie);

//Send 404 status for all other routes
// router.all("*", function(req, res) {
//   res.status(404).send();
// });

module.exports = router;
