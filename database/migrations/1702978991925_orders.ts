import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrdersSchema extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.decimal('total_amount', 12, 2).notNullable()
      table.decimal('total_paid', 12, 2).notNullable().defaultTo(0)
      table.string('status').notNullable().defaultTo('pending') // Exemples: pending, paid, cancelled
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
