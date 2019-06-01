exports.up = function(knex, Promise) {
  return knex.schema.createTable("projecets", tbl => {
    tbl.increments(); //unique id
    tbl.string("name", 100).notNullable(); //string with max of 100 characters
    tbl.text("description", 255).notNullable();
    tbl.boolean("completed").defaultTo(false); // takes true or false; //returns 0 for false, 1 for true
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projecets");
};
