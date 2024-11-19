const express = require('express')
const passport = require('passport')
const router = express.Router()
const OrderService = require('../services/order.service')
const { validatorHandler } = require('../middlewares/validator.handler')
const { getOrderSchema, createOrderSchema, addItemSchema, queryOrderSchema } = require('../schemas/order.shcema')
const { checkRoles } = require('../middlewares/auth.handler')

const service = new OrderService()

router.get('/',
    validatorHandler(queryOrderSchema, 'query'),
    async (req, res, next) => {
        try {
            const orders = await service.find(req.query)
            res.json(orders)
        } catch (error) {
            next(error)
        }
    }
)

router.get('/:id',
    validatorHandler(getOrderSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const orders = await service.findOne(id)
            res.json(orders)
        } catch (error) {
            next(error)
        }
    }
)

router.post('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin','customer'),
    validatorHandler(createOrderSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body
            const newOrder = await service.create(body)
            res.status(201).json(newOrder)
        } catch (error) {
            next(error)
        }
    }
)

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin','customer'),
    validatorHandler(getOrderSchema, 'params'),
    validatorHandler(createOrderSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const body = req.body
            res.status(201).json(await service.update(id, body))
        } catch (error) {
            next(error)
        }
    }
)

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin','customer'),
    validatorHandler(getOrderSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            res.status(200).json(await service.delete(id))
        } catch (error) {
            next(error)
        }
    }
)

router.post('/add-item',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin','customer'),
    validatorHandler(addItemSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body
            const newItem = await service.addItem(body)
            res.status(201).json(newItem)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router