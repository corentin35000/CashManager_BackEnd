import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import BankService from 'App/Services/BanksService'
import PayByCheckValidator from 'App/Validators/Bank/PayByCheckValidator'
import PayByCardValidator from 'App/Validators/Bank/PayByCardValidator'
export default class BanksController {
  //function to get bank details
  public async getBankDetails({ params, response }: HttpContextContract): Promise<void> {
    const userId: number = params.userId
    const user: User = await User.findOrFail(userId)

    if (user) {
      const bank = await BankService.getBankDetails(userId)
      return response.status(200).json({ bank: bank })
    } else {
      return response.status(404).json({ message: 'User not found' })
    }
  }

  public async payByCheck({ request, response }: HttpContextContract): Promise<void> {
    try {
      const { userId, bankCheckBalance } = await request.validate(PayByCheckValidator)

      const result = await BankService.paidByBankCheck(userId, bankCheckBalance)
      return response.status(200).json(result)
    } catch (error) {
      return response.status(error.status || 500).json({ message: error.message })
    }
  }

  public async payByCard({ request, response }: HttpContextContract): Promise<void> {
    try {
      const { userId } = await request.validate(PayByCardValidator)

      const result = await BankService.paidByBankCard(userId)
      return response.status(200).json(result)
    } catch (error) {
      return response.status(error.status || 500).json({ message: error.message })
    }
  }
}
