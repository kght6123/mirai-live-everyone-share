const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

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

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

// const { performance } = require('perf_hooks')
// const compression = require('compression')
// const express = require('express')
// const cors = require('cors')
// const bodyParser = require('body-parser')

// const app = express()

// const env = require('./env.json')[app.get('env')]
// // const config = require('./config.json')

// const ReadPreference = require('mongodb')
// const MongoClient = require('mongodb').MongoClient
// const url = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_DOMAIN}:27017/`
// const dbName = env.mongodb_dbname
// const tcgPreCondKeyList = env.tcg_preparation_condition_list

// // https://mongodb.github.io/node-mongodb-native/2.2/reference/connecting/connection-settings/
// // https://github.com/mongodb/node-mongodb-native/releases/tag/v3.2.1
// const connectOption = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   poolSize: process.env.POOL_SIZE, // 5個
//   ssl: false,
//   noDelay: true,
//   keepAlive: process.env.KEEP_ALIVE, // 30000ms
//   connectTimeoutMS: process.env.CONNECT_TIMEOUT_MS, // 30000ms
//   socketTimeoutMS: process.env.SOCKET_TIMEOUT_MS, // 360000ms
//   // reconnectTries: process.env.RECONNECT_TRIES, // 30回
//   // reconnectInterval: process.env.RECOONECT_INTERVAL, // 1000ms
//   appname: `tcg_search_api`,
//   loggerLevel: `error`, // error/warn/info/debug
//   readPreference: ReadPreference.SECONDARY_PREFERRED
// }

// // ベストプラクティス https://expressjs.com/ja/advanced/best-practice-performance.html
// // const wrap = fn => (req, res, next) => fn(req, res, next).catch(next);
// const wrap = fn => (...args) => fn(...args).catch(args[2])

// // gzip圧縮に対応
// app.use(compression({ level: 9 })) // zlib.Z_BEST_COMPRESSION

// // JSONに対応
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// )
// app.use(bodyParser.json())

// const isNotEmpty = value => value !== null && value !== undefined && value !== ''
// const isNotEmptyArray = array => array !== null && array !== undefined && array.length > 0
// // 条件値のリストを作る
// const getConditionsList = async (db, cond) => {
//   const key = `${cond.collection}@${cond.fields}`
//   const _id = {}
//   cond.fields.forEach(field => {
//     _id[field] = `$${field}`
//   })
//   const startTime = performance.now()
//   const result = await db.collection(cond.collection)
//     .aggregate([{ $group: { _id, count: { $sum: 1 }} }, { $sort: { count: -1 } }])
//     .toArray().catch((err) => {
//     // エラーのとき
//     console.error(`conditions list Query Error.`, cond, err.name, err.message)
//   })
//   const dbTime = performance.now() - startTime
//   console.log(`conditions list Query successfully.`, key, dbTime, result)
//   return result
// }
// // 条件値リストの設定を取得する
// const getCondifionsListConfig = condition => {
//   const tcgPreCondKeyListSize = tcgPreCondKeyList.length
//   for (let i = 0; i < tcgPreCondKeyListSize; i++) {
//     const cond = tcgPreCondKeyList[i]
//     if (`${cond.fields}` === condition)
//       return cond
//   }
//   return null
// }

// const main = async () => {
//   app.get('/', cors(), (req, res) => {
//     res.status(200).send()
//   })
//   // https://stackoverflow.com/a/14464750
//   // https://blog.mlab.com/2017/05/mongodb-connection-pooling-for-express-applications/
//   const client = await MongoClient
//     .connect(url, connectOption)
//     // .catch((err) => console.error(err))
//   const db = client.db(dbName)
//   console.log('Connected successfully to mongoDB.')

//   app.all('/api/tcg/search', cors(), wrap(async (req, res) => {
//     res.setHeader('Cache-Control', 'no-cache') // no-cache
//     const { collectionName, query, queryFields, filters, sort, pageSize, page, conditions } = req.body
//     const collection = db.collection(collectionName)
//     const dbQuery = {}
//     const isQuery = isNotEmpty(query) && isNotEmptyArray(queryFields)
//     const isFilter = isNotEmptyArray(filters)
//     const isPreConditions = isNotEmptyArray(conditions)
//     // console.log(`query`, query, queryFields, isQuery)
//     // 何か検索条件が設定されてれば、Queryのベースを作る
//     if (isQuery || isFilter)
//       dbQuery[`$and`] = []
//     // テキスト検索条件を追加
//     if (isQuery) {
//       const queryRegExp = new RegExp(query)
//       dbQuery[`$and`].push(
//         {
//           $or: queryFields.map( queryFieldName => {
//             const queryField = {}
//             queryField[queryFieldName] = queryRegExp
//             return queryField
//           })
//         }
//       )
//     }
//     // 追加のフィルター条件を追加
//     if (isFilter)
//       filters.forEach(filter => {
//         dbQuery[`$and`].push(filter)
//       })
//     // console.log(`preConditions`, isPreConditions, conditions)
//     const conditionsValues = {}
//     if (isPreConditions && page === 1) { // 初期ページだけ実行にする
//       const conditionsLength = conditions.length
//       for (let i = 0; i < conditionsLength; i++) {
//         const condition = conditions[i]
//         // 条件値リストの設定を取得する
//         const cond = getCondifionsListConfig(condition)
//         if (cond) {
//           // 条件値リストを取得する
//           conditionsValues[condition] = await getConditionsList(db, cond)
//         }
//       }
//     }
//     // ページ検索 https://www.codementor.io/@arpitbhayani/fast-and-efficient-pagination-in-mongodb-9095flbqr
//     const startTime = performance.now()
//     const skips = pageSize * (page - 1)
//     const records = await collection
//       .find(dbQuery).sort(sort).skip(skips).limit(pageSize).toArray()
//       .catch((err) => {
//         // エラーのとき
//         const dbTime = performance.now() - startTime
//         res.status(500).send(
//           {
//             records: [],
//             nextPage: 1,
//             dbTime, dbQuery, conditionsValues,
//             error: { name: err.name, message: err.message }
//           })
//         throw err
//       })
//     const dbTime = performance.now() - startTime
//     const nextPage = records.length > 0 ? page + 1 : -1
//     console.log(`Query successfully.`/*, records*/, dbTime)
//     res.send({ records, nextPage, dbTime, dbQuery, conditionsValues })
//   }))
//   app.listen(3100, () => console.log('Listening on port 3100.'))
// }

// // 全処理を実行
// Promise.all([main()]).then((results => {
//   console.log(`OK!!!`, results)
// })).catch(e => {
//   console.error(`NG!!!`, e)
// })