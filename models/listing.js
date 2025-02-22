const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title :{ 
        type : String,
        required : true,
    },
    description : String,
    image :{ 
        type : String,
        default : 'https://images.unsplash.com/photo-1611651338412-8403fa6e3599?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        set : (v) => {
           return  v === " " ?'https://unsplash.com/photos/grey-and-red-porsche-911-parked-in-building-G7EHX5qU5-c' 
            : v;
        } 
    },

    price : Number,
    location : String,
    country : String,
});

const Listing = mongoose.model('Listing' , listingSchema);

module.exports = Listing;
