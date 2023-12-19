import Route from '@ioc:Adonis/Core/Route'

Route.group((): void => {
  Route.get('/bank/:userId', 'BanksController.getBankDetails')
  Route.put('/bank/:userId', 'BanksController.checkUserEligibilityAndPay')
})
