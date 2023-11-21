import Route from '@ioc:Adonis/Core/Route'

Route.group((): void => {
  Route.post('/auth/signup', 'AuthController.signUp')
  Route.post('/auth/signin', 'AuthController.signIn')
})
