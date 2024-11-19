const express = require('express')
const passport = require('passport')
const router = express.Router()
const ProductService = require('../services/product.service')
const { validatorHandler } = require('../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schemas/product.schema')
const {checkRoles} = require('../middlewares/auth.handler')

const service = new ProductService()

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query)
      res.json(products)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOne(id)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin','seller'),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newProduct = await service.create(body)
      res.json({
        message: 'create',
        data: newProduct
      })
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin','seller'),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const productUpdate = await service.update(id, body)
      res.json({
        message: 'update',
        data: productUpdate
      })
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin','seller'),
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const rta = await service.delete(id)
      res.json(rta)
    } catch (error) {
      next(error)
    }
  }
)

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin','seller'),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const { id } = req.params
      const productUpdate = await service.updateTotal(id, body)
      res.json({
        message: 'update',
        data: productUpdate
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
