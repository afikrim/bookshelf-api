import NotFoundException from '../utils/exceptions/NotFoundExceptions'
import { Book, BookRequest, BookSimple } from './books.model'
import BookRepository from './books.repository'

const index = (): BookSimple[] => {
  const books = BookRepository.findAll()

  return books
}

const store = (bookRequest: BookRequest): string => {
  const book = BookRepository.create(bookRequest)

  return book.id
}

const get = (id: string): Book => {
  const book = BookRepository.findById(id)
  if (!book) throw new NotFoundException('Buku tidak ditemukan')

  return book
}

const update = (id: string, bookRequest: BookRequest): Book => {
  const book = BookRepository.update(id, bookRequest)
  if (!book)
    throw new NotFoundException('Gagal memperbarui buku. Id tidak ditemukan')

  return book
}

const destroy = (id: string): void => {
  const book = BookRepository.deleteById(id)
  if (!book)
    throw new NotFoundException('Buku gagal dihapus. Id tidak ditemukan')
}

export default {
  index,
  store,
  get,
  update,
  destroy,
}
