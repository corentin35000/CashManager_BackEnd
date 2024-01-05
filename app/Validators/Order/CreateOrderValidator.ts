import { schema, rules } from '@ioc:Adonis/Core/Validator'

const statusEnum = ['pending', 'paid', 'cancelled'] as const

export default class CreateOrderValidator {
  public schema = schema.create({
    userId: schema.number([rules.required(), rules.exists({ table: 'users', column: 'id' })]),
    products: schema.array().members(
      schema.object().members({
        productId: schema.number([
          rules.required(),
          rules.exists({ table: 'products', column: 'id' }),
        ]),
        quantity: schema.number([rules.required(), rules.range(1, 100)]),
      })
    ),
    status: schema.enum.optional(statusEnum),
  })

  public messages = {
    'required': 'The {{ field }} is required to create an order',
    'status.enum': 'Status must be either pending, paid, or cancelled',
  }
}
