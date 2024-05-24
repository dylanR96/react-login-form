import database from "../db/database.js";

// const getUser = (req, res, next) => {
//   const username = req.params.username;
//   const email = req.params.email;
//   // res.json(users.filter((user) => user.username === username));
//   const user = users.find((user) => user.username === username);
//   if (!user) {
//     const error = new Error(`A user with username ${user} was not found`);
//     error.status = 404;
//     return next(error);
//   }
//   res.status(200).json(user);
// };

const getUsers = (req, res) => {
  res.send(users);
};

const getUser = (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    const error = new Error(`You must add an email, username and password`);
    error.status = 400;
    return next(error);
  }

  database.findOne({ email, username, password }, (err, user) => {
    if (err) {
      return res.status(500).send({ error: "Error finding user" });
    }
    if (!user) {
      const error = new Error(`Email or username does not exist`);
      error.status = 404;
      return next(error);
    }
    res.status(201).json(user);
  });
};

const newUser = (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    const error = new Error(`You must add an email, username and password`);
    error.status = 400;
    return next(error);
  }
  database.findOne({ $or: [{ email }, { username }] }, (err, existingUser) => {
    if (err) {
      return res.status(500).send({ error: "Error finding user" });
    }
    if (existingUser) {
      const error = new Error(`Email or username already exists`);
      error.status = 409;
      return next(error);
    }
    database.insert({ email, username, password }, (err, newUser) => {
      if (err) {
        return res.status(500).send({ error: "Error creating new user" });
      }
      res.status(201).json(newUser);
    });
  });
};

export { getUser, getUsers, newUser };
