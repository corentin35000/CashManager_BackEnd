import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { OrderProductFactory } from 'Database/factories/OrderProductFactory'

export default class OrderProductSeeder extends BaseSeeder {
  public async run() {
    await OrderProductFactory.createMany(40)
  }
}
