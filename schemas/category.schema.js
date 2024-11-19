const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string().min(3).max(15)
const image = Joi.string().uri()
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createCategorySchema = Joi.object({
    name: name.required(),
    image: image.required()
})
const updateCategorySchema = Joi.object({
    name: name,
    image: image
})
const getCategorySchema = Joi.object({
    id: id.required()
})

const queryCategorySchema = Joi.object({
    limit, offset, id
})

module.exports = { createCategorySchema, getCategorySchema, updateCategorySchema, queryCategorySchema }