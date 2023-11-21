import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetCartByUserIdValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    product_id: schema.number([
      rules.required(),
      rules.exists({ table: 'products', column: 'id' }),
    ]),
  })

  public messages = {
    'productId.required': 'Product ID is required',
    'productId.exists': 'Product does not exist',
  }
}
