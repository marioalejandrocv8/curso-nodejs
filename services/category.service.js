const boom = require('@hapi/boom')
const { models } = require('./../libs/sequelize')

class CategoryService {

  constructor() { }

  async find(query) {
    const options = {
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
    const categories = await models.Category.findAll(options)
    return categories
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    })
    if (!category) {
      throw boom.notFound('category not found')
    }
    return category
  }

  async create(data) {
    const newCategory = await models.Category.create(data)
    return newCategory
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const rta = await category.update(changes);
    return rta;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }

}

module.exports = { CategoryService }