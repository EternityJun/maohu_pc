/* vue开发中api接口地址区分开发环境和线上环境 */
/* 本地开发配置 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"/api"' //开发环境配置
})
