import Hapi from '@hapi/hapi'
import dotenv from 'dotenv'
import BookRoutes from './books/books.routes'

dotenv.config()

const { HOST, PORT, APP_NAME, APP_VERSION } = process.env
const init = async () => {
  const server = Hapi.server({
    host: HOST || '127.0.0.1',
    port: PORT || '5000',
    routes: {
      cors: {
        additionalHeaders: ['accept', 'content-type'],
        credentials: true,
        origin: ['*'],
      },
    },
  })

  BookRoutes(server)

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
