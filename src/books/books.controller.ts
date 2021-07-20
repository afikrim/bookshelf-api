import { Request, ResponseToolkit } from '@hapi/hapi'

import BadRequestException from '../utils/exceptions/BadRequestException'
import NotFoundException from '../utils/exceptions/NotFoundExceptions'
import BooksService from './books.service'

import { BookRequest } from './books.model'

const index = (_: Request, h: ResponseToolkit) => {
  const data = BooksService.index()

  const response = h.response({
    status: 'success',
    data: {
      books: data,
    },
  })
  response.code(200)

  return response
}

const store = (request: Request, h: ResponseToolkit) => {
  try {
    const payload = request.payload as BookRequest

    if (!payload.name)
      throw new BadRequestException(
        'Gagal menambahkan buku. Mohon isi nama buku'
      )
    if (payload.readPage > payload.pageCount)
      throw new BadRequestException(
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      )

    const bookId = BooksService.store(payload)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId,
      },
    })
    response.code(201)

    return response
  } catch (err: any) {
    const response = h.response({
      status: 'fail',
      message: err.message || 'Buku gagal ditambahkan',
    })

    if (err.name === BadRequestException.name) response.code(400)

    return response
  }
}

const get = (request: Request, h: ResponseToolkit) => {
  try {
    const id = request.params.bookId

    const book = BooksService.get(id)
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    })
    response.code(200)

    return response
  } catch (err: any) {
    const response = h.response({
      status: 'fail',
      message: err.message || 'Terjadi kesalahan pada server',
    })

    if (err.name === NotFoundException.name) response.code(404)

    return response
  }
}

const update = (request: Request, h: ResponseToolkit) => {
  try {
    const id = request.params.bookId
    const payload = request.payload as BookRequest

    if (!payload.name)
      throw new BadRequestException(
        'Gagal memperbarui buku. Mohon isi nama buku'
      )
    if (payload.readPage > payload.pageCount)
      throw new BadRequestException(
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      )

    BooksService.update(id, payload)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    })
    response.code(200)

    return response
  } catch (err: any) {
    const response = h.response({
      status: 'fail',
      message: err.message || 'Terjadi kesalahan pada server',
    })

    if (err.name === BadRequestException.name) response.code(400)
    if (err.name === NotFoundException.name) response.code(404)

    return response
  }
}

const destroy = (request: Request, h: ResponseToolkit) => {
  try {
    const id = request.params.bookId

    BooksService.destroy(id)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    })
    response.code(200)

    return response
  } catch (err: any) {
    const response = h.response({
      status: 'fail',
      message: err.message || 'Terjadi kesalahan pada server',
    })

    if (err.name === NotFoundException.name) response.code(404)

    return response
  }
}

export default {
  index,
  store,
  get,
  update,
  destroy,
}
