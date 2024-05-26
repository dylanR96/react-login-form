import database from "../db/database.js";
import bcrypt from "bcrypt";

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
  database.find({}, (err, data) => {
    if (err) {
      return res.status(500).send({ error: "Error finding users" });
    }
    const usernames = data.map((user) => user.username);
    res.status(200).json(usernames);
  });
};

const getUser = (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    const error = new Error(`You must add an email, username and password`);
    error.status = 400;
    return next(error);
  }

  database.findOne({ email, username }, (err, user) => {
    if (err) {
      return res.status(500).send({ error: "Error finding user" });
    }
    if (!user) {
      const error = new Error(`Email or username does not exist`);
      error.status = 404;
      return next(error);
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      const error = new Error("Invalid password");
      error.status = 401;
      return next(error);
    }
    res.status(200).json(user);
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

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    database.insert(
      { email, username, password: hashedPassword },
      (err, newUser) => {
        if (err) {
          return res.status(500).send({ error: "Error creating new user" });
        }
        res.status(201).json(newUser);
      }
    );
  });
};

export { getUser, getUsers, newUser };
