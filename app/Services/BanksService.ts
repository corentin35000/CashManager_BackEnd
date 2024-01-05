import { InternalServerErrorException } from 'App/Exceptions/InternalServerErrorException'
import Bank from 'App/Models/Bank'
import CartService from './CartsService'
import { BadRequestException } from 'App/Exceptions/BadRequestException'
import { ForbiddenException } from 'App/Exceptions/ForbiddenException'
import OrderService from 'App/Services/OrderService'
import Cart from 'App/Models/Cart'

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
    userId: number,
    paymentMethod: 'check' | 'card'
  ): Promise<ResponseBank> {
    const cartItems: Array<Cart> = await CartService.getCartByUserId(userId)
    const products: { productId: number; quantity: number }[] = cartItems.map((cartItem: Cart) => ({
      productId: cartItem.product_id,
      quantity: cartItem.quantity,
    }))

    if (bank.total_amount < amount) {
      bank.number_failed += 1
      await OrderService.createCancelledOrder(userId, products)
      throw new BadRequestException('Insufficient funds', 400)
    }

    if (paymentMethod === 'card' && bank.card_cap < amount) {
      bank.number_failed += 1
      await OrderService.createCancelledOrder(userId, products)
      throw new ForbiddenException('Credit card limit exceeded', 403)
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

    return await this.processPayment(bank, cartAmount, userId, 'check')
  }

  public static async paidByBankCard(userId: number): Promise<ResponseBank> {
    const cartAmount: number = await CartService.calculateAmountForCarts(userId)
    const bank: Bank = await this.getBankDetails(userId)

    return await this.processPayment(bank, cartAmount, userId, 'card')
  }
}
