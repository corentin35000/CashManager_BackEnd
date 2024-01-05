import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetUserByEmailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([rules.required(), rules.exists({ table: 'users', column: 'email' })]),
  })

  public get data() {
    return this.ctx.params
  }

  public messages = {
    'email.required': 'Email is required',
    'email.exists': 'Email does not exist',
  }
}
