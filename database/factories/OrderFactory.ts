import Factory from '@ioc:Adonis/Lucid/Factory'
import Order from 'App/Models/Order'
import User from 'App/Models/User'

export const OrderFactory = Factory.define(Order, async ({ faker }) => {
  const users: Array<User> = await User.all()
  const randomUser: User = faker.helpers.shuffle(users)[0]

  const randomTotal: number = Number(faker.finance.amount(100, 5000, 2))

  return {
    user_id: randomUser.id,
    total_amount: randomTotal,
    total_paid: randomTotal,
    status: faker.helpers.shuffle(['pending', 'completed', 'cancelled'])[0],
  }
}).build()
