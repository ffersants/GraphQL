/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
      table.increments("id", {primaryKey: true}).notNullable()
      table.string('pswd').nullable();
      table.string("firstName").notNullable()
      table.string("lastName").notNullable()
      table.string("userName").notNullable()
      table.string("createdAt").defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
