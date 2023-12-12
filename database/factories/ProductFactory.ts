import Factory from '@ioc:Adonis/Lucid/Factory'
import Product from 'App/Models/Product'

export const ProductFactory = Factory.define(Product, async ({ faker }) => {
  return {
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    price: faker.number.int({ min: 1, max: 1000 }),
    quantity: faker.number.int({ min: 1, max: 100 }),
    image:
      'https://webshop.asus.com/thumbnail/b3/d5/75/1698230084/868b70103d808ec61646f2b40fac2f01_800x800.png',
    // Ajoutez d'autres champs si nécessaire
  }
}).build()
