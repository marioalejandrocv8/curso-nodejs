const express = require('express')
const cors = require('cors');
const routerApi = require('./routes/index')
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler')
const { checkApiKey } = require('./middlewares/auth.handler')

const app = express()
const port = process.env.PORT || 3000

const wileList = ["http://localhost:8080", "http://localhost:3000"];
const options = {
  origin: (origin, callback) => {
    if (wileList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors(options));
app.use(express.json())
require('./utils/auth/index')

app.get('/',
  checkApiKey,
  (req, res, next) => {
    res.send('API DE PRODUCTOS')
  })

routerApi(app)

//Utilizamos los middlewares de error de manera general
app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)


app.listen(port, () => {
  console.log('Ejecutando en el puerto' + port)
})
