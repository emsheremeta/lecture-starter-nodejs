import { userRepository } from "../repositories/userRepository.js";

class UserService {
  list() {
    return userRepository.getAll();
  }

  search(search) {
    const item = userRepository.getOne(search);
    console.log(item);
    if (!item) {
      return null;
    }
    return item;
  }

  create(user) {
    if (
      this.search({ email: user.email }) ||
      this.search({ phoneNumber: user.phoneNumber })
    ) {
      return null;
    }
    return userRepository.create(user);
  }

  update(id, user) {
    return userRepository.update(id, user);
  }

  delete(id) {
    return userRepository.delete(id);
  }
}

const userService = new UserService();

export { userService };
