import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  const fighter = req.body;
  if (!fighter.health) {
    fighter.health = FIGHTER.health;
  }
  Object.keys(FIGHTER).forEach((key) => {
    if (key !== "id" && !fighter[key]) {
      return res.status(400).json({
        message: `Missing ${key}`,
      });
    }
  });
  if (
    typeof fighter.power !== "number" ||
    fighter.power >= 100 ||
    fighter.power <= 1
  ) {
    return res.status(400).json({ message: "invalid power value" });
  }
  if (
    typeof fighter.defense !== "number" ||
    fighter.defense >= 100 ||
    fighter.defense <= 1
  ) {
    return res.status(400).json({ message: "Invalid defense value" });
  }
  if (
    typeof fighter.health !== "number" ||
    fighter.health >= 120 ||
    fighter.health <= 80
  ) {
    return res.status(400).json({ message: "Invalid health value" });
  }
  // TODO: Implement validatior for FIGHTER entity during creation
  next();
};

const updateFighterValid = (req, res, next) => {
  const fighter = req.body;
  if (Object.keys(fighter).length === 0) {
    return res.status(400).json({ message: "No data to be updated" });
  }
  if (Object.keys(fighter).some((e) => !Object.keys(FIGHTER).includes(e))) {
    return res.status(400).json({ message: `Invalid request` });
  }

  if (
    typeof fighter.power !== "number" ||
    fighter.power >= 100 ||
    fighter.power <= 1
  ) {
    return res.status(400).json({ message: "invalid power value" });
  }
  if (
    typeof fighter.defense !== "number" ||
    fighter.defense >= 100 ||
    fighter.defense <= 1
  ) {
    return res.status(400).json({ message: "Invalid defense value" });
  }
  if (
    typeof fighter.health !== "number" ||
    fighter.health >= 120 ||
    fighter.health <= 80
  ) {
    return res.status(400).json({ message: "Invalid health value" });
  }

  // TODO: Implement validatior for FIGHTER entity during update
  next();
};

export { createFighterValid, updateFighterValid };
