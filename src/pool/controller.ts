'use strict'

import { pool as _pool } from 'workerpool'
import { join } from 'path'

let poolProxy = null

// FUNCTIONS
const init = async (options) => {
  const pool = _pool(join(__dirname, './thread-functions.js'), options)
  poolProxy = await pool.proxy()
  console.log(`Worker Threads Enabled - Min Workers: ${pool.minWorkers} - Max Workers: ${pool.maxWorkers} - Worker Type: ${pool.workerType}`)
}

const get = () => {
  return poolProxy
}

// EXPORTS
const _init = init
export { _init as init }
const _get = get
export { _get as get }