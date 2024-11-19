const jwt = require('jsonwebtoken')

const secret = 'mySecret'
const payload = {
    sub:1, //identificador del token
    role:'customer'
}

function signToken(payload,secret) {
    return jwt.sign(payload,secret)
}

const token = signToken(payload,secret)
console.log(token);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTczMTYyMjEwNn0.np9Zz05bkA_YWiugf-yZVVECQGFMRFNVDg699eSw9ZI