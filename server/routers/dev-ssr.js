const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.erros.forEach(err => console.log(err))
  stats.hasWarnings.forEach(warn => console.log(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readdirSync(bundlePath, 'utf-8'))
})

const handleSSR = async (ctx) => {
  if (bundle) {
    ctx.body = '你等一会，别着急...'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
  )

  const clientManifest = clientManifestResp.data

  const template = fs.readdirSync(
    path.join(__dirname, '../server.template.ejs')
  )

  const render = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })
}
