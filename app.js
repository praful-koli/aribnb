const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const port = 8080;
const methodOverride = require("method-override");
const ejsMate  = require('ejs-mate');

app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// MongoBD Connection
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then((response) => console.log("Database Connection succesful 👍🧑‍💻"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("isworking");
});

// New Route

app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

// index Route

app.get("/listings", async (req, res) => {
  try {
    const allListing = await Listing.find();
    res.render("listings/index", { allListing });
  } catch (error) {
    console.log(error);
  }
});

// show Route

app.get("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id.trim());
    res.render("listings/show", { listing });
  } catch (error) {
    console.log(error); 
  }
});

// Create Route

app.post("/listings", async (req, res) => {
  try {
    const listing = new Listing(req.body.listing);
    await listing.save();
    res.redirect("/listings");
  } catch (error) {
    console.log(error);
  }
});

//  edit route

app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  console.log(listing);
  res.render("listings/edit", { listing });
});

// Update route

app.put("/listings/:id", async (req, res) =>  {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect("/listings");
});

// Delete Route

app.delete("/listings/:id", async (req, res) => {
   let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});
app.listen(port, () => {
  console.log(`server listeing to port ${port}`);
});
