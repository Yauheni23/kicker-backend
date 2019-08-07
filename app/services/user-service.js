const UserRepository = require('../repositories/user-repository');
const UserMapper = require('../mappers/user-mapper');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.userMapper = new UserMapper();
  }

  getAll(filter = {}) {
    return this.userRepository.getAll(filter)
      .then(users => users.map(this.userMapper.mapDatabaseToServiceModel));
  }

  getById(usersId = []) {
    return this.userRepository.getById(usersId)
      .then(users => users.map(this.userMapper.mapDatabaseToServiceModel));
  }

  create(data) {
    return this.userRepository.create({
      name: data.name,
      image: data.image
    })
  }

  update(data, options) {
    return this.userRepository.update(data, options)
  }
}

module.exports = UserService;
