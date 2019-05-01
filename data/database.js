'use strict'
require('dotenv').config({ path: '.env' })

let mssql = require('mssql')
// Priate to the module
let config = {

  server: 'mtpsql.database.windows.net',
  database: 'TripPlannerDataBase',
  // Login
  user: process.env.admin_username || process.env.DB_USER,
  password: process.env.admin_password || process.env.DB_PASSWORD,
  port: 1433,

  options: {
    encrypt: true
  },
  pool: {

    max: 10,
    min: 0,
    idleTimeoutMillis: 30000

  }

}

// Get an mssql connection instance

let isConnected = true
let connectionError = null

let pools = new mssql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to DB')
    return pool
  })
  .catch(err => {
    isConnected = false
    connectionError = err
    console.log(err)
  })

module.exports = {

  sql: mssql,
  pools: pools,
  isConnected: isConnected,
  connectionError: connectionError

}
