const express = require('express');
const passport = require('passport')
const { AuthService } = require('../services/auth.service')
const router = express.Router()
const { validatorHandler } = require('../middlewares/validator.handler')
const { recoverySchema,changePasswordSchema } = require('../schemas/auth.schema')

const service = new AuthService()

router.post('/login',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user
            const rta = await service.signToken(user)           
            res.json(rta)
        } catch (error) {
            next(error)
        }
    }
)

router.post('/recovery',
    validatorHandler(recoverySchema, 'body'),
    async (req, res, next) => {
        try {
            const { email } = req.body
            const message = await service.sendRecovery(email)
            res.json(message)
        } catch (error) {
            next(error)
        }
    }
)

router.post('/change-password',
    validatorHandler(changePasswordSchema, 'body'),
    async (req, res, next) => {
        try {
            const { token, newPassword } = req.body   
            console.log(token,newPassword);
            
            const rta = await service.changePassword(token,newPassword)
            res.json(rta)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router
