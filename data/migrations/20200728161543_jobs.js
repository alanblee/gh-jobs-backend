exports.up = function (knex) {
  return knex.schema.createTable("jobs", (tbl) => {
    tbl.increments();
    tbl.string("title", 1234).notNullable();
    tbl.string("company", 255).notNullable();
    tbl.string("posted_date", 255).notNullable();
    tbl.string("type", 255);
    tbl.string("location", 255);
    tbl.string("how_to_apply", 255);
    tbl.string("company_logo", 255);
    tbl.string("job_post_id", 255).notNullable();

    tbl.timestamps(true, true); //created at, updated at
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("jobs");
};
