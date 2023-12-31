import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ProductFactory } from 'Database/factories/ProductFactory'

export default class extends BaseSeeder {
  public async run() {
    await ProductFactory.createMany(15)
  }
}
