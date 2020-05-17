const SpaceRepository = require('../repositories/space-repository');
const UserMapper = require('../mappers/user-mapper');

const defaultUserImage = 'https://myimagesforcoursework.s3.eu-central-1.amazonaws.com/image/boy.png';

class SpaceService {
    constructor () {
        this.spaceRepository = new SpaceRepository();
    }

    getAll (filter = {}) {
        return this.spaceRepository.getAll(filter)
    }

    getById (id) {
        return this.spaceRepository.getById(id);
    }

    create (data) {
        return this.spaceRepository.create({
            name: data.name, image: data.image || defaultUserImage
        });
    }

    update ({image, currentPassword, newPassword}, options) {
        return this.spaceRepository.update({image}, options);
    }
}

module.exports = SpaceService;
