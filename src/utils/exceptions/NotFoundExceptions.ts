export default class NotFoundException extends Error {
  name = 'NotFoundException'

  constructor(message: string) {
    super(message)

    this.message = message
  }
}
