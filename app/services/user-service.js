const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserRepository = require('../repositories/user-repository');
const UserMapper = require('../mappers/user-mapper');
const validateUser = require('../validators/user-validator');
const generateKey = require('../utils/generateKey');

const defaultUserImage = 'https://myimagesforcoursework.s3.eu-central-1.amazonaws.com/image/boy.png';

class UserService {
    constructor () {
        this.userRepository = new UserRepository();
        this.userMapper = new UserMapper();
    }

    async login ({mail, password}) {
        const user = await this.userRepository.getOne({
            where: {
                mail
            }
        });

        if (!user) {
            return Promise.reject({message: `User doesn't exist!`});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return Promise.reject({message: `Password isn't correct!`});
        }

        const token = jwt.sign({
            name: user.name, mail: user.mail, id: user.id
        }, process.env.SECRET_KEY, {expiresIn: 24 * 60 * 60});

        return {
            token, id: user.id, name: user.name, mail, image: user.image
        };
    }

    async register (user) {
        const isUserValid = validateUser(user);

        if (!isUserValid) {
            return Promise.reject('User is invalid');
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        await this.userRepository.create({
            mail: user.mail,
            name: user.name,
            image: user.image || defaultUserImage,
            password: hashedPassword,
            confirmedKey: generateKey(6)
        });

        return this.login(user);
    }

    getAll (filter = {}) {
        return this.userRepository.getAll(filter)
            .then(users => users.map(this.userMapper.mapDatabaseToServiceModel));
    }

    getById (id) {
        return this.userRepository.getById(id)
            .then(user => {
                return this.userMapper.mapDatabaseToServiceModel(user);
            });
    }

    create (data) {
        return this.userRepository.create({
            name: data.name, image: data.image || defaultUserImage
        });
    }

    async update ({image, currentPassword, newPassword}, options) {
        if(currentPassword) {
            const user = await this.userRepository.getOne(options);

            if (!user) {
                return Promise.reject({message: `User doesn't exist!`});
            }

            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

            if (!isPasswordValid) {
                return Promise.reject({message: `Password isn't correct!`});
            }
        }

        return this.userRepository.update({
            image,
            password: newPassword && await bcrypt.hash(newPassword, 10)
        }, options);
    }
}

module.exports = UserService;
