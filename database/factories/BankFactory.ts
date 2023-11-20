import Factory from '@ioc:Adonis/Lucid/Factory'
import Bank from 'App/Models/Bank'
import User from 'App/Models/User'

export const BankFactory = Factory.define(Bank, async ({ faker }) => {
  const user = await User.firstOrFail()
  return {
    user_id: user.id,
    total_amount: faker.datatype.number({ min: 1000, max: 100000 }), // total_amount fictif
    // Ajoutez d'autres champs si nécessaire
  }
}).build()
