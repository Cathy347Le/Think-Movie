const { List } = require("../models/list");

module.exports = {
  new: (req, res) => {
    res.render("list/new");
  },
  create: (req, res) => {
    const { title, description } = req.body;
    List.create({
      title,
      description
    }).then(list => {
      res.redirect(`list/${list.id}`);
    });
  },
  show: (req, res) => {
    List.findById(req.params.id).then(list => {
      console.log(list);
      console.log(list.movies[0].title);
      console.log(list.movies[1].title);
      console.log(list.movies[2].title);
      res.render("list/show", { list });
    });
  },
  edit: (req, res) => {
    List.findById(req.params.id).then(list => {
      res.render("list/edit", { list });
    });
  },
  update: (req, res) => {
    List.findByIdAndUpdate(req.params.id, req.body).then(list => {
      res.redirect(`/list/${list.id}`);
    });
  },
  delete: (req, res) => {
    List.remove({ _id: req.params.id }).then(list => {
      console.log(list);
      res.redirect("/");
    });
  },
  newmovie: (req, res) => {
    res.render("list/newmovie");
  },
  createmovie: (req, res) => {
    const createMovie = {
      title: req.body.title,
      genre: req.body.genre,
      year: req.body.year,
      rating: req.body.rating
    };
    List.update(
      { title: req.session.list },
      { $push: { movies: createMovie } },
      { upsert: true }
    ).then(list => {
      res.redirect(`/list/${list.id}`);
    });
  }
};

// res.redirect(`list/${list.id}`);

// people: {
//   name: String,
//     friends: [{ firstName: String, lastName: String }]
// }

// exports.addFriend = function (req, res, next) {
//   var friend = { "firstName": req.body.fName, "lastName": req.body.lName };
//   Users.findOneAndUpdate({ name: req.user.name }, { $push: { friends: friend } });

//   create: (req, res) => {
//     const { title, description } = req.body;
//     List.create({
//       title,
//       description
//     }).then(list => {
//       res.redirect(`list/${list.id}`);
//     });
// };