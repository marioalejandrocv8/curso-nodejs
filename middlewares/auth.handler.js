const boom = require('@hapi/boom');
const { config } = require('../config/config')

function checkApiKey(req, res, next) {
    const apiKey = req.headers['apikey'];
    if (apiKey === config.apiKey) {
        next()
    } else {
        next(boom.unauthorized())
    }
}


function checkAdminRole(req, res, next) {
    const userPayload = req.user
    if (userPayload.role === 'admin') {
        next()

    } else {
        next(boom.unauthorized())
    }
}

function checkRoles(...roles) {
    return (req, res, next) => {
        const userPayload = req.user
        console.log(userPayload.role);
        console.log(roles);
        
        if (roles.includes(userPayload.role)) {
            next()
        }
        else {
            next(boom.unauthorized())
        }
    }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles }