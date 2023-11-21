import Factory from '@ioc:Adonis/Lucid/Factory'
import Bank from 'App/Models/Bank'
import User from 'App/Models/User'

export const BankFactory = Factory.define(Bank, async ({ faker }) => {
  return {
    number_failed: faker.number.int({ min: 0, max: 3 }), // number_failed fictif
    card_cap: faker.number.int({ min: 100, max: 1000 }), // card_cap fictif
    total_amount: faker.number.int({ min: 1000, max: 100000 }),
    // Ajoutez d'autres champs si nécessaire
  }
}).build()

export async function createUniqueBankAccountForUsers() {
  const users = await User.all()

  for (const user of users) {
    const bank = await BankFactory.merge({ user_id: user.id }).create()
    // Vous pouvez accéder au compte bancaire associé à l'utilisateur avec "bank"
  }
}
