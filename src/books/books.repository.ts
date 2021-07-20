import { nanoid } from 'nanoid'
import { Book, BookQueryParams, BookRequest, BookSimple } from './books.model'

import data from './books.data'

const findAll = (query: BookQueryParams): BookSimple[] => {
  const books = data
    .filter((d) => {
      if (query.name)
        return d.name.toLowerCase().indexOf(query.name.toLowerCase()) !== -1
      if (query.reading)
        return parseInt(query.reading) === 1 ? d.reading : !d.reading
      if (query.finished)
        return parseInt(query.finished) === 1 ? d.finished : !d.finished

      return true
    })
    .map((d) => ({
      id: d.id,
      name: d.name,
      publisher: d.publisher,
    }))

  return books
}

const create = (bookRequest: BookRequest): Book => {
  const book: Book = {
    ...bookRequest,
    id: nanoid(),
    finished: bookRequest.readPage === bookRequest.pageCount,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  data.push(book)

  return book
}

const findById = (id: string): Book | null => {
  const book = data.filter((d) => d.id === id)[0]

  return book
}

const update = (id: string, bookRequest: BookRequest): Book | null => {
  const index = data.findIndex((d) => d.id === id)
  const updatedAt = new Date().toISOString()

  let book = null
  if (index !== -1) {
    data[index] = {
      ...data[index],
      ...bookRequest,
      updatedAt,
    }

    book = data[index]
  }

  return book
}

const deleteById = (id: string): boolean => {
  const index = data.findIndex((d) => d.id === id)

  if (index !== -1) {
    data.splice(index, 1)

    return true
  }

  return false
}

export default {
  create,
  deleteById,
  findAll,
  findById,
  update,
}
