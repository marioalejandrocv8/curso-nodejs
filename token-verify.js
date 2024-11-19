const jwt = require('jsonwebtoken')

const secret = 'mySecret'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTczMTYyMjEwNn0.np9Zz05bkA_YWiugf-yZVVECQGFMRFNVDg699eSw9ZI'

function verifyToken(token,secret) {
    return jwt.verify(token,secret)
}

const payload = verifyToken(token,secret)
console.log(payload);
//{ sub: 1, role: 'customer', iat: 1731622106 }