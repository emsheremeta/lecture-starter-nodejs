import { post } from "../requestHelper";
const entity = "users";

export const createUser = async (body) => {
  console.error("body");
  return await post(entity, body);
};
