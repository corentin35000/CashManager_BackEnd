import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import BankService from 'App/Services/BanksService'
export default class BanksController {
  //function to check if user is eligible to pay
  public async checkUserEligibilityAndPay({
    request,
    response,
  }: HttpContextContract): Promise<void> {
    const userId: number = request.params().userId
    const amount: number | null = request.input('amount')
    const user: User = await User.findOrFail(userId)

    if (user) {
      if (amount) {
        const paymentStatus = await BankService.checkUserEligibilityByBankCheckAndPay(
          userId,
          amount
        )
        return response.status(200).json({ 'Payment Status': paymentStatus })
      } else {
        const paymentStatus = await BankService.checkUserEligibilityByBankCardAndPay(userId)
        return response.status(200).json({ 'Payment Status': paymentStatus })
      }
    } else {
      return response.status(404).json({ message: 'User not found' })
    }
  }
}
