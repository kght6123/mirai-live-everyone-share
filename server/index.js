const { performance } = require('perf_hooks')
const compression = require('compression')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// const ReadPreference = require('mongodb')
// const MongoClient = require('mongodb').MongoClient
// const url = `mongodb://127.0.0.1:17017/admin`

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

// https://mongodb.github.io/node-mongodb-native/2.2/reference/connecting/connection-settings/
// https://github.com/mongodb/node-mongodb-native/releases/tag/v3.2.1
const connectOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: process.env.POOL_SIZE, // 5個
  ssl: false,
  noDelay: true,
  keepAlive: process.env.KEEP_ALIVE, // 30000ms
  connectTimeoutMS: process.env.CONNECT_TIMEOUT_MS, // 30000ms
  socketTimeoutMS: process.env.SOCKET_TIMEOUT_MS, // 360000ms
  // reconnectTries: process.env.RECONNECT_TRIES, // 30回
  // reconnectInterval: process.env.RECOONECT_INTERVAL, // 1000ms
  appname: `mirai-share`,
  loggerLevel: `error`, // error/warn/info/debug
  // readPreference: ReadPreference.SECONDARY_PREFERRED
}

// ベストプラクティス https://expressjs.com/ja/advanced/best-practice-performance.html
// const wrap = fn => (req, res, next) => fn(req, res, next).catch(next);
const wrap = fn => (...args) => fn(...args).catch(args[2])

const isNotEmpty = value => value !== null && value !== undefined && value !== ''
const isNotEmptyArray = array => array !== null && array !== undefined && array.length > 0

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  // Give nuxt middleware to express
  app.use(nuxt.render)
  // gzip圧縮に対応
  app.use(compression({ level: 9 })) // zlib.Z_BEST_COMPRESSION
  // JSONに対応
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  app.use(bodyParser.json())

  app.get('/', cors(), (req, res) => {
    res.status(200).send()
  })
  // https://stackoverflow.com/a/14464750
  // https://blog.mlab.com/2017/05/mongodb-connection-pooling-for-express-applications/
  // const client = await MongoClient
  //   .connect(url, connectOption)
  //   // .catch((err) => console.error(err))
  // const db = client.db(dbName)
  // console.log('Connected successfully to mongoDB.')

  app.all('/api/test', cors(), wrap(async (req, res) => {
    res.setHeader('Cache-Control', 'no-cache') // no-cache
    const startTime = performance.now()
    const dbTime = performance.now() - startTime
  }))

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
