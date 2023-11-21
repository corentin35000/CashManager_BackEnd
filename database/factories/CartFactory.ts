import Factory from '@ioc:Adonis/Lucid/Factory'
import Cart from 'App/Models/Cart'
import Product from 'App/Models/Product'
import User from 'App/Models/User'

export const CartFactory = Factory.define(Cart, async ({ faker }) => {
  const users: User[] = await User.all()
  const products: Product[] = await Product.all()

  const randomUser = faker.helpers.shuffle(users)[0]
  const randomProduct = faker.helpers.shuffle(products)[0]

  return {
    user_id: randomUser.id, // user_id fictif
    product_id: randomProduct.id, // product_id fictif
    // Ajoutez d'autres champs si nécessaire
  }
}).build()
