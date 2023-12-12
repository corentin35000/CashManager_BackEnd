import Route from '@ioc:Adonis/Core/Route'

Route.group((): void => {
  Route.post('/signup', 'AuthController.signUp')
  Route.post('/signin', 'AuthController.signIn')
})
