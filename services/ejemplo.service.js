const getConnection = require('../libs/postgres.client')
const pool = require('.././libs/postgres.pool')
const sequelize = require('.././libs/sequelize')
const { models } = require('.././libs/sequelize')

class EjemploService {

  constructor() {
    this.pool = pool
    this.pool.on('error', (err) => console.log(err))
  }

  async findClient() {
    const client = await getConnection()
    const rta = await client.query('SELECT * FROM tasks')
    return rta.rows
  }

  async findPool() {
    const query = 'SELECT * FROM tasks'
    const rta = await this.pool.query(query)
    return rta.rows
  }

  async findSequelize() {
    const query = 'SELECT * FROM tasks'
    const [data] = await sequelize.query(query)
    return data
  }

  async findSequelizeORM() {
    const data = await models.User.findAll()
    return data
  }
}

module.exports = { EjemploService }