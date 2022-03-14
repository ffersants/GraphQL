/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('posts', (table) => {
        table.increments("id").notNullable().primary()
        table.string("title").notNullable()
        table.string("body").notNullable()
        table.string('createdAt').defaultTo(knex.fn.now())
        table.integer('userId').notNullable().references('id').inTable('users')
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.dropTable('posts')
  };
  