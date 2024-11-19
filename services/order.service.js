const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class OrderService {
    constructor() { }

    async find(query) {

        const options = {
            include: ['items'],
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

        const orders = await models.Order.findAll(options)
        return orders
    }

    async findOne(id) {
        const order = await models.Order.findByPk(id, {
            include: [
                {
                    association: 'customer',
                    include: ['user']
                },
                {
                    association: 'items'
                },
            ]
        })
        if (!order) {
            throw boom.notFound('Order Not Found')
        }
        return order
    }

    async findByUser(userId) {
        const order = models.Order.findAll({
            //consulta por asociaciones
            where:{
                "$customer.user.id$":userId
            },
            include: [
                {
                    association: 'customer',
                    include: ['user']
                },
            ],
            
        })
        if (!order) {
            throw boom.notFound('Order Not Found')
        }
        return order
    }

    async create(data) {
        const newOrder = await models.Order.create(data)
        return newOrder
    }

    async update(id, changes) {
        const order = await this.findOne(id);
        const rta = await order.update(changes);
        return rta;
    }

    async delete(id) {
        const order = await this.findOne(id);
        await order.destroy();
        return { id };
    }

    async addItem(data) {
        const newItem = await models.OrderProduct.create(data)
        return newItem
    }

}

module.exports = OrderService