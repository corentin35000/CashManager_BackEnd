import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignUpValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstname: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(4),
      rules.maxLength(22),
    ]),
    lastname: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(4),
      rules.maxLength(22),
    ]),
    email: schema.string({ trim: true }, [
      rules.required(),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [
      rules.required(),
      rules.confirmed(),
      rules.minLength(8),
      rules.regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/),
    ]),
  })

  public messages = {
    'password.regex':
      'Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial.',
    'password.minLength': 'Le mot de passe doit contenir au moins 8 caractères.',
  }
}
