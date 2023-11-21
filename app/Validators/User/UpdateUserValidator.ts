import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([rules.required(), rules.exists({ table: 'users', column: 'id' })]),
    firstname: schema.string.optional({ trim: true }, [rules.minLength(4), rules.maxLength(22)]),
    lastname: schema.string.optional({ trim: true }, [rules.minLength(4), rules.maxLength(22)]),
    email: schema.string.optional({ trim: true }, [rules.email()]),
    password: schema.string.optional({ trim: true }, [rules.minLength(8), rules.maxLength(32)]),
    // include other fields to be updated with their validation rules
  })

  // public get data() {
  //   return this.ctx.params
  // }

  public messages = {
    'id.required': 'User ID is required',
    'id.exists': 'User does not exist',
    // include other field validation messages
  }
}
