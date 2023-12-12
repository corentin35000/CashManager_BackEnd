import Route from '@ioc:Adonis/Core/Route'

Route.group((): void => {
  Route.get('/cart/:userId', 'CartsController.getCartByUserId')
  Route.get('/cart/:userId/:productId', 'CartsController.getCartByUserIdAndProductId')
  Route.post('/cart/:userId', 'CartsController.addProductToCart')
  Route.delete('/cart/:userId', 'CartsController.deleteProductFromCart')
  Route.delete('/carts/:userId', 'CartsController.deleteAllCartFromUser')
})
