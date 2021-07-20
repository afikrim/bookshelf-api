export default class BadRequestException extends Error {
  name = 'BadRequestException'

  constructor(message: string) {
    super(message)

    this.message = message
  }
}
