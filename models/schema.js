const mongoose = require('mongoose');

const architectureSchema = new mongoose.Schema ({
    title : {type: String},
    architects: [
        {   firstName: String, 
            lastName: String
        }
    ],
    year: {type: Number},
    location: [
        {   streetNumber: Number, 
            streetName: String, 
            city: String, 
            county: String, 
            state: String, 
            postalCode: Number, 
            country: String,
            // coordinates: [
            //     {   type: Point, 
            //         longitude: Number, 
            //         latitude: Number
            //     }
            // ]
        }
    ],
    website: {type: String}
})



