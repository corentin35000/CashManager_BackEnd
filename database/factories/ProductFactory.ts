import Factory from '@ioc:Adonis/Lucid/Factory'
import Product from 'App/Models/Product'

export const ProductFactory = Factory.define(Product, async ({ faker }) => {
  return {
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    price: faker.datatype.number({ min: 10, max: 1000, precision: 0.01 }),
    quantity: faker.datatype.number({ min: 1, max: 100 }),
    image: faker.image.imageUrl(), // Ajout du champ "image" avec une URL fictive
    // Ajoutez d'autres champs si nécessaire
  }
}).build()
