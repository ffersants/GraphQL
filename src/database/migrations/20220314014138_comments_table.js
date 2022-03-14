/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('comments', (table) => {
      table.increments('id')
      table.integer('postId').references('id').inTable('posts')
      table.integer('commentator').references('id').inTable('users')
      table.string('comment').notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('comments')
};
