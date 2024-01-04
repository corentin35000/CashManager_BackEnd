import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateProductQuantityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    product_id: schema.number([
      rules.required(),
      rules.exists({ table: 'products', column: 'id' }),
    ]),
    quantity: schema.number([rules.required(), rules.range(1, 100)]),
  })

  public messages = {
    'productId.required': 'Product ID is required',
    'productId.exists': 'Product does not exist',
    'quantity.required': 'Quantity is required',
    'quantity.range': 'Quantity must be between 1 and 100',
  }
}
