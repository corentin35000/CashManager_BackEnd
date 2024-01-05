import Route from '@ioc:Adonis/Core/Route'

Route.group((): void => {
  Route.get('/bank/:userId', 'BanksController.getBankDetails')
  Route.post('/bank/pay-by-check', 'BanksController.payByCheck')
  Route.post('/bank/pay-by-card', 'BanksController.payByCard')
})
