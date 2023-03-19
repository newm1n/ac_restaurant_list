// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
// require express-handlebars here
const exphbs = require("express-handlebars");
// get restaurant data
const restaurantList = require("./restaurant.json").results;

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// setting static files
app.use(express.static("public"));

// routes setting
// indes page
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList });
});
// show page
app.get("/restaurants/:id", (req, res) => {
  const restaurant = restaurantList.find(
    (rest) => rest.id.toString() === req.params.id
  );
  res.render("show", { restaurant });
});
// search page
app.get("/search", (req, res) => {
  const searchInput = req.query.keyword.trim();
  const restaurants = restaurantList.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      restaurant.category.includes(searchInput)
    );
  });

  res.render("index", { restaurants, searchInput });
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});
