import AuthService, { RegisterCommand } from 'App/Services/AuthService'
import SignUpValidator from 'App/Validators/Auth/SignUpValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SignInValidator from 'App/Validators/Auth/SignInValidator'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
  //function to create a new user
  private async signUp({ request, response }: HttpContextContract): Promise<void> {
    const payload: RegisterCommand = await request.validate(SignUpValidator)

    await AuthService.signUp(payload)

    response.status(201)
  }

  //function to sign in
  private async signIn({ request }: HttpContextContract): Promise<any> {
    const payload: { email: string; password: string } = await request.validate(SignInValidator)

    return await AuthService.signIn(payload.email, payload.password)
  }
}
