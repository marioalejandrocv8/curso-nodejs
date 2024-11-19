const express = require('express')

const productRouter = require('./products.router')
const categoriesRouter = require('./categories.router')
const usersRouter = require('./users.router')
const customerRouter = require('./customer.router')
const orderRouter = require('./orders.router')
const authRouter = require('./auth.router')
const profileRouter = require('./profile.router')

function routerApi(app) {
  //Creamos la ruta maestra
  const theRouter = express.Router()
  app.use('/api/v1', theRouter)

  theRouter.use('/products', productRouter);
  theRouter.use('/categories', categoriesRouter);
  theRouter.use('/users', usersRouter)
  theRouter.use('/customers', customerRouter)
  theRouter.use('/orders',orderRouter)
  theRouter.use('/auth',authRouter)
  theRouter.use('/profile',profileRouter)
}

module.exports = routerApi
