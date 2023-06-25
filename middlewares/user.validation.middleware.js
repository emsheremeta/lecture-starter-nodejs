import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const user = req.body;
  Object.keys(USER).forEach((key) => {
    if (key !== "id" && !user[key]) {
      return res.status(400).json({ message: `Missing ${key}` });
    }
  });
  if (!user.email.endsWith("@gmail.com")) {
    return res.status(400).json({ message: "Invalid email" });
  }
  if (!user.phoneNumber.startsWith("+380")) {
    return res.status(400).json({ message: "Invalid phone number" });
  }
  if (typeof user.password !== "string" || user.password.length < 3) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  // TODO: Implement validatior for USER entity during creation
  next();
};

const updateUserValid = (req, res, next) => {
  const user = req.body;
  if (Object.keys(user).length === 0) {
    return res.status(400).json({ message: "No data to be updated" });
  }
  if (Object.keys(user).some((e) => !Object.keys(USER).includes(e))) {
    return res.status(400).json({ message: `Invalid request` });
  }
  if (user.email && !user.email.endsWith("@gmail.com")) {
    return res.status(400).json({ message: "Invalid email" });
  }
  if (user.phoneNumber && !user.phoneNumber.startsWith("+380")) {
    return res.status(400).json({ message: "Invalid phone number" });
  }
  if (
    user.password &&
    (typeof user.password !== "string" || user.password.length < 3)
  ) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  // TODO: Implement validatior for user entity during update
  next();
};

export { createUserValid, updateUserValid };
