import { InternalServerErrorException } from 'App/Exceptions/InternalServerErrorException'
import Product from 'App/Models/Product'

export default class ProductsService {
  //Get product by id
  public static async getProductById(productId: number): Promise<Product> {
    try {
      return await Product.findOrFail(productId)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  //function to get all products
  public static async getAllProducts(): Promise<Product[]> {
    try {
      return await Product.all()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
