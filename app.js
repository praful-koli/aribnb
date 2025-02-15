const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const port = 8080;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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

// create Route
app.get("/listings/createNew", (req, res) => {
  res.render("listings/createNew");
});


// index Route
app.get("/listings", async (req, res) => {
  try {
    const allListing = await Listing.find();
    console.log(allListing);
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

app.listen(port, () => {
  console.log(`server listeing to port ${port}`);
});




// app.get('/testListing' , async (req, res) => {
//    let sampleListing = new Listing({
//      title : "My New Villa",
//      description : "By the beach",
//      price : 12000,
//      location : "Calangute, Goa",
//      country : "India"
//    });

//   await sampleListing.save()
//    .then((response)=> {

//     console.log("Data is save " , response );
//     res.send('is working')
//    })
//    .catch((error) => console.log(error));
// });
