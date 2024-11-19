const express = require('express')
const router = express.Router()
const { CustomerService } = require('../services/customer.service')
const { validatorHandler } = require('../middlewares/validator.handler')
const { getCustomerSchema, createCustomerSchema, updateCustomerSchema, queryCustomerSchema } = require('../schemas/customer.schema')
const { checkRoles } = require('../middlewares/auth.handler')
const passport = require('passport')

const service = new CustomerService()

router.get('/',
    validatorHandler(queryCustomerSchema, 'query'),
    async (req, res, next) => {
        try {
            res.json(await service.find(req.query))
        } catch (error) {
            next(error)
        }
    }
)

router.get('/:id',
    validatorHandler(getCustomerSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            res.json(await service.findOne(id))
        } catch (error) {
            next(error)
        }
    }
)

router.post('/',
    validatorHandler(createCustomerSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body
            res.status(201).json(await service.create(body))
        } catch (error) {
            next(error)
        }
    }
)

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin','customer'),
    validatorHandler(getCustomerSchema, 'params'),
    validatorHandler(updateCustomerSchema, 'body'),
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
    validatorHandler(getCustomerSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            res.status(200).json(await service.delete(id))
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router