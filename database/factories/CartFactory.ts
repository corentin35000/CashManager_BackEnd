import Factory from '@ioc:Adonis/Lucid/Factory'
import Cart from 'App/Models/Cart'

export const CartFactory = Factory.define(Cart, async ({ faker }) => {
  return {
    user_id: faker.datatype.number({ min: 1, max: 100 }), // user_id fictif
    product_id: faker.datatype.number({ min: 1, max: 100 }), // product_id fictif
    // Ajoutez d'autres champs si nécessaire
  }
}).build()
