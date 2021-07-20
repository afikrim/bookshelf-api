import Hapi from '@hapi/hapi'
import dotenv from 'dotenv'

dotenv.config()

const { HOST, PORT, APP_NAME, APP_VERSION } = process.env
const init = async () => {
  const server = Hapi.server({
    host: HOST || '127.0.0.1',
    port: PORT || '3000',
    routes: {
      cors: {
        additionalHeaders: ['accept', 'content-type'],
        credentials: true,
        origin: ['*'],
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: () => {
      return {
        app: {
          name: APP_NAME,
          version: APP_VERSION,
        },
      }
    },
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

init()
