let users = [];

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
  const existingUser = { email, username, password };

  if (!existingUser.email || !existingUser.username || !existingUser.password) {
    const error = new Error(`You must add an email, username and password`);
    error.status = 400;
    return next(error);
  }
  const userExists = users.some((user) => user.username === username);
  const emailExists = users.some((user) => user.email === email);
  if (!userExists || !emailExists) {
    const error = new Error(`Email or username does not exist`);
    error.status = 409;
    return next(error);
  }
  res.status(201).json(users);
};

const newUser = (req, res, next) => {
  const { email, username, password } = req.body;
  const newUser = { email, username, password };

  if (!newUser.email || !newUser.username || !newUser.password) {
    const error = new Error(`You must add an email, username and password`);
    error.status = 400;
    return next(error);
  }
  const userExists = users.some((user) => user.username === username);
  const emailExists = users.some((user) => user.email === email);
  if (userExists || emailExists) {
    const error = new Error(`Email or username already exists`);
    error.status = 409;
    return next(error);
  }
  users.push(newUser);
  console.log(req.body);
  res.status(201).json(users);
};

export { getUser, getUsers, newUser };
