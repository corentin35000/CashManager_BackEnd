import Factory from '@ioc:Adonis/Lucid/Factory'
import OrderProduct from 'App/Models/OrderProduct'
import Order from 'App/Models/Order'
import Product from 'App/Models/Product'

export const OrderProductFactory = Factory.define(OrderProduct, async ({ faker }) => {
  const orders: Array<Order> = await Order.all()
  const products: Array<Product> = await Product.all()

  const randomOrder: Order = faker.helpers.shuffle(orders)[0]
  const randomProduct: Product = faker.helpers.shuffle(products)[0]

  return {
    order_id: randomOrder.id,
    product_id: randomProduct.id,
    quantity: faker.number.int({ min: 1, max: 10 }),
  }
}).build()
