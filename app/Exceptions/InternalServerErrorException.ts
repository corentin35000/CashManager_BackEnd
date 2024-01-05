import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'

export class InternalServerErrorException extends Exception {
  constructor(message: string = 'Internal Server Error', status: number = 500) {
    super(message, status)
  }

  public async handle(error: this, ctx: HttpContextContract): Promise<void> {
    ctx.response.status(error.status).send({
      errors: [
        {
          field: 'internal_server_error',
          rule: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        },
      ],
    })
  }

  public report(error: this): void {
    Logger.error(`InternalServerErrorException: ${error.message}`)
  }
}
