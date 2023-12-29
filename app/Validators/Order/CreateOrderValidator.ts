import { schema, rules } from '@ioc:Adonis/Core/Validator'

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
  })

  public messages = {
    required: 'The {{ field }} is required to create an order',
  }
}
