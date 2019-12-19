const bcrypt = require('bcryptjs');
const AdminRepository = require('../repositories/admin-repository');

class AdminService {
  constructor() {
    this.adminRepository = new AdminRepository();
  }

  async getAdmin(filter = {}, password) {
    const user = await this.adminRepository.getOne(filter);

    if(!user) {
      return Promise.reject({message: `User doesn't exist!`});
    }

    return bcrypt.compare(password, user.password).then((res) => {
      if (!res) {
        return Promise.reject({message: `Password isn't correct!`});
      }

      return {
        id: user.id,
        name: user.name,
      };
    });
  }

  create(data) {
    return bcrypt.hash(data.password, 8)
      .then(hash =>
        this.adminRepository.create({
          name: data.name,
          password: hash
        })
      )
  }
}

module.exports = AdminService;
