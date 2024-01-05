import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignInValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.email(), rules.required()]),
    password: schema.string({ trim: true }, [rules.required()]),
  })

  public messages = {
    'email.required': 'Email is required',
    'email.email': 'Email format is invalid',
    'password.required': 'Password is required',
  }
}
