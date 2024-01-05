import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductsService from 'App/Services/ProductsService'

export default class ProductsController {
  //function to get product by id
  public async getProductById({ params }: HttpContextContract) {
    //Get product id from params
    const productId = params.id

    //Return product
    return await ProductsService.getProductById(productId)
  }

  //function to get all products
  public async getAllProducts() {
    //Return all products
    return await ProductsService.getAllProducts()
  }
}
