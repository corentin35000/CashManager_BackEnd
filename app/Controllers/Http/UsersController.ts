import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UsersService from 'App/Services/UsersService'
import DeleteUserValidator from 'App/Validators/User/DeleteUserValidator'
import UpdateUserValidator from 'App/Validators/User/UpdateUserValidator'
import GetUserByIdValidator from 'App/Validators/User/GetUserByIdValidator'
import GetUserByEmailValidator from 'App/Validators/User/GetUserByEmailValidator'

export default class UsersController {
  //function to get a user by id
  private async getUserById({ response, request }: HttpContextContract): Promise<void> {
    const payload: { id: number } = await request.validate(GetUserByIdValidator)
    const user: User = await UsersService.getUserById(payload.id)
    response.status(200).json(user)
  }

  //function to get user by email
  private async getUserByEmail({ response, request }: HttpContextContract): Promise<void> {
    const payload: { email: string } = await request.validate(GetUserByEmailValidator)
    const user: User = await UsersService.getUserByEmail(payload.email)
    response.status(200).json(user)
  }

  //function to update a user
  private async updateUser({ request, response }: HttpContextContract): Promise<void> {
    const payload = await request.validate(UpdateUserValidator)
    await UsersService.updateUser(payload)
    response.status(204).noContent()
  }

  //function to delete a user
  private async deleteUser({ request, response }: HttpContextContract): Promise<void> {
    const payload: { id: number } = await request.validate(DeleteUserValidator)
    await UsersService.deleteUser(payload.id)
    response.status(204).noContent()
  }
}
