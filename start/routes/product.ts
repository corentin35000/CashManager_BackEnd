import Route from '@ioc:Adonis/Core/Route'

Route.group((): void => {
  Route.get('/products', 'ProductsController.getAllProducts')
  Route.get('/products/:id', 'ProductsController.getProductById')
})
