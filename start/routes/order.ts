import Route from '@ioc:Adonis/Core/Route'

Route.group((): void => {
  // Route pour créer une commande
  Route.post('/orders', 'OrdersController.createOrder')

  // Route pour obtenir toutes les commandes d'un utilisateur
  Route.get('/orders/user/:userId', 'OrdersController.getAllOrdersByUserId')
})
