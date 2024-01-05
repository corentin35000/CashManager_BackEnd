import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PayByCardValidator {
  public schema = schema.create({
    userId: schema.number([rules.required(), rules.exists({ table: 'users', column: 'id' })]),
  })

  public messages = {
    'userId.required': 'User ID is required',
    'userId.exists': 'User does not exist',
  }
}
