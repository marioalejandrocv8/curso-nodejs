const boom = require('@hapi/boom')
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize')

class UserService {

  constructor() {
  }

  async find(query) {
    const options = {
      include: ['customer'],
      where: {}
    }

    const { limit, offset, id } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }
    if (id) {
      options.where.id = id
    }

    const rta = await models.User.findAll(options)
    return rta
  }
  
  async findByEmail(email) {
    const rta = await models.User.findOne({ where: { email } })
    return rta
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: ['customer']
    });
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }
  async create(data) {

    const hash = await bcrypt.hash(data.password, 10)
    const newUser = await models.User.create({
      ...data,
      password: hash
    })
    delete newUser.dataValues.password
    return newUser
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }

}
module.exports = { UserService }