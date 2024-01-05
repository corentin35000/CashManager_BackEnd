import Route from '@ioc:Adonis/Core/Route'

Route.group((): void => {
  Route.get('/user/:id', 'UsersController.getUserById')
  Route.get('/user', 'UsersController.getUserByEmail')

  Route.put('/user/:id', 'UsersController.updateUser')
  Route.delete('/user/:id', 'UsersController.deleteUser')
})
