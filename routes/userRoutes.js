import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const getAll = async (req, res) => {
  const users = await userService.list();
  return res.status(200).json({
    error: false,
    status: 200,
    message: "Users list",
    data: { users },
  });
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userService.search({ id: id });
    if (!user) {
      return res.status(404).json({
        error: true,
        status: 401,
        message: "No User Found",
      });
    } else {
      return res.status(200).json({
        error: false,
        status: 200,
        message: "User found",
        data: { user },
      });
    }
  } catch (err) {
    throw err;
  }
};

const createUser = async (req, res) => {
  createUserValid(req, res, () => {
    const user = userService.create(req.body);
    if (user) {
      return res.status(200).json({
        error: false,
        status: 200,
        message: "User created",
        data: { user },
      });
    } else {
      return res.status(400).json({
        error: true,
        statue: 400,
        message: "User with this email or phone number already exists",
      });
    }
  });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body;

  updateUserValid(req, res, () => {
    const updatedUser = userService.update(id, user);
    res.status(200).json({
      error: false,
      statue: 200,
      message: "User updated",
      data: { updatedUser },
    });
  });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  userService.delete(id);
  res.status(200).json({
    error: false,
    status: 200,
    message: "User deleted",
  });
};

const router = Router();
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// TODO: Implement route controllers for user

export { router };
