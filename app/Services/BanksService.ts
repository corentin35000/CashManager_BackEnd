import { InternalServerErrorException } from 'App/Exceptions/InternalServerErrorException'
import Bank from 'App/Models/Bank'
import CartService from './CartsService'
import { BadRequestException } from 'App/Exceptions/BadRequestException'
import { ForbiddenException } from 'App/Exceptions/ForbiddenException'
import OrderService from 'App/Services/OrderService'
import Product from 'App/Models/Product'

export type ResponseBank = {
  message: string
}

export default class BanksService {
  public static async getBankDetails(userId: number): Promise<Bank> {
    try {
      return await Bank.query().where('user_id', userId).firstOrFail()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  private static async processPayment(
    bank: Bank,
    amount: number,
    userId: number
  ): Promise<ResponseBank> {
    const cartProducts: Product[] = await CartService.getCartProductsByUserId(userId)
    const products: { productId: number; quantity: number }[] = cartProducts.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }))

    if (bank.total_amount < amount) {
      await OrderService.createCancelledOrder(userId, products)
      throw new BadRequestException('Insufficient funds', 400)
    }

    if (bank.card_cap < amount) {
      await OrderService.createCancelledOrder(userId, products)
      throw new ForbiddenException('Card limit exceeded', 403)
    }

    if (bank.number_failed >= 3) {
      await OrderService.createCancelledOrder(userId, products)
      throw new ForbiddenException('Maximum number of failed payments reached', 403)
    }

    bank.total_amount -= amount
    bank.number_failed = 0
    await bank.save()
    await CartService.deleteAllCartFromUser(userId)
    await OrderService.createOrder({
      userId,
      products,
      status: 'paid',
    })
    return { message: 'Payment successful' }
  }

  public static async paidByBankCheck(
    userId: number,
    bankCheckBalance: number
  ): Promise<ResponseBank> {
    const cartAmount: number = await CartService.calculateAmountForCarts(userId)
    const bank: Bank = await this.getBankDetails(userId)

    if (bankCheckBalance < cartAmount) {
      throw new BadRequestException('Amount is less than cart total', 400)
    }

    return await this.processPayment(bank, bankCheckBalance, userId)
  }

  public static async paidByBankCard(userId: number): Promise<ResponseBank> {
    const cartAmount: number = await CartService.calculateAmountForCarts(userId)
    const bank: Bank = await this.getBankDetails(userId)

    return await this.processPayment(bank, cartAmount, userId)
  }
}
