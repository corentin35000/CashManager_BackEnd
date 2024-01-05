import Hash from '@ioc:Adonis/Core/Hash'
import { NotFoundException } from 'App/Exceptions/NotFoundException'
import User from 'App/Models/User'

export type RegisterCommand = {
  firstname: string
  lastname: string
  email: string
  password: string
}

export default class AuthService {
  // Fonction pour créer un nouveau user
  public static async signUp(data: RegisterCommand): Promise<void> {
    const user: User = await User.create({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    })
  }

  //fonction pour se connecter
  public static async signIn(email: string, password: string): Promise<User | null> {
    try {
      const user: User | null = await User.findBy('email', email)
      let isSamePassword: boolean
      if (user) {
        isSamePassword = await Hash.verify(user.password, password)
        if (isSamePassword) {
          return user
        } else {
          throw new NotFoundException('Password not match')
        }
      } else {
        throw new NotFoundException('No User found')
      }
    } catch (error) {
      throw error
    }
  }
}
