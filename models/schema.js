const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const architectureSchema = new Schema ({

    title: {type: String, required:true},
    architectOne: {type: String, required: true},
    architectTwo: {type: String},
    year: {type:String},
    img: [{type: String}],
    loc: {streetAddress: String, city: String, state: String, postalCode: Number, country: String},
    link: {type: String},
    dayVisit: {type: Boolean},
    overNight: {type: Boolean}
})


    
const Architecture = mongoose.model('Architecture', architectureSchema);
module.exports = Architecture;


