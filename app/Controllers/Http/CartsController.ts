import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from 'App/Models/Cart'
import CartsService from 'App/Services/CartsService'
import GetCartByUserIdValidator from 'App/Validators/Cart/GetCartByUserIdValidator'
import AddProductToCartValidator from 'App/Validators/Cart/AddProductToCartValidator'
export default class CartsController {
  //function to get cart by userId
  public async getCartByUserId({ params, response }: HttpContextContract): Promise<void> {
    const userId: number = params.userId
    const carts: Cart[] = await CartsService.getCartByUserId(userId)
    response.status(200).json(carts)
  }

  //function to add product to cart
  public async addProductToCart({ request, params, response }: HttpContextContract): Promise<void> {
    const userId: number = params.userId
    const payload: { product_id: number } = await request.validate(AddProductToCartValidator)
    await CartsService.addProductToCart(userId, payload.product_id)
    response.status(201).json({ message: 'Product added to cart' })
  }

  //function to delete product from cart
  public async deleteProductFromCart({
    request,
    params,
    response,
  }: HttpContextContract): Promise<void> {
    const userId: number = params.userId
    const payload: { product_id: number } = await request.validate(AddProductToCartValidator)
    await CartsService.deleteProductFromCart(userId, payload.product_id)
    response.status(204).noContent()
  }

  //function to delete all cart from user
  public async deleteAllCartFromUser({ params, response }: HttpContextContract): Promise<void> {
    const userId: number = params.userId
    await CartsService.deleteAllCartFromUser(userId)
    response.status(204).noContent()
  }
}
