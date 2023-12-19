import { InternalServerErrorException } from 'App/Exceptions/InternalServerErrorException'
import Bank from 'App/Models/Bank'
import CartService from './CartsService'

export type responseBank = {
  value: boolean
  message: string
}
export default class BanksService {
  //function to check if user is eligible to pay by bank check
  public static async checkUserEligibilityByBankCheckAndPay(
    userId: number,
    amount: number
  ): Promise<responseBank> {
    try {
      const cartAmount: number = await CartService.calculateAmountForCarts(userId)
      const bank: Bank = await Bank.query().where('user_id', userId).firstOrFail()
      if (amount >= cartAmount) {
        if (bank.total_amount >= amount) {
          if (bank.card_cap >= amount) {
            if (bank.number_failed < 3) {
              bank.total_amount -= amount
              bank.number_failed = 0
              await bank.save()
              await CartService.deleteAllCartFromUser(userId)
              return { value: true, message: 'Payement effectued' }
            } else {
              bank.number_failed += 1
              await bank.save()
              return {
                value: false,
                message: 'You have reached the maximum number of failed payments',
              }
            }
          } else {
            bank.number_failed += 1
            await bank.save()
            return {
              value: false,
              message: 'You have reached the maximum amount of payment by card',
            }
          }
        } else {
          bank.number_failed += 1
          await bank.save()
          return { value: false, message: 'You have reached the maximum amount of payment' }
        }
      } else {
        bank.number_failed += 1
        await bank.save()
        return { value: false, message: 'The amount is not enough' }
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  //function to check if user is eligible to pay by bank transfer
  public static async checkUserEligibilityByBankCardAndPay(userId: number): Promise<responseBank> {
    try {
      const cartAmount: number = await CartService.calculateAmountForCarts(userId)
      const bank: Bank = await Bank.query().where('user_id', userId).firstOrFail()
      if (bank.total_amount >= cartAmount) {
        if (bank.card_cap >= cartAmount) {
          if (bank.number_failed < 3) {
            bank.total_amount -= cartAmount
            bank.number_failed = 0
            await bank.save()
            await CartService.deleteAllCartFromUser(userId)
            return { value: true, message: 'Payement effectued' }
          } else {
            bank.number_failed += 1
            await bank.save()
            return {
              value: false,
              message: 'You have reached the maximum number of failed payments',
            }
          }
        } else {
          bank.number_failed += 1
          await bank.save()
          return { value: false, message: 'You have reached the maximum amount of payment' }
        }
      } else {
        bank.number_failed += 1
        await bank.save()
        return { value: false, message: 'The amount is not enough' }
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
