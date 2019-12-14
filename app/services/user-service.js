const UserRepository = require('../repositories/user-repository');
const UserMapper = require('../mappers/user-mapper');

const defaultUserImage = 'https://myimagesforcoursework.s3.eu-central-1.amazonaws.com/image/boy.png';

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.userMapper = new UserMapper();
  }

  getAll(filter = {}) {
    return this.userRepository.getAll(filter)
      .then(users => users.map(this.userMapper.mapDatabaseToServiceModel));
  }

  getById(id) {
    return this.userRepository.getById(id)
      .then(user => {
        return this.userMapper.mapDatabaseToServiceModel(user)
      });
  }

  create(data) {
    return this.userRepository.create({
      name: data.name,
      image: data.image || defaultUserImage
    })
  }

  update(data, options) {
    return this.userRepository.update(data, options)
  }
}

module.exports = UserService;
