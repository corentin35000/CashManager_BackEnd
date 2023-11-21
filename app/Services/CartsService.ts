import { InternalServerErrorException } from 'App/Exceptions/InternalServerErrorException'
import Cart from 'App/Models/Cart'

export default class CartsService {
  //Get cart by user id
  public static async getCartByUserId(userId: number): Promise<Cart[]> {
    try {
      return await Cart.query().where('user_id', userId).preload('product')
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  //Add product to cart
  public static async addProductToCart(userId: number, productId: number): Promise<void> {
    try {
      await Cart.create({ user_id: userId, product_id: productId })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  //Delete product from cart
  public static async deleteProductFromCart(userId: number, productId: number): Promise<void> {
    try {
      const cart: Cart = await Cart.query()
        .where('user_id', userId)
        .where('product_id', productId)
        .firstOrFail()
      await cart.delete()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  //Delete all cart from user
  public static async deleteAllCartFromUser(userId: number): Promise<void> {
    try {
      await Cart.query().where('user_id', userId).delete()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
