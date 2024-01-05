import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OrderService from 'App/Services/OrderService'
import CreateOrderValidator from 'App/Validators/Order/CreateOrderValidator'

export default class OrderController {
  // Méthode pour créer une commande
  public async createOrder({ request, response }: HttpContextContract) {
    const validatedData = await request.validate(CreateOrderValidator)
    const order = await OrderService.createOrder(validatedData)
    return response.created(order)
  }

  // Méthode pour obtenir toutes les commandes d'un utilisateur
  public async getAllOrdersByUserId({ params, response }: HttpContextContract) {
    const userId = params.userId
    if (!userId) {
      return response.badRequest('User id is required')
    }
    const orders = await OrderService.getAllOrdersByUserId(userId)
    return response.ok(orders)
  }
}
