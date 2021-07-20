export interface BookSimple {
  id: string
  name: string
  publisher: string
}

export interface Book {
  id: string
  name: string
  year: number
  author: string
  summary: string
  publisher: string
  pageCount: number
  readPage: number
  finished: boolean
  reading: boolean
  insertedAt: string
  updatedAt: string
}

export interface BookRequest {
  name: string
  year: number
  author: string
  summary: string
  publisher: string
  pageCount: number
  readPage: number
  reading: boolean
}
