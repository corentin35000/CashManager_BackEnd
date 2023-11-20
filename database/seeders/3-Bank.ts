import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { BankFactory } from 'Database/factories/BankFactory'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    const users = await User.all()

    await BankFactory.createMany(users.length)

  }
}
