import repository from "../repositories/users.rep.js";
import UserDTO from "../dto/user.dto.js";

/*import dao from "../data/index.factory.js"
const {users} = dao
const repository = users*/

class UsersService {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => {
    data = new UserDTO(data);
    console.log(data);
    const response = await this.repository.create(data);
    return response;
  }
  read = async ({ filter, options }) =>
    await this.repository.read({ filter, options });
  stats = async (id) => await this.repository.stats(id);
  readOne = async (id) => await this.repository.readOne(id);
  readByEmail = async (id) => await this.repository.readByEmail(email);
  update = async (id,data) => await this.repository.update(id, data);
  destroy = async (id) => await this.repository.destroy(id);
}

const service = new UsersService();
export default service;
