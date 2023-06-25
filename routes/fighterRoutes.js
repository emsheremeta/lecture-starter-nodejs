import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const getAll = async (req, res) => {
  const fighters = await fighterService.list();
  return res.status(200).json({
    error: false,
    status: 200,
    message: "Users list",
    data: { fighters },
  });
};
const getById = async (req, res) => {
  try {
    const id = req.params.id;

    const fighter = await fighterService.search({ id: id });
    if (!fighter) {
      return res.status(404).json({
        error: true,
        status: 401,
        message: "No Fighter Found",
      });
    } else {
      return res.status(200).json({
        error: false,
        status: 200,
        message: "User found",
        data: { fighter },
      });
    }
  } catch (err) {
    throw err;
  }
};

const createFighter = async (req, res) => {
  if (fighterService.search({ name: req.body.name })) {
    return res.status(400).json({
      error: true,
      status: 400,
      message: "Figher with this name already exists",
    });
  }
  createFighterValid(req, res, () => {
    const fighter = fighterService.create(req.body);
    return res.status(200).json({
      error: false,
      status: 200,
      message: "Fighter created",
      data: { fighter },
    });
  });
};

const updateFighter = async (req, res) => {
  const id = req.params.id;
  const fighter = req.body;

  updateFighterValid(req, res, () => {
    const updatedFighter = fighterService.update(id, fighter);
    res.status(200).json({
      error: false,
      status: 200,
      message: "Fighter updated",
      data: { updatedFighter },
    });
  });
};

const deleteFighter = async (req, res) => {
  const id = req.params.id;
  fighterService.delete(id);
  res.status(200).json({
    error: false,
    status: 200,
    message: "Fighter deleted",
  });
};

const router = Router();
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createFighter);
router.put("/:id", updateFighter);
router.delete("/:id", deleteFighter);

// TODO: Implement route controllers for fighter

export { router };
