import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CartFactory } from 'Database/factories/CartFactory'

export default class extends BaseSeeder {
  public async run() {
    await CartFactory.createMany(20)
  }
}
