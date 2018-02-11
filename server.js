const { Nuxt, Builder } = require('nuxt')
const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const routes = require('./server/routes')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

// We instantiate Nuxt.js with the options
let config = require('./nuxt.config.js')
config.dev = !isProd

const nuxt = new Nuxt(config)
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(bodyParser({ extended: false }))

app.use((req, res, next) => {
  req.io = io
  return next()
})
routes(router)
app.use('/api', router)
app.use(nuxt.render)

// Listen the server
server.listen(port, () => {
  console.log('Server running on http://localhost:'+port)
})
