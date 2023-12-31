import { InternalServerErrorException } from 'App/Exceptions/InternalServerErrorException'
import Cart from 'App/Models/Cart'
import Product from 'App/Models/Product'

export default class CartsService {
  //Get cart by user id
  public static async getCartByUserId(userId: number): Promise<Cart[]> {
    try {
      return await Cart.query().where('user_id', userId).preload('product')
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  // Get cart products by user id
  public static async getCartProductsByUserId(userId: number): Promise<Product[]> {
    try {
      const carts: Cart[] = await Cart.query().where('user_id', userId).preload('product')
      const products: Product[] = []
      carts.forEach((cart) => {
        products.push(cart.product)
      })
      return products
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  //Get cart by user id and product id
  public static async getCartByUserIdAndProductId(
    userId: number,
    productId: number
  ): Promise<Cart[]> {
    try {
      return await Cart.query()
        .where('user_id', userId)
        .where('product_id', productId)
        .preload('product')
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  //Update product quantity
  public static async updateProductQuantity(
    userId: number,
    productId: number,
    quantity: number
  ): Promise<void> {
    try {
      const cart: Cart = await Cart.query()
        .where('user_id', userId)
        .where('product_id', productId)
        .firstOrFail()
      cart.quantity = quantity
      await cart.save()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  //Add product to cart
  public static async addProductToCart(userId: number, productId: number): Promise<void> {
    try {
      const cart: Cart | null = await Cart.query()
        .where('user_id', userId)
        .where('product_id', productId)
        .first()

      if (cart) {
        cart.quantity += 1
        await cart.save()
        return
      } else {
        await Cart.create({ user_id: userId, product_id: productId, quantity: 1 })
      }
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

  //Delete all carts from user
  public static async deleteAllCartFromUser(userId: number): Promise<void> {
    const carts: Cart[] = await Cart.query().where('user_id', userId)
    try {
      for (const cart of carts) {
        await cart.delete()
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  //function to calculate total number of carts
  public static async calculateAmountForCarts(userId: number): Promise<number> {
    let cartAmount: number = 0
    try {
      const carts = await Cart.query().where('user_id', userId).preload('product')
      if (carts.length > 0) {
        carts.forEach((cart) => {
          cartAmount += cart.product.price * cart.quantity
        })
        return cartAmount
      } else {
        throw new InternalServerErrorException('No carts found')
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
