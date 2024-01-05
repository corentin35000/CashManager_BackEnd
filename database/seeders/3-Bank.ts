import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { createUniqueBankAccountForUsers } from 'Database/factories/BankFactory'

export default class extends BaseSeeder {
  public async run() {
    await createUniqueBankAccountForUsers()
  }
}
