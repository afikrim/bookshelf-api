import { Server } from '@hapi/hapi'
import BooksController from './books.controller'

const routes = (server: Server) => {
  server.route([
    {
      method: 'GET',
      path: '/books',
      handler: BooksController.index,
    },
    {
      method: 'POST',
      path: '/books',
      handler: BooksController.store,
    },
    {
      method: 'GET',
      path: '/books/{bookId}',
      handler: BooksController.get,
    },
    {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: BooksController.update,
    },
    {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: BooksController.destroy,
    },
  ])
}

export default routes
