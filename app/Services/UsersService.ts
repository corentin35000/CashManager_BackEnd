import User from 'App/Models/User'
import { InternalServerErrorException } from 'App/Exceptions/InternalServerErrorException'
import { BadRequestException } from 'App/Exceptions/BadRequestException'

export default class UsersService {
  //Get user by id
  public static async getUserById(userId: number): Promise<User> {
    try {
      return await User.findOrFail(userId)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  //Get user by email
  public static async getUserByEmail(email: string): Promise<User> {
    try {
      return await User.findByOrFail('email', email)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  //Get user id by email
  public static async getUserIdByEmail(email: string): Promise<number> {
    try {
      const user: User = await User.findByOrFail('email', email)
      return user.id
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  //Update user
  public static async updateUser(payload: Record<string, any>): Promise<User> {
    const user: User = await User.findOrFail(payload.id)
    try {
      await user.merge(payload).save()
      return user
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  //Delete user
  public static async deleteUser(userId: number): Promise<void> {
    const user: User = await User.findOrFail(userId)

    try {
      await user.delete()
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
