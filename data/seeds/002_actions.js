exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("actions")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("actions").insert([
        {
          description: "Theorize the universe",
          notes: "is this even possible",
          project_id: 1
        },
        {
          description: "React/Redux boilerplate",
          notes: "easy set up for CRA",
          project_id: 2
        },
        {
          description: "Easy button for coding",
          notes: "why am i not more creative",
          project_id: 3
        }
      ]);
    });
};
