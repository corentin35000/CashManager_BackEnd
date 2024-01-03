import Order from 'App/Models/Order'
import OrderProduct from 'App/Models/OrderProduct'
import Product from 'App/Models/Product'
import { InternalServerErrorException } from 'App/Exceptions/InternalServerErrorException'

export type CreateOrderCommand = {
  userId: number
  products: { productId: number; quantity: number }[]
}

export default class OrderService {
  // Méthode pour créer une commande
  public static async createOrder(command: CreateOrderCommand): Promise<Order> {
    try {
      // Calculer le montant total de la commande
      let totalAmount: number = 0
      for (const item of command.products) {
        const product: Product = await Product.findOrFail(item.productId)
        totalAmount += product.price * item.quantity
      }

      // Créer la commande
      const order: Order = await Order.create({
        user_id: command.userId,
        total_amount: totalAmount,
        status: 'pending',
      })

      // Créer les relations order products
      for (const item of command.products) {
        await OrderProduct.create({
          order_id: order.id,
          product_id: item.productId,
          quantity: item.quantity,
        })
      }

      // Retourner la commande avec les produits préchargés
      const orderCreated: Order = await Order.query()
        .where('id', order.id)
        .preload('orderProducts', (query) => {
          query.preload('product')
        })
        .firstOrFail()
      return orderCreated
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  // Méthode pour obtenir toutes les commandes d'un utilisateur
  public static async getAllOrdersByUserId(userId: number): Promise<Order[]> {
    try {
      return await Order.query()
        .where('user_id', userId)
        .preload('orderProducts', (query) => {
          query.preload('product')
        })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
