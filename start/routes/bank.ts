import Route from '@ioc:Adonis/Core/Route'

Route.group((): void => {
  Route.put('/bank/:userId', 'BanksController.checkUserEligibilityAndPay')
})
