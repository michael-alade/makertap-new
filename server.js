const { Nuxt, Builder } = require('nuxt')
const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const routes = require('./server/routes')
const socketListeners = require('./server/socket')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'

// We instantiate Nuxt.js with the options
let config = require('./nuxt.config.js')
config.dev = !isProd

const nuxt = new Nuxt(config)
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(bodyParser({ extended: false, limit: '12mb' }))
// app.use(require('express-session')({ secret: 'keyboard cat', key: 'sid', cookie: { secure: false }, resave: true, saveUninitialized: true }));

app.use((req, res, next) => {
  req.io = io
  return next()
})
routes(router)

app.use('/api', router)

app.use(nuxt.render)

io.on('connection', function (sockets) {
  socketListeners(sockets, io)
})

// Listen the server
server.listen(port, () => {
  console.log('Server running on http://localhost:'+port)
})
