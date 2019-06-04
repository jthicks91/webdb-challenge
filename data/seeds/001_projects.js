exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("projecets")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("projecets").insert([
        {
          name: "The Best Project Ever",
          description: " Create the best project ever"
        },
        {
          name: "Insta-Clone Project",
          description: "Use React/Redux to make an instagram clone"
        },
        {
          name: "Figuring Out the Meaning of Life",
          description:
            "Use all of your coding knowledge to write alogorithims that will answer natures biggest"
        }
      ]);
    });
};
