import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  list() {
    return fighterRepository.getAll();
  }
  search(search) {
    const item = fighterRepository.getOne(search);
    console.log(item);
    if (!item) {
      return null;
    }
    return item;
  }

  create(fighter) {
    return fighterRepository.create(fighter);
  }

  update(id, fighter) {
    return fighterRepository.update(id, fighter);
  }

  delete(id) {
    return fighterRepository.delete(id);
  }
  // TODO: Implement methods to work with fighters
}

const fighterService = new FighterService();

export { fighterService };
