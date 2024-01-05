import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PayByCheckValidator {
  public schema = schema.create({
    userId: schema.number([rules.required(), rules.exists({ table: 'users', column: 'id' })]),
    bankCheckBalance: schema.number([rules.required()]),
  })

  public messages = {
    'userId.required': 'User ID is required',
    'userId.exists': 'User does not exist',
    'bankCheckBalance.required': 'Bank check balance is required',
  }
}
